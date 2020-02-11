export interface UserService {
  getById(id: number): Promise<any>;

  create(objectToCreate: any): Promise<number>;

  update(id: number, objectToUpdate: any): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<any[]>;

  remove(id: number): Promise<void>;
}
