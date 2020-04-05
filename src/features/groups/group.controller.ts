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
  BaseHttpController
} from 'inversify-express-utils';

import { DI_TOKEN, STATUS_CODE } from '../../constants';
import { httpTryCatch, validator, methodNotAllowed } from '../../tools';

import { GroupService } from './group-service.interface';
import { Group } from './group.entity';
import { groupSchema } from './group.validation';

@controller('/groups')
export class GroupController extends BaseHttpController {
  @inject(DI_TOKEN.GroupService) private readonly groupService: GroupService;

  @httpTryCatch
  @httpPost('/', validator.body(groupSchema))
  async create(@request() request: Request) {
    const { name, permissions } = request.body;

    const groupToCreate = new Group(name, permissions);
    const createdGroup = await this.groupService.create(groupToCreate);

    return this.created(`/groups/${createdGroup.id}`, createdGroup);
  }

  @httpTryCatch
  @httpGet('/')
  async getAll(@request() request: Request) {
    const groups = await this.groupService.getAll();
    
    return this.json(groups);
  }

  @httpTryCatch
  @httpGet('/:id')
  async getById(@request() request: Request) {
    const { id } = request.params;

    const group = await this.groupService.getById(+id);
    
    return this.json(group);
  }

  @httpTryCatch
  @httpPut('/:id', validator.body(groupSchema))
  async update(@request() request: Request) {
    const { id } = request.params;
    const { name, permissions } = request.body;

    const groupToUpdate = new Group(name, permissions);
    await this.groupService.update(+id, groupToUpdate);
    
    return this.statusCode(STATUS_CODE.NO_DATA);
  }

  @httpTryCatch
  @httpDelete('/:id')
  async remove(@request() request: Request) {
    const { id } = request.params;

    await this.groupService.remove(+id);
    
    return this.statusCode(STATUS_CODE.NO_DATA);
  }

  @httpTryCatch
  @httpPut('/:id/add-users')
  async addUsersToGroup(@request() request: Request) {
    const { id } = request.params;
    const { userIds } = request.body;

    await this.groupService.addUsersToGroup(+id, userIds);
    
    return this.statusCode(STATUS_CODE.NO_DATA);
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    return methodNotAllowed(request, response);
  }
}
