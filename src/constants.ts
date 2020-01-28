export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_DATA = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export const routes = {
  api: '/api',
  users: {
    name: '/users',
    root: '/',
    byId: '/:id',
  },
};

export type TRawUser = {
  login: string,
  password: string,
  age: number,
}
