import React, { useContext } from 'react';
import '../Style/TodoInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyContext } from './TodoApp';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function TodoInput() {
    const { setShowPopup,state } = useContext(MyContext);

    const addTask = () => {
        setShowPopup(true); 
        // setTodoValues({ title: '', priority: '', dueDate: '', description: '' }); // Reset the form
    };

    return (
        <div className="todo-input">
            <h1>Tasks</h1>
            <button className="add-task" onClick={addTask}><FontAwesomeIcon icon={faPlus}/>  {state? "Add Task":"Edit Task"} </button>
        </div>
    );
}

export default TodoInput;
