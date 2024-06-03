import express from "express";
import Todo from "./db.js";
import { createTodoSchema, updateTodoSchema } from "./types.js";
import cors from "cors";



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
  const todoPayload = req.body;
  const parseTodo = createTodoSchema.safeParse(todoPayload);
  console.log(parseTodo);
  if (!parseTodo.success) {
    res.status(411).json({
      msg: "You've sent wrong inputs!",
    });
    return;
  }
  //put the data in mongodb

  await Todo.create({
    title: todoPayload.title,
    description: todoPayload.description,
    completed: false,
  });

  res.status(200).json({
    msg: "Todo created successfully!",
  });
});

app.get("/todos", async function (req, res) {
  const todoList = await Todo.find();
  res.status(200).json({ todoList });
});

app.put("/completed", async function (req, res) {
  const updatedTodo = req.body;
  const parsedPayload = updateTodoSchema.safeParse(updatedTodo);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Invalid ID!",
    });
    return;
  }
  await Todo.update(
    {
      _id: req.body.id,
    },
    { completed: true }
  );

  res.status(200).json({
    msg: "Todo set as completed!",
  });
});

app.get("/todo/:id", async function (req, res) {
  try {
    const todo = await Todo.findById (req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.msg });
  }
});

app.delete("/todo/:id", async function (req, res) {
  console.log("this is delete handler")
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ msg: "Todo not found!" });
    }
    res.status(200).json({ msg: "Todo deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.msg });
  }
});

app.listen(port, () => {
  console.log("App is listening to port: " + port);
});
