import React, { useEffect, useState } from "react";
import Todo from "./Todo";

const ListTodo = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/todos");
        const data = await res.json();
        setList(data?.todoList);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {list?.length === 0 && <p className="text-slate-400 mt-5">There's no todo. Please create a todo!</p>}
      {list?.length > 0 && (
        <table className="table-fixed border-spacing-6 border-separate  border border-slate-500 max-h-20 h-screen rounded-xl mt-4">
          <thead>
            <th className="border rounded border-slate-600">Title</th>
            <th className="border rounded border-slate-600">Description</th>
            <th className="border rounded border-slate-600">Actions</th>
          </thead>
          <tbody>
            {list?.map((item) => {
              return <Todo key={item?._id} data={item} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default ListTodo;
