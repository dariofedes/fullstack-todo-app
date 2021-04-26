import axios from 'axios'
import { API_URL } from '../constants'
import { constants } from 'commons'

/**
 * Calls the server to create or update a task
 * 
 * @param {Object<string>} task  containing id, title, description and priority
 * 
 * @throws {TypeErorr} on no string id or empty string id
 * @throws {TypeErorr} on no string title
 * @throws {TypeErorr} on no string description
 * @throws {TypeErorr} on no string priority
 * @throws {RangeError} on not valid priority
 * 
 * @returns {Promise<Object>} the created or updated task
 */

const saveTask = ({ id, title, description, priority }) => {
    if(id && typeof id !== 'string') throw new TypeError('id must be a string')
    if(id === '') throw new TypeError('id must be a string')
    if(title === '' || typeof title !== 'string') throw new TypeError('title must be a non empty string')
    if(description && typeof description !== 'string') throw new TypeError('description must be a string')
    if(!Object.values(constants.priorities).includes(priority)) throw new RangeError(`priority must be one of ${Object.values(constants.priorities)}`)

    return (async () => {
        if(id) {
            const { data: updatedTask } = await axios.patch(`${API_URL}/task/${id}`, { title, description, priority })

            return updatedTask
        } else {
            const { data: createdTask } = await axios.post(`${API_URL}/task`, { title, description, priority })

            return createdTask
        }
    })()
}

export default saveTask