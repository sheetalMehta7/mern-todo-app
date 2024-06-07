import { useState } from "react";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const createTodoHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description
        })
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const resData = await res.json();
  
      if (resData.status === 411) {
        throw new Error(resData.msg);
      }

      alert(resData.msg);
      window.location.reload(true)

    } catch (err) {
      console.log(`error: ${err}`);
    }
  };
  

  return (
    <form className="min-w-96 flex flex-col my-10">
      <input
        type="text"
        placeholder="Enter todo title"
        value={todo.title}
        onChange={(e) => {
          setTodo((prev) => ({ ...prev, title: e.target.value }));
        }}
        className="px-4 py-5" 
      />
      <input
        type="text"
        placeholder="Enter todo description"
        value={todo.description}
        onChange={(e) => {
          setTodo((prev) => ({ ...prev, description: e.target.value }));
        }}
        className="px-4 py-5"
      />
      <button type="submit" onClick={createTodoHandler} className="bg-cyan-600">
        Create
      </button>
    </form>
  );
};

export default TodoForm;
