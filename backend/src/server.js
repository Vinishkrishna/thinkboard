import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express()
const PORT =  process.env.PORT || 5001


// middleware
app.use(
  cors({
    origin:"http://localhost:5173",
  }
));//it should be above rateLimiter middleware
app.use(express.json()); //add it before routes,so that we can access the contents of post request(this one gives access to req.body before we send response,other req.body will give undefined,this middleware will parse JSON bodies:req.body)
app.use(rateLimiter);


//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);
// app.use("/api/product",productRoutes);
// app.use("/api/posts",productRoutes);
// app.use("/api/payments",productRoutes);
// app.use("/api/emails",productRoutes);

//What is an Endpoint?
//An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.
// app.get("/api/notes",(req,res) => {
//     res.status(200).send("you got 10 notes");
// });

// app.post("/api/notes",(res,req) => {
//     res.status(201).json({message:"Note created successfully!"});
// });

// app.put("/api/notes/:id",(res,req) => {
//     res.status(200).json({message:"Note updated successfully!"});
// });

// app.delete("/api/notes/:id",(req,res) => {
//     res.status(200).json({message:"Note deleted successfully!"});
// });

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:",PORT);
    });
});

//mongodb+srv://vinishkrishna05_db_user:YaVtJX2iD6MnXHg7@cluster0.wccuh14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0