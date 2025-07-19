
import Joi from 'joi';

const stringField = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: stringField.required().messages({
    'string.base': '"name" must be a string',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" should have at least {#limit} characters',
    'string.max': '"name" should have at most {#limit} characters',
    'any.required': '"name" is required',
  }),

  phoneNumber: stringField.required().messages({
    'string.base': '"phoneNumber" must be a string',
    'string.empty': '"phoneNumber" cannot be empty',
    'string.min': '"phoneNumber" should have at least {#limit} characters',
    'string.max': '"phoneNumber" should have at most {#limit} characters',
    'any.required': '"phoneNumber" is required',
  }),

  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'string.empty': '"email" cannot be empty',
    'any.required': '"email" is required',
  }),

 isFavourite: Joi.boolean()
  .truthy('true')
  .falsy('false', '')
  .default(false)
  .messages({
    'boolean.base': '"isFavourite" must be a boolean',
  }),

  contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
    'any.only': '"contactType" must be one of [work, home, personal]',
    'string.base': '"contactType" must be a string',
    'any.required': '"contactType" is required',
  }),
   photo: Joi.any()
  .optional()
  .messages({
    'any.empty': '"photo" must not be empty',
  }),

});


export const updateContactSchema = Joi.object({
  name: stringField.messages({
    'string.base': '"name" must be a string',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" should have at least {#limit} characters',
    'string.max': '"name" should have at most {#limit} characters',
  }),

  phoneNumber: stringField.messages({
    'string.base': '"phoneNumber" must be a string',
    'string.empty': '"phoneNumber" cannot be empty',
    'string.min': '"phoneNumber" should have at least {#limit} characters',
    'string.max': '"phoneNumber" should have at most {#limit} characters',
  }),

  email: Joi.string().email().messages({
    'string.email': '"email" must be a valid email',
    'string.empty': '"email" cannot be empty',
  }),

  isFavourite: Joi.boolean()
  .truthy('true')
  .falsy('false', '')
  .default(false)
  .messages({
    'boolean.base': '"isFavourite" must be a boolean',
  }),



  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': '"contactType" must be one of [work, home, personal]',
    'string.base': '"contactType" must be a string',
  }),
  photo: Joi.any()
  .optional()
  .messages({
    'any.empty': '"photo" must not be empty',
  }),

}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});
