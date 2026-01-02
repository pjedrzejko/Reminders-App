const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('reminders.db');

app.use(cors());
app.use(express.json());

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Get all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks ORDER BY created_at ASC').all();
    res.json(tasks);
});

// Add a task
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    const result = db.prepare('INSERT INTO tasks (text) VALUES (?)').run(text);
    res.json({ id: result.lastInsertRowid, text });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});