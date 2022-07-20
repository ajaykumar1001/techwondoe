import * as mongoose from 'mongoose';

const extendSchema = (Schema, definition, options = {}) => {
  const output = Object.assign({}, Schema.options, options);
  const toReturn = new mongoose.Schema(
    Object.assign({}, Schema.obj, definition),
    output,
  );
  return toReturn;
};

const BaseSchema = new mongoose.Schema(
  {
    isDeleted: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export { BaseSchema, extendSchema };
