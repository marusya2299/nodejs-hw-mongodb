import express from 'express';
import { getContactsController } from '../controllers/contactsController.js';
import { getContactByIdController } from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController);

export default router;

