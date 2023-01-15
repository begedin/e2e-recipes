export type User = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  title: string;
  // eslint-disable-next-line camelcase
  user_id: number;
};
