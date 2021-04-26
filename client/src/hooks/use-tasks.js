import { useState, useEffect } from 'react'
import { retrieveTasks, saveTask as _saveTask, deleteTask as _deleteTask } from '../logic'

const useTasks = ({ onError } = {}) => {
    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        return (async () => await loadTasks())()
    }, [])

    const loadTasks = async () => {
        try {
            const tasks = await retrieveTasks()

            setTasks(tasks)
        } catch(error) {
            onError && onError(error)
        }
    }

    const saveTask = async (task) => {
        try {
            if(task.id) {
                const _tasks = tasks.map(_task => {
                    if(_task.id === task.id) {
                        return task
                    } else {
                        return _task
                    }
                })
                
                setTasks(_tasks)
            } else {
                setTasks([...tasks, task])
            }

            await _saveTask(task)

            await loadTasks()
        } catch(error) {
            onError(error)

            setTasks(null)

            await loadTasks()
        }
    }

    const deleteTask = async taskId => {
        try {
            const _tasks = tasks.filter(task => task.id !== taskId)

            setTasks(_tasks)

            await _deleteTask(taskId)

            await loadTasks()
        } catch(error) {
            onError && onError(error)

            setTasks(null)

            await loadTasks()
        }
    }

    return {
        tasks,
        saveTask,
        deleteTask,
    }
}

export default useTasks