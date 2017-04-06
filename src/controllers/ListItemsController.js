import ListModel from '../models/ListModel';

export const create = function (req,res,next) {
  ListModel.findOne({_id: req.params.list_id, userId: req.user._id})
    .then(list => {
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
      list.items.push(item);
      return list.save();
    })
    .then(list => {
      return res.json(list.items[list.items.length - 1]);
    })
    .catch(err => next(err));
};

export const show = function (req,res,next) {
  ListModel.find({_id: req.params.list_id, userId: req.user._id}).exec()
  .then(list => {
    if (!list) {
      return next('Could not find that list!');
    }
    return res.json(list.items);
  })
  .catch(err => next(err));
};

export const remove = function (req, res, next) {
  const itemId = req.params.movie_id;

  ListModel.findOne({_id: req.params.list_id, userId: req.user._id}).exec()
  .then(list => {
    list.items.id(itemId).remove();
    return list.save();
  })
  .then(list => {
    return res.json(list);
  })
  .catch(err => next(err));
};

const ListItemsController = { create, show, remove };

export default ListItemsController;
