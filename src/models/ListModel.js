import mongoose, {Schema} from 'mongoose';

const ListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    requried: true
  },
  items: [{
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    originalTitle: {
      type: String,
      required: true
    },
    overview: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    },
    voteAverage: {
      type: Number,
      required: true
    },
    voteCount: {
      type: Number,
      required: true
    },
    posterPath: {
      type: String,
      required: true
    }
  }]
});

export default mongoose.model('List', ListSchema);
