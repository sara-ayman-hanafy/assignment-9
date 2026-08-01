import { NoteModel } from "../../db/models/notes/notes.model.js";
import mongoose from "mongoose";

export const createNote = async (req, res) => {
    const note = await NoteModel.create({
        ...req.body,
        userId: req.userId,
    });

    res.json(note);
};

export const updateNote = async (req, res) => {
    const note =
        await NoteModel.findOneAndUpdate(
            {
                _id: req.params.noteId,
                userId: req.userId,
            },
            req.body,
            { new: true }
        );

    res.json(note);
};

export const replaceNote = async (req, res) => {
    const note =
        await NoteModel.findOneAndReplace(
            {
                _id: req.params.noteId,
                userId: req.userId,
            },
            {
                ...req.body,
                userId: req.userId,
            },
            { new: true }
        );

    res.json(note);
};

export const updateAllTitles = async (
    req,
    res
) => {
    const result =
        await NoteModel.updateMany(
            {
                userId: req.userId,
            },
            {
                title: req.title,
            }
        );

    res.json(result);
};

export const deleteNote = async (
    req,
    res
) => {
    const note =
        await NoteModel.findOneAndDelete({
            _id: req.params.noteId,
            userId: req.userId,
        });

    res.json(note);
};

export const paginateNotes = async (
    req,
    res
) => {
    const page =
        Number(req.query.page) || 1;

    const limit =
        Number(req.query.limit) || 3;

    const skip =
        (page - 1) * limit;

    const notes =
        await NoteModel.find({
            userId: req.userId,
        })
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit);

    res.json(notes);
};

export const getNoteById = async (
    req,
    res
) => {
    const note =
        await NoteModel.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

    if (!note) {
        return res.status(404).json({
            message: "Note not found",
        });
    }

    res.json(note);
};

export const getByContent = async (
    req,
    res
) => {
    const note =
        await NoteModel.findOne({
            content: req.query.content,
            userId: req.userId,
        });

    res.json(note);
};

export const noteWithUser = async (
    req,
    res
) => {
    const notes =
        await NoteModel.find({
            userId: req.userId,
        })
            .select(
                "title userId createdAt"
            )
            .populate(
                "userId",
                "email"
            );

    res.json(notes);
};

export const aggregateNotes =
    async (req, res) => {
        const notes =
            await NoteModel.aggregate([
                {
                    $match: {
                        userId:
                            new mongoose.Types.ObjectId(
                                req.userId
                            ),
                        title: {
                            $regex:
                                req.query.title || "",
                            $options: "i",
                        },
                    },
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },

                {
                    $unwind: "$user",
                },

                {
                    $project: {
                        title: 1,
                        content: 1,
                        "user.name": 1,
                        "user.email": 1,
                    },
                },
            ]);

        res.json(notes);
    };

export const deleteAllNotes =
    async (req, res) => {
        const result =
            await NoteModel.deleteMany({
                userId: req.userId,
            });

        res.json(result);
    };