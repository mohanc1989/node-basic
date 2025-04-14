const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Node Monitor');
    res.end();
});

app.get('/api', (req, res) => {
    const data = {
        "name": "express"
    }
    res.send(JSON.stringify(data));
})

app.get('/api/courses/:id', (req,res) => {
    res.send({id: req.params.id, query: req.query});
});

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`listening port ${port}`));