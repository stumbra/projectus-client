export type EventType = {
  title: string;
  type: string;
  createdAt: string;
  ticket: { id: string; number: number; title: string };
};

export type PersonType = {
  id?: string;
  name?: string;
  surname?: string;
  avatar?: string;
  confirmed?: boolean;
  email?: string;
  status?: string;
};

export type SectionType = {
  id: string;
  title: string;
  board: BoardType;
};

export type BoardType = {
  project: ProjectType;
};

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  personnel: PersonType[];
  owners: PersonType[];
  board: BoardType;
  createdAt: string;
  githubReleasesURL: string;
};

export type TicketType = {
  id: string;
  number: number;
  title: string;
  assignees: PersonType[];
  type: string;
  priority: string;
  createdAt: string;
  section: SectionType;
  deadline?: string;
  description: string;
  creator: PersonType;
  hours: number;
};

export type MessageType = {
  id: string;
  creator: PersonType;
  createdAt: string;
  body: string;
};
