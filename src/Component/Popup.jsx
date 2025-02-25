import React, { useContext } from 'react';
import '../Style/Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from './TodoApp';

function Popup({ dispatch }) {
    const { setShowPopup, todoValues, setTodoValues } = useContext(MyContext);

    const handleSave = () => {
        if (!todoValues.title || !todoValues.priority || !todoValues.dueDate) {
            alert('Please fill in all required fields.');
            return;
        }

        if (todoValues.id) {
            // Edit Task
            dispatch({ type: 'EDIT', key: todoValues.id, todo: todoValues });
        } else {
            // Add New Task
            dispatch({ type: 'ADD', todo: todoValues });
        }

        // Reset the form and close popup
        setTodoValues({ title: '', priority: '', dueDate: '', description: '' });
        setShowPopup(false);
    };

    return (
        <div className="overlay">
            <div className="popup">
                <p className="x-mark" onClick={() => setShowPopup(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </p>
                <h1 className="task-details">{todoValues.id ? 'Edit Task' : 'Add Task'}</h1>
                <div className="inputs">
                    <label htmlFor="title" style={{ display: 'block' }}>Title</label>
                    <input
                        type="text"
                        placeholder="Add a task title"
                        id="title-task"
                        name="title"
                        style={{ display: 'block' }}
                        value={todoValues.title}
                        onChange={(e) => setTodoValues({ ...todoValues, title: e.target.value })}
                    />

                    <label htmlFor="priority">Priority</label>
                    <label htmlFor="deadline" id="deadline-task">Deadline</label>
                    <select
                        id="priority-task"
                        name="priority"
                        value={todoValues.priority}
                        onChange={(e) => setTodoValues({ ...todoValues, priority: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <input
                        type="date"
                        id="deadline-input"
                        name="deadline"
                        value={todoValues.dueDate}
                        onChange={(e) => setTodoValues({ ...todoValues, dueDate: e.target.value })}
                    />

                    <label htmlFor="comments" style={{ display: 'block' }}>Comments</label>
                    <input
                        placeholder="Add any comments to your task"
                        id="comments-task"
                        name="comments"
                        style={{ display: 'block' }}
                        value={todoValues.description}
                        onChange={(e) => setTodoValues({ ...todoValues, description: e.target.value })}
                    />

                    <button id="close" onClick={() => setShowPopup(false)}>Close</button>
                    <button id="add-task-popup" onClick={handleSave}>
                        {todoValues.id ? 'Edit Task' : 'Add Task'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
