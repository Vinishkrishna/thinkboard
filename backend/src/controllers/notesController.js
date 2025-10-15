import Note from "../models/Note.js"

// const getAllNotes = (req,res) => {
//     res.status(200).send("You just fetched the notes");
// }
// or
export async function getAllNotes(_,res) {//as we not use req so in that place _ is used
    try {
        const notes = await Note.find().sort({createdAt:-1}); //newest first  
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message:"Note not found!" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req,res) {
    try {
        const {title,content} = req.body;
        const note = new Note({title,content});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote(req,res) {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,});//new:true will give the updated note
        if(!updatedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in deleteNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote(req,res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote) return res.status(404).json({ message: "Note not found"});
        res.status(200).json(deleteNote);
    } catch (error) {
        console.error("Error in deleteNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
