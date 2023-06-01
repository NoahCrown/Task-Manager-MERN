import { createContext, useReducer } from "react";

const TasksContext = createContext()

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        tasks: action.payload,
      };
    case 'CREATE_TASK':
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((t) => t._id !== action.payload._id),
      };
      case 'UPDATE_TASK':
        return {
          tasks: state.tasks.map((t) => {
            if (t._id === action.payload._id) {
              return action.payload; // Replace the task with the updated task
            }
            return t; // Keep the other tasks unchanged
          }),
        };
      
    default:
      return state;
  }
};

  

const TaskContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: null
    })

    return (
        <TasksContext.Provider value={{...state, dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}

export {TasksContext, TaskContextProvider}

