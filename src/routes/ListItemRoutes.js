import express from 'express';
import ListItemsController from '../controllers/ListItemsController';

const router = express.Router();

router.post('/lists/:list_id/items', ListItemsController.create);

router.get('/lists/:list_id/items', ListItemsController.show);

router.delete('/lists/:list_id/items/:movie_id', ListItemsController.remove);

export default router;
