import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./DB/connection.js";

import userController from "./modules/users/user.controller.js";
import noteController from "./modules/notes/note.controller.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userController);

app.use("/notes", noteController);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server Running On Port ${process.env.PORT}`);
});