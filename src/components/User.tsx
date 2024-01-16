import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Form from "./Form";
import FormTable from "./FormTable";

const User = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "/formtodo",
      label: `FormTodo`,
      children: <Form />,
    },
    {
      key: "/formtable",
      label: `FormTable`,
      children: <FormTable />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default User;
