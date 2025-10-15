import express from "express";
import { createNote,getAllNotes,getNoteById,deleteNote,updateNote} from "../controllers/notesController.js";

const router = express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.delete("/:id",deleteNote);
router.put("/:id",updateNote);

// router.get("/",(req,res) => {
//     res.status(200).send("You just fetched the notes");
// });

// router.post("/",(req,res) => {
//     res.status(201).json({message:"Note created successfully!"});
// });

// router.put("/:id",(req,res) => {
//     res.status(200).json({message:"Note updated successfully!"});
// });

// router.delete("/:id",(req,res) => {
//     res.status(200).json({message:"Note deleted successfully!"});
// });

export default router;