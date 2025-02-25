import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { MyContext } from './TodoApp';

function TodoList({ list }) {
  const { id, title, priority, dueDate, description } = list;

  const { dispatch, onEdit } = useContext(MyContext)
  const onDelete = (id) => {
    dispatch({ type: "DELETE", key: id })
  }
  const changeCheckbox = (id) => {
    dispatch({ type: "CHECKBOX", key: id })
  }
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={list.checked || false}
        onChange={() => changeCheckbox(id)}
      />

        <p className={list.checked ? "completed" : ""}>{title}</p>
        <p className={list.checked ? "completed" : ""}>{priority}</p>
        <p className={list.checked ? "completed" : ""}>{dueDate}</p>
        <p className={list.checked ? "completed" : ""}>{description}</p>

      <div className="buttons">
        <button
          className="edit"
          onClick={() => onEdit(id)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="delete"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
}

export default TodoList;
