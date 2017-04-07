import UserModel from '../models/UserModel';

export const create = function (req,res,next) {
  UserModel.findOne({_id: req.params.user_id})
    .then(user => {
      const item = {
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
    })
    .then(user => {
      return res.json(user);
    })
    .catch(err => next(err));
};

export const show = function (req,res,next) {
  UserModel.find({_id: req.params.user_id}).exec()
  .then(user => {
    if (!user) {
      return next('Could not find that user!');
    }
    return res.json(user);
  })
  .catch(err => next(err));
};

export const remove = function (req, res, next) {
  const itemId = req.params.item_id;
  UserModel.findOne({_id: req.params.user_id }).exec()
  .then(user => {
    user.items.id(itemId).remove();
    user.save();
    return user;
  })
  .then(user => {
    return res.json(user);
  })
  .catch(err => next(err));
};

const ItemsController = { create, show, remove };

export default ItemsController;
