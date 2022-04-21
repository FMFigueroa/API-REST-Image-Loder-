import {Router} from 'express';
const router = Router();
import {validateId} from '../validators/storage.validators.js';
import fileUpload from 'express-fileupload';
import {
  getItems,
  createItem,
  getItem,
  deleteItem
       } from '../controllers/storage.controllers.js';


/*==========================================================================*/
// baseURL/storage => Get Method
router.get('/storage', getItems);

// baseURL/storage => Create Method
router.post('/storage', fileUpload({
    useTempFiles : true,
    tempFileDir : './tempAsset',
  }),createItem);

// baseURL/storage/:id => Get Method
router.get('/storage/:id',validateId, getItem);


// baseURL/storage/:id => Delete Method
router.delete('/storage/:id', validateId, deleteItem);

export default router;