import React, { useState } from 'react';

function TodoApp() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && task.trim() !== '') {
            setTasks([...tasks, { text: task }]);
            setTask('');
        }
    };

    const removeTask = (indexToRemove) => {
        setTasks(tasks.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-8">
                    <h1>All Reminders</h1>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-8 d-flex justify-content-end">
                    <small className="text-muted me-2">Done</small>
                </div>
            </div>

            {/* TASK LIST */}
            <div className="row">
                <div className="col-8">
                    <ul className="list-group mb-3">
                        {tasks.map((task, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span>{task.text}</span>

                                {/* DONE RADIO */}
                                <input
                                    type="radio"
                                    onClick={() => removeTask(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* INPUT */}
            <div className="row">
                <div className="col-8">
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