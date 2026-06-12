import express, { json } from "express";
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json());

app.use("/api/notes", noteRoutes)

connectDB();

app.listen(PORT, () => {
    console.log("Server is listening on POET:", PORT)
});

// mongodb+srv://dishanta:1234567890@cluster0.5hwcdny.mongodb.net/?appName=Cluster0