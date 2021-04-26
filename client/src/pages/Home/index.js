import React, { useState } from 'react'
import { EditableCard, Button, Loading, ErrorCard } from '../../components'
import { useTasks } from '../../hooks'

const Home = () => {
    const [newTask, setNewTask] = useState(false)
    const [error, setError] = useState(null)
    const { tasks, saveTask, deleteTask } = useTasks({
        onError: error => {
            setError(error)
    
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    })

    const handleOnNewTask = () => setNewTask(true)
    const handleOnCancelNewTask = () => setNewTask(false)

    const handleOnSaveTask = task => {
        setNewTask(false)

        saveTask(task)
    }

    return (
        <>
            {error && <ErrorCard message={error.message} />}
            {tasks ?
                 <main className="home">
                    <ol className="home__tasks-list">
                        {tasks.map(task => {
                            return (
                                <li className="home__task">
                                    <EditableCard data={task} onSaveTask={handleOnSaveTask} onDeleteTask={deleteTask} />
                                </li>
                            )
                        })}
                        {newTask && <EditableCard onCancelNewTask={handleOnCancelNewTask} onSaveTask={handleOnSaveTask} />}
                    </ol>
                    <div className="home__add-container">
                        <Button title="Add task" onClick={handleOnNewTask} />
                    </div>
                </main> :
                <Loading />
            }
        </>
    )
}

export default Home
