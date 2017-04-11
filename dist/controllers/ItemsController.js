'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.show = exports.create = undefined;

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(req, res, next) {
  _UserModel2.default.findOne({ _id: req.params.user_id }).then(function (user) {
    var item = {
      id: req.body.id,
      title: req.body.title,
      originalTitle: req.body.original_title,
      overview: req.body.overview,
      releaseDate: req.body.release_date,
      voteAverage: req.body.vote_average,
      voteCount: req.body.vote_count,
      posterPath: req.body.poster_path
    };
    user.items.push(item);
    user.save();
    return user;
  }).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    return next(err);
  });
};

var show = exports.show = function show(req, res, next) {
  _UserModel2.default.find({ _id: req.params.user_id }).exec().then(function (user) {
    if (!user) {
      return next('Could not find that user!');
    }
    return res.json(user);
  }).catch(function (err) {
    return next(err);
  });
};

var remove = exports.remove = function remove(req, res, next) {
  var itemId = req.params.item_id;
  _UserModel2.default.findOne({ _id: req.params.user_id }).exec().then(function (user) {
    user.items.id(itemId).remove();
    user.save();
    return user;
  }).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    return next(err);
  });
};

var ItemsController = { create: create, show: show, remove: remove };

exports.default = ItemsController;