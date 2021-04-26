import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { constants } from 'commons'
import { PriorityLabel, Button, DropDown } from '../'
import literals from './literals'
import { useFormik } from 'formik'

const EditableCard = ({ data, onCancelNewTask, onSaveTask, onDeleteTask }) => {
  const [edit, setEdit] = useState(!data)

  const { handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      title: data?.title || '',
      description: data?.description || '',
      priority: data?.priority || constants.priorities.MEDIUM
    },
    onSubmit: values => {
      data && setEdit(false)

      return onSaveTask({ id: data?.id, ...values })
    }
  })

  const { priorities } = constants
  const prioritiesArray = Object.values(priorities)

  const handleOnEdit = () => setEdit(true)
  const handleOnCancel = () => {
    handleReset()

    data ? setEdit(false) : onCancelNewTask()
  }

  const handleOnDeleteTask = () => {
    setEdit(false)

    return onDeleteTask(data.id)
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
        <div className="card__header">
            {edit ?
              <>
                <input
                  className="card__title-input"
                  name="title"
                  type="text"
                  required
                  defaultValue={data?.title || ''}
                  placeholder={literals.titlePlaceholder}
                  onChange={handleChange}
                  autoComplete="off"
                /> 
                <DropDown
                  options={prioritiesArray}
                  name="priority"
                  selected={data ? data.priority : priorities.MEDIUM}
                  onChange={handleChange}
                />
              </> :
              <>
                <div className="card__title-container">
                  <h2 className="card__title">{data.title}</h2>
                </div>
                <PriorityLabel priority={data.priority} />
              </>
            }
        </div>
        <div className="card__body">
            {edit ?
              <textarea
                className="card__description-input"
                autoComplete="off"
                name="description"
                onChange={handleChange}
                defaultValue={data?.description || ''}
                placeholder={literals.descriptionPlaceholder}
                rows={5}
                style={{ width: "100%", fontFamily: "Arial", marginBottom: 20 }}
              />
              :
              <p className="card__description">{data.description}</p>
            }
        </div>
        <div className="card__footer">
              {edit ? 
                <>
                  {data && <Button className="delete" title={literals.delete} type="DANGER" onClick={handleOnDeleteTask} />}
                  <Button title={literals.cancel} type="CANCEL" onClick={handleOnCancel} />
                  <Button title={literals.save} type="ACCEPT" submit />
                </> :
                <Button title={literals.edit} onClick={handleOnEdit} />
              }
          </div>
    </form>
  )
}

EditableCard.propTyes = {
  data: PropTypes.objectOf(PropTypes.string),
  onCancelNewTask: PropTypes.func,
  onSaveTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
}

export default EditableCard