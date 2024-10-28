const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let courses = [];

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//crud
    
app.post('/courses', (req, res) => {
    const { title, description, duration } = req.body;
    const newCourse = { id: uuidv4(), title, description, duration };

    courses.push(newCourse);
    res.status(201).json(newCourse);
    });
    app.get('/courses', (req, res) => {
        res.status(200).json(courses);
    });
    app.put('/courses/:id', (req, res) => {
        const { id } = req.params;
        const { title, description, duration } = req.body;
    
        const courseIndex = courses.findIndex(course => course.id === id);
        if (courseIndex === -1) return res.status(404).json({ message: 'Course not found' });
    
        courses[courseIndex] = { ...courses[courseIndex], title, description, duration };
        res.status(200).json(courses[courseIndex]);
    });
    app.delete('/courses/:id', (req, res) => {
        const { id } = req.params;
        const courseIndex = courses.findIndex(course => course.id === id);
    
        if (courseIndex === -1) return res.status(404).json({ message: 'Course not found' });
    
        courses.splice(courseIndex, 1);
        res.status(200).json({ message: 'Course deleted successfully' });
    });

