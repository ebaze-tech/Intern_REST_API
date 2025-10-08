export type ID = string;

export interface Blog {
  id: ID;
  title: string;
  body: string;
  author: string;
  published: boolean;
}

export interface User {
  id: ID;
  username: string;
  email: string;
  age?: number;
}
