const express = require('express');
const mongoose = require('mongoose');


const app = express();

const cardSchema = new mongoose.Schema({
   title: String,
   tags: String,
   imageLink: String,
   numberOfClicks: Number,
   dateAdded: Date,
});

const Card = mongoose.model('Card',cardSchema);


/* An IIFE to insert a new dummy document */
// (function insertCard() {
//     const card = new Card({
//         title: 'This is the sixth card',
//         tags: 'xc1,xc2',
//         imageLink: 'https://nodejs.org/static/images/logo-hexagon-card.png',
//         numberOfClicks: 1,
//         dateAdded: Date.now()
//     });

//     card.save();
// })();


app.get('/api/getCards', async (req,res) => {
    try{
        const {sortby} = req.query;
        console.log('Query param:' + sortby);
        if(sortby === 'latest'){
            const cards = await Card.find({}).sort({_id: -1}).lean();
            // console.log(cards);
            res.status(200).json(cards);
        }
        else if(sortby === 'popular'){
            const cards = await Card.find({}).sort({numberOfClicks: -1}).lean();
            // console.log(cards);
            res.status(200).json(cards);
        }
        else{
            const cards = await Card.find({}, -'_id').lean();
            // console.log(cards);
            res.status(200).json(cards);
        }
    }
    catch(error){
        console.log(error);
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/brewapp', () => console.log('connected to mongoDB local server'));

app.listen(3001, () => console.log('Server listening on port 3001'));