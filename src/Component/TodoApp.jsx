import React, { createContext, useReducer, useState, useEffect } from 'react';
import Header from './Header';
import '../Style/TodoApp.css';
import Tabs from './Tabs';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Popup from './Popup';

export const MyContext = createContext();

export const TodoApp = () => {
    const tabs = ["Today", "Pending", "Overdue"];
    const [activeTab, setActiveTab] = useState(0); // Manage active tab state here
    const [showPopup, setShowPopup] = useState(false);
    const [todoValues, setTodoValues] = useState({
        title: '',
        priority: '',
        dueDate: '',
        description: ''
    });

    const reducer = (state, action) => {
        const { type, todo, key } = action;
        switch (type) {
            case "ADD":
                const newTodo = { ...todo, id: new Date().toISOString(), checked: false };
                return [...state, newTodo];
            case "EDIT":
                return state.map(item => item.id === key ? { ...item, ...todo } : item);
            case "DELETE":
                return state.filter(item => item.id !== key);
            case "CHECKBOX":
                return state.map(item => item.id === key ? { ...item, checked: !item.checked } : item);
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, [], () => {
        // Initialize state from localStorage
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    // Save todos to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state));
    }, [state]);

    const onEdit = (id) => {
        const selectedTodo = state.find(item => item.id === id);
        if (selectedTodo) {
            setTodoValues({
                id: selectedTodo.id,
                title: selectedTodo.title,
                priority: selectedTodo.priority,
                dueDate: selectedTodo.dueDate,
                description: selectedTodo.description,
            });
            setShowPopup(true); // Show the popup for editing
        }
    };

    return (
        <MyContext.Provider value={{ onEdit, todoValues, setTodoValues, showPopup, setShowPopup, dispatch, state }}>
            <div className="container">
                <Header title="Todo App" cName="heading" />
                <div className="content">
                    <Tabs tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
                    <TodoInput setShowPopup={setShowPopup} />
                    <TodoItem state={state} activeTab={activeTab} />
                    {showPopup && <Popup dispatch={dispatch} setShowPopup={setShowPopup} />}
                </div>
            </div>
        </MyContext.Provider>
    );
};

export default TodoApp;
