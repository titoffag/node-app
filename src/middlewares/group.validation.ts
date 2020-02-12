import Joi from '@hapi/joi';

import { Permission } from '../features/groups';

export const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array<Permission>().required(),
});
