import mongoose, {Schema} from 'mongoose';

const ListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    requried: true
  },
  items: [{}]
});

export default mongoose.model('List', ListSchema);
