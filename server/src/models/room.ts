import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title: {type: String, required: [true, 'Enter Room Name'], unique: true},
    members: [{ type: String }],
    messages: [{type: {}}],
}, { timestamps: true });

const roomModel = mongoose.model("Room", roomSchema);

export default roomModel;