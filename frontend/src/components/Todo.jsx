

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
      alert(resData.msg);
      window.location.reload(true);
    } catch (err) {
      console.log("error:" + err);
    }
  };

  const handleCompleteTodo = async ()=>{
    try{

      const res = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: data?._id
        })
      });
      const resData = await res.json();
      if(!res.ok || resData?.status === 411){
        throw new Error("Something went wrong!");
      }

      alert(resData.msg)
      window.location.reload(true);
    }catch(err){
      console.log(`error: ${err}`)
    }
  }

  return (
    <>
    <tr className="px-4">
      <td >{data?.title}</td>
      <td>{data?.description}</td>
      <td>
        <button onClick={deleteTodoHandler} className="bg-red-400 me-3">Delete</button>
        {data?.completed ? (
          <div className="bg-cyan-400 inline-block px-2 py-3 rounded-lg">Completed</div>
        ) : (
          <button className="bg-green-400" onClick={handleCompleteTodo}>Mark as Complete</button>
        )}
      </td>
    </tr>
    </>
  );
};

export default Todo;
