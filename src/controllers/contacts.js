import { getAllContacts } from '../services/contacts.js';
import { getContactById } from '../services/contacts.js';
import { createContact } from '../services/contacts.js';
import { updateContact } from '../services/contacts.js';
import { deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import Joi from 'joi';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    ...filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(204).send();
};

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

  isFavorite: Joi.boolean().default(false).messages({
    'boolean.base': '"isFavorite" must be a boolean',
  }),

  contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
    'any.only': '"contactType" must be one of [work, home, personal]',
    'string.base': '"contactType" must be a string',
    'any.required': '"contactType" is required',
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

  isFavorite: Joi.boolean().messages({
    'boolean.base': '"isFavorite" must be a boolean',
  }),

  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': '"contactType" must be one of [work, home, personal]',
    'string.base': '"contactType" must be a string',
  }),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});
