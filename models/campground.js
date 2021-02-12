const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const campSchema = Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

campSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: { $in: doc.reviews }
        })
    }
})

module.exports = mongoose.model('Campground', campSchema);