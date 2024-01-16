import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../redux/Reducer/FormSlice";
import { Modal } from "antd";

const EditForm = (props: any) => {
  const { editUser } = props;
  const [todoedit, setTodo] = useState(editUser.todo);
  const [open, setOpen] = useState(props.isEdit);

  const dispatch = useDispatch();

  const showModel = () => {
    props.setIsEdit(true);
    setOpen(false);
  };
  const handleOk = () => {
    props.setIsEdit(false);
    setOpen(false);
    const datas = {
      id: editUser._id,
      todoedit,
    };
    console.log(datas);
    // debugger
    dispatch(update(datas));
  };
  const handleCancel = () => {
    props.setIsEdit(false);
    setOpen(false);
  };

  return (
    <Modal
      title="Edit Todo"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form>
        <label>Todo:</label>
        <br />
        <input
          type="text"
          value={todoedit}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
      </form>
    </Modal>
  );
};

export default EditForm;
