import { Request, Response } from 'express';

export interface CrudController {
  create(request: Request, response: Response): void;

  getById(request: Request, response: Response): void;

  getAutoSuggest(request: Request, response: Response): void;

  update(request: Request, response: Response): void;

  remove(request: Request, response: Response): void;
}
