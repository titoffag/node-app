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
  requestBody,
  response,
  BaseHttpController
} from 'inversify-express-utils';
import passport from 'passport';

import { DI_TOKEN } from '../../constants';
import { httpTryCatch, methodNotAllowed } from '../../tools';

import { AuthService } from './auth-service.interface';

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(DI_TOKEN.AuthService) private readonly authService: AuthService;

  @httpTryCatch
  @httpPost('/login', passport.authenticate('local'))
  async login(@requestBody() { username, password }: any) {
    await this.authService.login(username, password);
    return this.ok();
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    return methodNotAllowed(request, response);
  }
}
