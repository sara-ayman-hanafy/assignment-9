import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log("DB Connected successfully"))
        .catch(err => console.log(err));
};