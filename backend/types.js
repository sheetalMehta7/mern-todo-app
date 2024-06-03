import {z} from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(5, {message: "Title should have atleast 5 characters."}),
    description: z.string().min(10, {message: "Description should have atleast 10 characters."})
});

export const updateTodoSchema = z.object({
    id: z.string()
});



