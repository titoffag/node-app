export interface UserRepository {
  getById(id: number): Promise<any>;

  create(entityToCreate: any): Promise<number>;

  update(id: number, entityToUpdate: any): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<any[]>;

  softRemove(id: number): Promise<void>;

  hardRemove(id: number): Promise<void>;
}
