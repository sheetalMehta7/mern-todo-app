import { useState } from "react";
import ListTodo from "./components/ListTodo";
import TodoForm from "./components/TodoForm";

function App() {
  const [isTodoForm, setTodoForm] = useState(false);
  return (
    <>
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-5">Your go to todo app!</h1>
       

        {!isTodoForm && (
          <button onClick={() => setTodoForm(true)} className="bg-green-600 my-5">Create Todo</button>
        )}
        {isTodoForm && <TodoForm />}
        <ListTodo />
      </div>
    </>
  );
}

export default App;
