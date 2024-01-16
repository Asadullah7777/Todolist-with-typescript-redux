import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type FormUser = {
  todo: Array<{
    id: number;
    todo: string;
  }>;
  status: string;
  error: any;
};

const initialState: FormUser = {
  todo: [],
  status: "idle",
  error: "",
};

export const fetchData = createAsyncThunk("todo/fetchData", async () => {
  const response = await axios.get("http://localhost:4100/todos");
  console.log("rrrrrrr", response);
  // getTodos(response.data);
  return response.data;
});

export const formSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    save: (state = { ...initialState }, action) => {
      console.log("kjfashjkaf", action.payload);
      state.todo.push(action.payload);
    },
    update: (state, action) => {
      console.log("swchskcj");
      const allUser = [...state.todo];
      const newData = allUser?.filter(
        (record: any) => record.id !== action.payload.id
      );
      state.todo = [...newData, action.payload];
    },
    deleted: (state, action) => {
      console.log(`action.payload = ${action.payload}`);

      state.todo = state.todo.filter(
        (record: any) => record.id !== action.payload
      );
    },
    getTodos: (state, action) => {
      state.todo = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        debugger;
        console.log("hhhhhh", state);
        state.todo = [];
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { save, update, deleted, getTodos } = formSlice.actions;
export default formSlice.reducer;
