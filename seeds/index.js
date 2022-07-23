const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Hotel = require('../models/hotel');

mongoose.connect('mongodb+srv://pochuvalov:Rooldontstop346@cluster0.ox0cy.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) =>
    array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Hotel.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const randomNumber = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomNumber];

        const hotel = new Hotel({
            author: '628a91009d396be75585a9a7',
            location: `${randomCity.name}, ${randomCity.subject}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, nesciunt odio sunt eaque ipsa porro.',
            price: Math.floor(Math.random() * 10 + 1) * 1000,
            geometry: {
                type: "Point",
                coordinates: [
                    randomCity.coords.lon,
                    randomCity.coords.lat,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dosefjxlk/image/upload/v1654894775/Hottels/n3gbdhoybmmlhq6wlfnd.jpg',
                    filename: 'Hottels/l8toqrj69jguvi5qf07y',
                },
                {
                    url: 'https://res.cloudinary.com/dosefjxlk/image/upload/v1654895120/Hottels/ussw7hmqarz8vo04zo3s.jpg',
                    filename: 'Hottels/ca8na8pze2aaddvctujl',
                }
            ],
        });
        await hotel.save();
    }
};

seedDB();