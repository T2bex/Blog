import express from 'express';
import {db, connectToDB} from './db.js'
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json())

// app.post('/hello', (req, res) => {
//     console.log(req.body)
//     res.send(`Hello ${req.body.name}`);
// })
// app.get('/hello/:name', (req, res) => {
//     const{name} = req.params
//     res.send(`Hello ${name}!!`)
// })
app.get('/api/articles/:name', async (req,res) => {
    const {name} = req.params

    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect()

    const article = await db.collection('articles').findOne({ name })

    if (article){
        res.json(article)
    }else {
        res.sendStatus(404)
    }

    
})

app.put('/api/articles/:name/upvote', async (req,res) => {
    const {name} = req.params
    
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect()

    const db = client.db('react-blog-db')
    await db.collection('articles').updateOne({name}, {
        $inc: {upvotes: 1},
    })

    const article = await db.collection('articles').findOne({ name })
    
    if (article){
        res.send(`The ${name} article now has ${article.upvotes} upvotes`)
    } else{
        res.send('That article doesn\'t exist')
    }
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params
    const {postedBy, text} = req.body
    
    

    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy, text}}
    })
    const article = await db.collection('articles').findOne({name})

    if (article) {
        res.send(article.comments)
    } else{
        res.send('That article doesn\'t exist')
    }

})

connectToDB(() => {
    console.log('Connected to database successfully')
    app.listen(8000, () => {
        console.log('server is working on port 8000');
    })
})