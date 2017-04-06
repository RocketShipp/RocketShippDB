import express from 'express';
import ItemsController from '../controllers/ItemsController';

const router = express.Router();

router.post('/rocketfaves/:user_id', ItemsController.create);

router.get('/rocketfaves/:user_id', ItemsController.show);

router.delete('/rocketfaves/:user_id/item/:item_id', ItemsController.remove);

export default router;
