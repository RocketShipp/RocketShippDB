import express from 'express';
import ListController from '../controllers/ListController';

const router = express.Router();

router.post('/lists', ListController.create);

router.get('/lists/:id', ListController.specificList);

export default router;
