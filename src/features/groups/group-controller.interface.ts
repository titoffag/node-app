import { Request, Response } from 'express';

export interface GroupController {
  create(request: Request, response: Response): void;

  getById(request: Request, response: Response): void;

  getAll(request: Request, response: Response): void;

  update(request: Request, response: Response): void;

  remove(request: Request, response: Response): void;
}
