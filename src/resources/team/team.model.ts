import * as mongoose from 'mongoose';
import { BaseSchema, extendSchema } from 'src/utils/baseSchema';

const { Schema } = mongoose;

export const TeamSchema = extendSchema(BaseSchema, {
  uuid: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  cId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  tlName: {
    type: String,
    required: true,
  },
});
