import { Task } from "@/types/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  isEditModalOpen: boolean;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  isEditModalOpen: false
};
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    openEditModal(state, action: PayloadAction<Task>) {
      state.selectedTask = action.payload;
      state.isEditModalOpen = true;
    },
    closeEditModal(state) {
      state.selectedTask = null;
      state.isEditModalOpen = false;
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    }
  }
});

// Export a single selector
export const selectTaskState = (state: RootState) => state.tasks;

export const { setTasks, openEditModal, closeEditModal, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
