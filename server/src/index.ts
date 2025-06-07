import express from "express"
import jwt from "jsonwebtoken"
import {contentModel, linkModel, userModel, sharedSnapshotModel} from "./db"
import {JWT_PASSWORD } from "./config"
import { userMiddleware } from "./middleware"
import { random } from "./utils"
import cors from "cors"
import 'dotenv/config';
import { v4 as uuidv4 } from "uuid"; 

const app = express();
app.use(express.json());
app.use(cors());
import path from 'path';

app.use(express.static(path.join(__dirname, '../client/build')))


app.post("/api/v1/signup" ,async (req, res) => {

    //add Zod and hashing
    const username = req.body.username;
    const password = req.body.password;
    try {
    await userModel.create({
        username : username,
        password : password
    })
    res.json({
        massage : "user signed up"
     })
   } catch(e){
      res.status(411).json({
         massage : "user alredy exist"
     })
   } 
})
app.post("/api/v1/signin" , async (req, res) => {
 
    const username = req.body.username;
    const password = req.body.password;

    const existUser = await userModel.findOne({
        username,
        password
    })

    if(existUser){
        const token = jwt.sign({
            id: existUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            massage : "incorret credentials"
        })
    }

})

app.post("/api/v1/content" ,userMiddleware, async (req, res) => {

    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const content = req.body.content || ""; // Optional content field
    
    try{
        await contentModel.create({
        link,
        type,
        title,
        content,

        //@ts-ignore
        userId : req.userId,
        tags : []

    })

     res.json({
        massage : "content added"
    })
  } catch(e){
        console.error("Error creating content:", e);
        res.status(500).json({ message: "Something went wrong" });
  }

})

app.get("/api/v1/content" , userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId

    const content = await contentModel.find({
        userId : userId
    }).populate("userId" )
    res.json({
        content
    })
})

app.put("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, content } = req.body;

  try {
    //@ts-ignore
    const userId = req.userId;

    const note = await contentModel.findOneAndUpdate(
      { link, userId }, 
      { content },
      { new: true }
    );

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return; 
    }

    res.json({ message: "Note updated", note });
  } catch (e) {
    console.error("Error updating content:", e);
    res.status(500).json({ message: "Failed to update note" });
  }
});


app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    //@ts-ignore
    const userId = req.userId;

    await contentModel.deleteOne({
        link,
        userId
    });

    res.json({ message: "Content deleted" });
})


app.get("/api/v1/brain/:shareLink" , async(req, res) => {

    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            massage : "incorrect input"
        })
        return;
    }
    //userId
    const contents = await contentModel.find({
        //@ts-ignore
        userId : link.userId
    })


    const user = await userModel.findOne({
        //@ts-ignore
        _id : link.userId 
    })

    if(!user){
        res.status(411).json({
            massage : "User Not found"
        })
        return; 
    }

    res.json({
        username : user.username,
        contents : contents
    })
})


app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const contents = await contentModel.find({ userId });
    const hash = uuidv4();
    await sharedSnapshotModel.create({
        hash,
        contents,
        createdAt: new Date()
    });
    res.json({ hash });
});

app.get("/api/v1/brain/snapshot/:hash", async (req, res) => {
    const { hash } = req.params;
    const snapshot = await sharedSnapshotModel.findOne({ hash });
    if (!snapshot) {
        res.status(404).json({ message: "Snapshot not found" });
        return;
    }
    res.json({ contents: snapshot.contents });
});

app.get("/api/v1/content/note/:title", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const title = req.params.title;
    const note = await contentModel.findOne({
        title: decodeURIComponent(title),
        userId: userId,
        type: "notes"
    });

    if (!note) {
        res.status(404).json({ message: "Note not found" });
        return;
    }

    res.json({
        title: note.title,
        content: note.content,
        link: note.link,
        type: note.type
    });
});

app.listen(3001 , () => {
    console.log("Server is running on port 3001")
})