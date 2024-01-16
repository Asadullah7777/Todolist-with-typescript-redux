import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleted, getTodos, update } from "../redux/Reducer/FormSlice";
import axios from "axios";

const TableTodo = () => {
  const todos = useSelector((state: any) => state?.data.todo);
  console.log("Todos: ", todos);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState<boolean>();

  const FillTodo = async () => {
    axios
      .get("http://localhost:4100/todos")
      .then((res) => {
        dispatch(getTodos(res.data));
        console.log(res.data);
      })

      .catch((err) => console.error(err));
    // let rep = await fetchData();
  };

  useEffect(() => {
    FillTodo();
  }, []);

  useEffect(() => {
    // const items = [...todos];
    // // ↓ which means we're not manipulating state, but just our `items` array alone
    // const sorted: any[] = items.sort((a, b) => a.id - b.id);
    // setNewTodos(sorted);
  }, [todos]);

  function handleDelete(id: any) {
    axios
      .delete(`http://localhost:4100/delete/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo: any) => todo._id !== id);
        dispatch(getTodos(updatedTodos));
        // dispatch(deleted(id));
        // console.log(id);
      })
      .catch((err) => console.error(err));
    // dispatch(deleted(id));
  }
  function handleEdit(todo: any) {
    dispatch(update(todo));
    setIsEdit(true);
    setSelectedTodo(todo.id);
    setEditTodo(todo.todo);
  }
  const handleOk = async () => {
    setSelectedTodo(null);
    setIsEdit(false);
    const datas = {
      id: todos[todos.length - 1].id,
      todo: editTodo,
    };
    console.log(datas);
    // debugger
    dispatch(update(datas));
  };

  return (
    <div className="text-center pt-6">
      <h2 className="text-black text-2xl font-bold">Table Todo Data</h2>
      <table className="table-auto border-collapse w-[100%] mt-20 bg-red-200 border border-slate-400 ">
        <thead className="">
          <tr className="border border-black ">
            <th className="border border-black p-4">TODO_ID</th>
            <th className="border border-black p-4">TODO_LIST</th>
            <th className="border border-black p-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {[...todos]
            .sort((a, b) => a.id - b.id)
            .map((todo: any, index: any) => (
              <tr className="border border-black" key={todo.id}>
                <td className="border border-black">{todo._id}</td>
                <td className="border border-black">
                  {isEdit && todo.id === selectedTodo ? (
                    <input
                      type="text"
                      defaultValue={todo.todo}
                      onChange={(e: any) => setEditTodo(e.target.value)}
                    />
                  ) : (
                    <>{todo.todo}</>
                  )}
                </td>
                <td className="border border-black p-2 space-x-2">
                  {isEdit && todo.id === selectedTodo ? (
                    <button
                      className="bg-black text-white p-2 rounded-lg"
                      onClick={() => handleOk()}
                    >
                      Ok
                    </button>
                  ) : (
                    <button
                      className="btn bg-black text-white p-2 rounded-lg"
                      onClick={() => {
                        handleEdit(todo._id);
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="btn bg-black text-white p-2 rounded-lg"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTodo;
