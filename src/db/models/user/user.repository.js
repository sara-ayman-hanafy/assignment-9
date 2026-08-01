import { AbstractRepository } from "../../abstract.repository.js";
import { UserModel } from "./user.model.js";

class UserRepository extends AbstractRepository {
    constructor() {
        super(UserModel);
    }
}

export const userRepository =
    new UserRepository();