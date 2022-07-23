const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const options = { toJSON: { virtuals: true }};

const HotelSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
}, options);

HotelSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href=/hotels/${this._id}>${this.title}</a></strong>`;
});

HotelSchema.post('findOneAndDelete', async (hotel) => {
    if (hotel) {
        await Review.deleteMany({
            _id: {
                $in: hotel.reviews
            }
        });
    }
});

module.exports = mongoose.model('Hotel', HotelSchema);