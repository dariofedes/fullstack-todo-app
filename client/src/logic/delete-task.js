import axios from 'axios'
import { API_URL } from '../constants'

/**
 * Calls the server to delete a task
 * 
 * @param {string} id  containing id, title, description and priority
 * 
 * @throws {TypeErorr} on no string id
 * 
 * @returns {Promise}
 */

const deleteTask = id => {
    if(!id || typeof id !== 'string') throw new TypeError('id must be a string')

    return (async () => {
        const { data: task } =  await axios.delete(`${API_URL}/task/${id}`)

        return task
    })()   
}

export default deleteTask