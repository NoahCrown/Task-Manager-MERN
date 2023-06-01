import { TasksContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTasksContext = () => {
    const context = useContext(TasksContext)

    if (!context){
        throw Error("useTaskContext must be inside a tasksContextProvider")
    }

    return context

}