import mongoose from "mongoose";

// 1- create a schema
// 2- model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        },
        content:{
            type:String,
            required:true,
        },
    },
    { timestamps : true } //createdAt,updatedAt
);

//create a node model based on this schema
const Note = mongoose.model("Note",noteSchema)

export default Note