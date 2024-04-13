export interface RedirectData {
  iconUrl: string;
  redirectUrl: string;
  title: string;
}

export interface ProjectData {
  name: string;
  title: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl: string;
  description: string;
  featuredTag: ProjectTag;
  languageTags: ProjectTag[];
  attachments: { [key: string]: Attachment };
}

export interface ProjectTag {
  name: string;
  iconUrl: string;
}

export interface Attachment {
  url: string;
  alt: string;
  width: number;
  height: number;
}
