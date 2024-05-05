import mongoose from "mongoose";
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.course || mongoose.model("course", schema);
export default model;
