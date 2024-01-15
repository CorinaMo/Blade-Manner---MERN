import mongoose from 'mongoose';

const ItemListSchema = new mongoose.Schema({
  api: { type: String, required: true, default: null },
  api_id: { type: String || Number, default: null },
  type: { type: String, required: true, default: null },
  title: { type: String, required: true, default: null },
  overview: { type: String, default: null },
  image: { type: String, default: null },
  extra_info: { type: Object, default: { data: null } },
});

const ItemList = mongoose.model('ItemList', ItemListSchema);

export default ItemList;
