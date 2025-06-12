import mongoose, {Schema , model} from "mongoose"
import 'dotenv/config';

if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL');
}

mongoose.connect(process.env.MONGO_URL)

const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });


export const userModel = model("user" ,userSchema)


const contentSchema = new Schema({
  type: { type: String, required: true },
  link: { type: String, },
  title: { type: String, required: true },
  content: { type: String, default: "" }, 
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
}, { timestamps: true });

const SharedSnapshot = new mongoose.Schema({
  hash: String,
  contents: Array,
  createdAt: { type: Date, default: Date.now }
});

const linkSchema = new Schema({

  hash : String,
  userId: {type : objectId , ref : 'user' , required : true }
})


export const linkModel = model("link" , linkSchema);
export const contentModel = model("contents" , contentSchema);
export const sharedSnapshotModel = model("SharedSnapshot", SharedSnapshot);