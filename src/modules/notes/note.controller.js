import { Router } from "express";
import * as noteService from "./note.service.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

// Create Note
router.post(
    "/",
    auth,
    noteService.createNote
);

// Update All Titles
router.patch(
    "/all",
    auth,
    noteService.updateAllTitles
);

// Pagination
router.get(
    "/paginate-sort",
    auth,
    noteService.paginateNotes
);

// Search By Content
router.get(
    "/note-by-content",
    auth,
    noteService.getByContent
);

// Populate User
router.get(
    "/note-with-user",
    auth,
    noteService.noteWithUser
);

// Aggregation
router.get(
    "/aggregate",
    auth,
    noteService.aggregateNotes
);

// Replace Note
router.put(
    "/replace/:noteId",
    auth,
    noteService.replaceNote
);

// Update Single Note
router.patch(
    "/:noteId",
    auth,
    noteService.updateNote
);

// Delete Single Note
router.delete(
    "/:noteId",
    auth,
    noteService.deleteNote
);

// Delete All Notes
router.delete(
    "/",
    auth,
    noteService.deleteAllNotes
);

// Get Note By id
router.get(
    "/:id",
    auth,
    noteService.getNoteById
);

export default router;