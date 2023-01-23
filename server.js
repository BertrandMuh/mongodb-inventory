

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const item = require('./models/item');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const database = 'Inventory'
const connectionStr = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@mongosetup.ag3i9yt.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})


app.get('/get_all_items', async (req, res) => {
    const data = await item.find({})
    res.send(data)
})

app.post('/create_item', async (req, res) => {
    let response = await item.create(req.body)
    res.send(response)
})
app.get('/get_item/:name', async (req, res) => {
    let request = req.params.name;
    const response = await item.find({ name: request })
    res.send(response)
})

app.listen(5000, () => {
    console.log('Running on port 5000');
})