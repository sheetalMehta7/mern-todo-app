import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose.connect(process.env.DATABASE_URL);

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;