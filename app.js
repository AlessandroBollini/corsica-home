const express = require('express');
const { getCurrentWeekNumber, getWeekDates, getWeeklyTasks } = require('./utils');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./models');

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/calendar', (req, res) => {
    const currentWeekNumber = getCurrentWeekNumber();
    const year = new Date().getFullYear();
    const weeks = [];
    
    for (let i = 0; i < 4; i++) {
        weeks.push({
            weekNumber: currentWeekNumber + i,
            dates: getWeekDates(year, currentWeekNumber + i)
        });
    }
    
    const weeklyTasks = getWeeklyTasks(currentWeekNumber);

    res.render('calendar', { weeks, weeklyTasks });
});

app.get('/todo', async (_req, res) => {
    try{
        const todos = await db.ToDoCard.findAll();
        res.render('todo', {todos});
    } catch(err) {
         console.log(err);
         res.status(500).send('Internal server error');
    }
})

app.post('/todo', async (req, res) => {
    const { content, person } = req.body;

    try{
        await db.ToDoCard.create({ content, person});
        res.redirect('/todo');
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
})

app.post('/delete-todo/:id', async (req, res) =>{
    try{
        const todoId = req.params.id;
        await db.ToDoCard.destroy({ where: {
            id: todoId
        }});
        res.redirect('/todo')
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}) 

app.get('/today', async (_req, res) => {
    try{
        const todayQuote = await db.Today.findAll();
        const today = todayQuote[0] ? todayQuote[0].dataValues.content : null;
        res.render('today', { today });
    } catch(err) {
         console.log(err);
         res.status(500).send('Internal server error');
    }
})

app.post('/today', async (req,res) => {
    const { content } = req.body;
    try{
        await db.Today.destroy({ 
            where: {}
        })
        await db.Today.create({ content });
        res.redirect('/today');
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
})

app.get('/homelimpiadi', (req,res)=>{
    res.send('Still todo');
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
