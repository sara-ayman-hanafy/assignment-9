import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,

            validate: {
                validator(value) {
                    return value !== value.toUpperCase();
                },
                message:
                    "Title can't be uppercase"
            }
        },

        content: {
            type: String,
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const NoteModel =
    mongoose.models.Note ||
    mongoose.model("Note", noteSchema);