'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ItemsController = require('../controllers/ItemsController');

var _ItemsController2 = _interopRequireDefault(_ItemsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/rocketfaves/:user_id', _ItemsController2.default.create);

router.get('/rocketfaves/:user_id', _ItemsController2.default.show);

router.delete('/rocketfaves/:user_id/item/:item_id', _ItemsController2.default.remove);

exports.default = router;