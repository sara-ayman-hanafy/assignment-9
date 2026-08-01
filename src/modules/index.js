import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./src/db/connection.js";

import userController
    from "./src/modules/users/user.controller.js";

import noteController
    from "./src/modules/notes/note.controller.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(
    "/users",
    userController
);

app.use(
    "/notes",
    noteController
);

app.get("/", (req, res) => {
    res.json({
        message:
            "Sticky Notes API Running"
    });
});

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});