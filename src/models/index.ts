import { UserModel, UserSchema } from "./User";

export const collections = [
    { schema: UserSchema, name: UserModel.collection.name },
];
