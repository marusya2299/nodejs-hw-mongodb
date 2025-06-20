// src/utils/parseFilterParams.js
const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const allowedTypes = ['work', 'home', 'personal'];
  if (allowedTypes.includes(type)) return type;
};

const parseIsFavourite = (value) => {
  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
