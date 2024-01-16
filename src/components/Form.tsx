import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../redux/Reducer/FormSlice";
import FormTable from "./FormTable";
import TableTodo from "./TableTodo";
import axios from "axios";

const Form = () => {
  const totalitem = useSelector((state: any) => state?.data.todo?.length);
  const [todo, setTodo] = useState<string>("");

  const dispatch = useDispatch();
  const datahandle = (e: any) => {
    e.preventDefault();
    const user = { todo };
    axios
      .post("http://localhost:4100/create", user)
      .then((res) => {
        dispatch(save(res.data));
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="form bg-black h-80 pt-20 justify-center text-center items-center">
        <form className="space-y-6 ">
          <h2 className="text-white text-2xl mb-6 font-bold">TODO CRUD</h2>
          <div className="flex space-x-5 text-center items-center justify-center">
            <label className="text-white space-x-3 text-lg">Todo :</label>
            <input
              className="w-fit h-[50px] pl-4 rounded-lg"
              type="text"
              placeholder="Todo list"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-white text-black w-28 rounded-lg p-2"
            type="submit"
            onClick={datahandle}
          >
            Save
          </button>
        </form>
      </div>
      {/* //tableFrom */}
      {/* <FormTable /> */}
      <TableTodo />
    </>
  );
};

export default Form;
