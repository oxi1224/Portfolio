import ProjectDisplay from "@components/ProjectDisplay";
import { ProjectData } from "@lib";
import { readFile } from "fs/promises";

const preload = async () => {
  const file = await readFile(
    process.cwd() + "/src/data/projects.json",
    "utf-8"
  );
  return JSON.parse(file) as ProjectData[];
};

export default async function Page() {
  const data = await preload();
  if (!data)
    return (
      <div className="text-2xl text-center">
        An error has occured, failed to load project data
      </div>
    );
  return (
    <div>
      <h2 className="text-center my-3">Featured projects</h2>
      <div>
        {data.map((d, i) => (
          <ProjectDisplay key={i} data={d} i={i} />
        ))}
      </div>
    </div>
  );
}
