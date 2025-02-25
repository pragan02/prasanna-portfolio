import React from 'react';
import TodoList from './TodoList';
import '../Style/TodoItem.css';

function TodoItem({ state, activeTab }) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const filteredTodos = state.filter((todo) => {
        const dueDate = todo.dueDate || '';
        switch (activeTab) {
            case 0: // "Today"
                return dueDate === today;
            case 1: // "Pending"
                return !todo.checked && dueDate > today;
            case 2: // "Overdue"
                return !todo.checked && dueDate < today;
            default:
                return true; // Show all todos by default
        }
    });

    return (
        <div className="tasks">
            {filteredTodos.map((todo) => (
                <TodoList key={todo.id} list={todo} />
            ))}
        </div>
    );
}

export default TodoItem;
