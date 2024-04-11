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

export default async function Page({ params }: Props) {
  const projectData = (await preload(params.name))?.data;

  if (!projectData) {
    return <div>Not found</div>;
  }
  return (
    <div className="flex flex-row object-scale-down h-10">
      {projectData.languageTags.map((d, i) => (
        <Image key={i} src={d.iconUrl} alt={d.name} width={40} height={20} />
      ))}
    </div>
  );
}
