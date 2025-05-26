import mongoose, {Schema , model} from "mongoose"
import 'dotenv/config';

if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL environment variable is required');
}

mongoose.connect(process.env.MONGO_URL)

const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });


export const userModel = model("user" ,userSchema)


const contentSchema = new Schema({

    type : String,
    link : String,
    title : String,
    tags : [{ type : objectId , ref : 'Tag'}],
    userId: {type : objectId , ref : 'user' , required : true}
})


const linkSchema = new Schema({

  hash : String,
  userId: {type : objectId , ref : 'user' , required : true , unique : true}
})


export const linkModel = model("link" , linkSchema);
export const contentModel = model("content" , contentSchema);