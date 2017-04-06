import ListModel from '../models/ListModel';

const ListController = {

  create(req, res, next) {
    const list = new ListModel({title: req.body.title, userId: req.user._id});
    list.save().then(newList => res.json(newList)).catch(err => next(err));
  },

  specificList(req,res,next) {
    ListModel.findOne({_id: req.params.id, userId: req.user._id}).exec()
    .then(list => {
      if (!list) {
        return next('Could not find that list!');
      }
      return res.json(list);
    })
    .catch(err => next(err));
  }
};

export default ListController;
