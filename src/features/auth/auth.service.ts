import { inject, injectable } from 'inversify';

import { AuthService } from './auth-service.interface';

// todo: todo
@injectable()
export class AuthServiceImpl implements AuthService {
  async login(username: string, password: string) {
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hash = await bcrypt.hash(password, salt);
    // todo: сохр хэш в бд
  }

  async verify(username: string, password: string) {
    // todo: получить хэш из бд
    // const match = await bcrypt.compare(password, hash);
    // return match;
  }

  // jwtFromRequest: fromAuthHeaderAsBearerToken

  // private async verifyToken(token): Promise<any> {
  //   const data = this.jwtService.verify(token);
  //   const tokenExists = await this.tokenService.exists(data._id, token);

  //   if (tokenExists) {
  //     return data;
  //   }

  //   throw createError('Unauthorized');
  // }

  // private async generateToken(data, options?: any): Promise<string> {
  //   return this.jwtService.sign(data, options);
  // }

  // private async saveToken(createUserTokenDto: any) {
  //   const userToken = await this.tokenService.create(createUserTokenDto);

  //   return userToken;
  // }
}
