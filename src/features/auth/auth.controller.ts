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
import passport from 'passport';

import { DI_TOKEN } from '../../constants';
import { httpTryCatch, methodNotAllowed } from '../../tools';

import { AuthService } from './auth-service.interface';

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(DI_TOKEN.AuthService) private readonly authService: AuthService;

  @httpTryCatch
  @httpPost('/login', passport.authenticate('local'))
  async login(@request() request: Request) {
    const { username, password } = request.body;

    await this.authService.login(username, password);
    
    return this.ok();
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    return methodNotAllowed(request, response);
  }
}
