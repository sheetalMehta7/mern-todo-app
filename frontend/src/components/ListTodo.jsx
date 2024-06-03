import React, { useEffect, useState } from "react";
import Todo from "./Todo";

const ListTodo = () => {
    const [list, setList] = useState([]);
  useEffect( () => {
    const fetchData = async ()=>{
        try {
            const res = await fetch("http://localhost:3000/todos")
            const data = await res.json();
            setList(data?.todoList);
        }catch(err){
            console.error('Error fetching data:', err);
        }
    }
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {list?.length > 0 ? list?.map((item) => {
          return <Todo key={item?._id} data={item}/>;
        }) : "There's no todo. Please create a todo!"}

      </tbody>
    </table>
  );
};

export default ListTodo;
