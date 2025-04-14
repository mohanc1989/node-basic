const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
const courses = [
    {"name": "course1","id":1},
    {"name": "course2","id":2,},
    {"name": "course3","id":3,}
]
app.get('/', (req, res) => {
    res.send('Hello Node Monitor');
    res.end();
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify(courses));
})

app.get('/api/courses/:id', (req,res) => {
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course with give ID is not found');
    }
    res.send(course);
});

app.post('/api/courses', (req,res) => {

    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with give ID is not found');
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with give ID is not found');
    const index = courses.indexOf(course);
    courses.splice(index,1);
     res.send(course);
})

function validateCourse(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`listening port ${port}`));