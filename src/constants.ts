export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_DATA = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export const DI_TOKEN = {
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),
};
