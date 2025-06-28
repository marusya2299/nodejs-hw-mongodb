import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({ 
  userId,                
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id', 
  type,
  isFavourite,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = { userId };

  if (type) {
    filter.contactType = type;
  }
  
  if (typeof isFavourite === 'boolean') {
    filter.isFavourite = isFavourite;
  }

  const contactsQuery = ContactsCollection.find(filter);

  const contactsCount = await ContactsCollection.countDocuments(filter);

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id, userId) => {
  return await ContactsCollection.findOne({ _id: id, userId });
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (id, userId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (id, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  return contact;
};
