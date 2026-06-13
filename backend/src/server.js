import express, { json } from "express";
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is listening on POET:", PORT)
    });
});
