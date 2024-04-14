import { ProjectData } from "@lib";
import { readFile } from "fs/promises";
import Image from "next/image";

export const preload = async (name: string) => {
  const file = await readFile(
    process.cwd() + "/src/data/projects.json",
    "utf-8"
  );
  const allProjData: ProjectData[] = JSON.parse(file);
  return { data: allProjData.find((d) => d.name === name) };
};

interface Props {
  params: { name: string };
}

export default async function ProjectPage({ params }: Props) {
  const data = (await preload(params.name))?.data;
  if (!data) {
    return <div>Project not found</div>;
  }
  return (
    <div className="p-3 h-full w-full overflow-y-scroll">
      <div className="flex items-center flex-col">
        <h2 className="text-center text-2xl relative">
          <span>{data.title}</span>
          {data.liveUrl ? (
            <div className="group select-none bg-stone-700 bg-opacity-65 hover:bg-stone-600 cursor-pointer absolute -right-4 -top-1 text-2xs rounded-full border-2 border-stone-600 w-4 h-4 leading-relaxed">
              <span>!</span>
              <div className="group absolute hidden group-hover:flex flex-row items-center top-0 left-1/2 cursor-default">
                <div className="h-full w-3"></div>
                <div className="bg-stone-800 p-1 whitespace-pre">
                  <p>Live website preview is available!</p>
                  <a
                    className="w-fit px-2 py-1 bg-stone-700 hover:bg-opacity-65 mt-0.5 inline-block rounded-sm"
                    href={data.liveUrl}
                    target="_blank"
                  >
                    redirect
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </h2>
        {data.thumbnail ? (
          <Image
            className="w-1/4 h-auto mt-3 mb-1"
            src={data.thumbnail}
            alt="thumbanil"
            width={1000}
            height={500}
          />
        ) : null}
        <a
          className="text-2xs text-blue-500 visited:text-purple-600 hover:text-blue-800 focus:text-blue-800"
          href={data.githubUrl}
          target="_blank"
        >
          Repository URL
        </a>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {data.liveUrl ? <div></div> : null}
        <h4 className="w-fit underline">Featured tags</h4>
        <div className="flex flex-row gap-1">
          {data.languageTags.map((d, i) => (
            <div
              key={i}
              className="bg-stone-500 bg-opacity-65 w-fit h-fit object rounded-sm"
            >
              <Image
                className="aspect-square max-w-10 max-h-10"
                src={d.iconUrl}
                alt={d.name}
                title={d.name}
                width={50}
                height={50}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center text-center mt-2 pb-14">
        {parseDescription(data)}
      </div>
    </div>
  );
}

function parseDescription(data: ProjectData) {
  const lines = data.description.split("\n");
  const nodes: React.ReactNode[] = [];

  for (const i in lines) {
    const line = lines[i];
    const mappedLine = line.split(/[{}]/).map((str, j) => {
      if (!/attach:[a-zA-Z]+/.test(str)) return str;
      const id = str.split(":")[1];
      const attachment = data.attachments[id];
      if (!attachment) return str;
      return (
        <Image
          className="project-desc-attachment object-scale-down max-w-3xl"
          key={j}
          src={attachment.url}
          alt={attachment.alt}
          width={attachment.width}
          height={attachment.height}
        />
      );
    });
    nodes.push(
      <p key={i} className="min-h-[1ch]">
        {mappedLine}
      </p>
    );
  }
  return nodes;
}
