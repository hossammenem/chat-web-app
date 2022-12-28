import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    name: {type: String, required: [true, 'Enter Your Name']},
    email: {type: String, required: [true, 'Enter Your Email'], unique: true},
    password: {type: String, required: [true, 'Enter Your Password']},
    chatRooms: [{ type: objectId, ref: "Room" }],
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;