import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express()
const PORT =  process.env.PORT || 5001
const __dirname = path.resolve()

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}//it should be above rateLimiter middleware
app.use(express.json()); //add it before routes,so that we can access the contents of post request(this one gives access to req.body before we send response,other req.body will give undefined,this middleware will parse JSON bodies:req.body)
app.use(rateLimiter);


//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

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
app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); //server the react assets as static application

  app.get("*", (req, res) => { //in production go server.js and serve react application which is under index.html
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));//if you visit any route other that api render the react api
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:",PORT);
    });
});
