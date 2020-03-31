import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  all,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from 'inversify-express-utils';

import { DI_TOKEN, STATUS_CODE } from '../../constants';
import { validator } from '../../tools';

import { GroupService } from './group-service.interface';
import { Group } from './group.entity';
import { groupSchema } from './group.validation';

@controller('/groups')
export class GroupController {
  @inject(DI_TOKEN.GroupService) private readonly groupService: GroupService;

  @httpPost('/', validator.body(groupSchema))
  async create(@request() request: Request, @response() response: Response) {
    const { name, permissions } = request.body;

    const groupToCreate = new Group(name, permissions);
    const id = await this.groupService.create(groupToCreate);
    response.location(`/groups/${id}`).sendStatus(STATUS_CODE.CREATED);
  }

  @httpGet('/')
  async getAll(@request() request: Request, @response() response: Response) {
    const groups = await this.groupService.getAll();
    response.status(STATUS_CODE.OK).json(groups);
  }

  @httpGet('/:id')
  async getById(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    const group = await this.groupService.getById(+id);
    response.status(STATUS_CODE.OK).json(group);
  }

  @httpPut('/:id', validator.body(groupSchema))
  async update(@request() request: Request, @response() response: Response) {
    const { id } = request.params;
    const { name, permissions } = request.body;

    const groupToUpdate = new Group(name, permissions);
    await this.groupService.update(+id, groupToUpdate);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @httpDelete('/:id')
  async remove(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    await this.groupService.remove(+id);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @httpPut('/:id/add-users')
  async addUsersToGroup(@request() request: Request, @response() response: Response) {
    const { id } = request.params;
    const { userIds } = request.body;

    await this.groupService.addUsersToGroup(+id, userIds);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    // todo: this method to abstract base controller
    const {
      route: { methods, path },
      method,
    } = request;
    const allowedMethods = Object.keys(methods)
      .filter(method => method !== '_all')
      .map(key => key.toUpperCase())
      .join(', ') || 'GET, POST, PUT, DELETE';

    const message = `Unsupported method ${method} applied at ${path}. Allowed methods: ${allowedMethods}`;
    console.log(message);

    response.header('Allow', allowedMethods).sendStatus(STATUS_CODE.METHOD_NOT_ALLOWED);
  }
}
