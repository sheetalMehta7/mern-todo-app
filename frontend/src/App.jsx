import { useState } from "react";
import ListTodo from "./components/ListTodo";
import TodoForm from "./components/TodoForm";

function App() {
  const [isTodoForm, setTodoForm] = useState(false);
  return (
    <>
      <div>
        <h1>Your go to todo app!</h1>
        {!isTodoForm && (
          <button onClick={() => setTodoForm(true)}>Create Todo</button>
        )}
        {isTodoForm && <TodoForm />}
        <ListTodo />
      </div>
    </>
  );
}

export default App;
