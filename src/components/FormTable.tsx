import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleted } from "../redux/Reducer/FormSlice";
import EditForm from "./EditForm";

// type DataType = {
//   key:number;
//  todo : string;
// };

const FormTable = () => {
  const todos = useSelector((state: any) => state?.data.todo);
  console.log("Todos: ", todos);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEidtTodo] = useState<boolean>();

  const columns = [
    {
      title: "TODO_ID",
      dataIndex: "id",
      render: (_text: any, _record: any, index: number) => index + 1,
    },

    {
      title: "TODO",
      dataIndex: "todo",
      key: "todo",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_unknow: any, record: any) => (
        <Space size="middle">
          <div
            onClick={() => {
              handleEdit(record);
            }}
          >
            Edit
          </div>

          <div
            onClick={() => {
              console.log("delete", record.id);
              dispatch(deleted(record.id));
            }}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const handleEdit = (data: any) => {
    setEidtTodo(data);
    setIsEdit(true);
  };

  return (
    <>
      <div>
        <Table columns={columns} dataSource={todos} />
      </div>
      {isEdit && (
        <EditForm isEdit={isEdit} editUser={editTodo} setIsEdit={setIsEdit} />
      )}
    </>
  );
};

export default FormTable;
