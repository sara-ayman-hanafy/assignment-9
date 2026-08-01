import { AbstractRepository } from "../../abstract.repository.js";
import { NoteModel } from "./notes.model.js";

class NoteRepository extends AbstractRepository {
    constructor() {
        super(NoteModel);
    }
}

export const noteRepository =
    new NoteRepository();