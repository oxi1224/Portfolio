export interface RedirectData {
  iconUrl: string;
  redirectUrl: string;
  title: string;
}

export interface ProjectData {
  name: string;
  githubUrl: string;
  description: string;
  featuredTag: ProjectTag;
  languageTags: ProjectTag[];
}

export interface ProjectTag {
  name: string;
  iconUrl: string;
}
