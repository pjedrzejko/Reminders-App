import React, { useState, useEffect } from 'react';

function TodoApp() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // Load tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && task.trim() !== '') {
            const response = await fetch('http://localhost:3001/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: task })
            });
            const newTask = await response.json();
            setTasks([...tasks, newTask]);  // Changed from [newTask, ...tasks]
            setTask('');
        }
    };

    const removeTask = async (id) => {
        await fetch(`http://localhost:3001/api/tasks/${id}`, {
            method: 'DELETE'
        });
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-8 mx-auto">
                    <h1>All Reminders</h1>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-8 mx-auto d-flex justify-content-end">
                    <small className="text-muted me-2">Done</small>
                </div>
            </div>

            {/* TASK LIST */}
            <div className="row">
                <div className="col-8 mx-auto">
                    <ul className="list-group mb-3">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span>{task.text}</span>

                                {/* DONE RADIO */}
                                <input
                                    type="radio"
                                    onClick={() => removeTask(task.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* INPUT */}
            <div className="row">
                <div className="col-8 mx-auto">
                    <input
                        type="text"
                        className="form-control border-0 border-bottom rounded"
                        placeholder="Add a new task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

export default TodoApp;