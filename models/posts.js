const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const Schema = mongoose.Schema;


const postsSchema = new Schema({
    text: { type: String, required: true },
    postedBy: { type: ObjectId, ref: "User", required: true }
}, { timestamps: true });


module.exports = mongoose.model('Post', postsSchema);