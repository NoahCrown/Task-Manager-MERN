import {useAuthContext} from './useAuthContext'
import {useTasksContext} from './useTaskContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: taskDispatch} = useTasksContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        toast.success('Logged out successfully')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        taskDispatch({type: 'SET_WORKOUTS', payload:null})

    }

    return {logout}
}