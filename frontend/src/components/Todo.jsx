import React from "react";

const Todo = ({ data }) => {
  const deleteTodoHandler = async () => {
    try {
      const res = await fetch(`http://localhost:3000/todo/${data?._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const resData = await res.json();
      console.log(resData);
    } catch (err) {
      console.log("error:" + err);
    }
  };

  return (
    <tr>
      <td>{data?.title}</td>
      <td>{data?.description}</td>
      <td>
        <button onClick={deleteTodoHandler}>Delete</button>
        {data?.completed ? (
          <button>Mark as Incomplete</button>
        ) : (
          <button>Mark as Complete</button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
