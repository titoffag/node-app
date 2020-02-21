import Joi from '@hapi/joi';

import { Permission } from './group.entity';

export const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array<Permission>().required(),
});
