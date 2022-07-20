import { BaseSchema, extendSchema } from 'src/utils/baseSchema';

export const ComapnySchema = extendSchema(BaseSchema, {
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ceo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  inceptionDate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
