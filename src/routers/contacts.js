import { Router } from 'express';
import { getContactsController } from '../controllers/contacts.js';
import { getContactByIdController } from '../controllers/contacts.js';
import {createContactController } from '../controllers/contacts.js';
import { patchContactController } from '../controllers/contacts.js';
import { deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(patchContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;

