import { Router } from 'express';
import { getContactsController } from '../controllers/contacts.js';
import { getContactByIdController } from '../controllers/contacts.js';
import {createContactController } from '../controllers/contacts.js';
import { patchContactController } from '../controllers/contacts.js';
import { deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../controllers/contacts.js';
const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;

