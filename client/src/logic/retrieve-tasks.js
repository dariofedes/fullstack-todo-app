import axios from 'axios'
import { API_URL } from '../constants'

/**
 * Retrieves all tasks from the server
 * 
 * @returns {Promise<Array>}
 */


const retrieveTasks = async () => {
    const {data: tasks} = await axios.get(`${API_URL}/tasks`)

    return tasks
}

export default retrieveTasks