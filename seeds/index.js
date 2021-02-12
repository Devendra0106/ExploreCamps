const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
    console.log("Database connected!");
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 5;
        const c = new Campground({
            author: '6024e290e4c69701d8709d93',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/devtechs/image/upload/v1611948426/ExploreCamp/dpl4wpozdwrd5q212oxz.jpg',
                    filename: 'ExploreCamp/dpl4wpozdwrd5q212oxz'
                },
                {
                    url: 'https://res.cloudinary.com/devtechs/image/upload/v1611948426/ExploreCamp/lbqdnimbcgf2tpdalnxh.jpg',
                    filename: 'ExploreCamp/lbqdnimbcgf2tpdalnxh'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam sed tenetur doloremque commodi distinctio incidunt velit. Impedit temporibus quam nam quia ipsam velit at, consequuntur molestias similique doloribus inventore architecto.Alias laborum corporis placeat quod distinctio cupiditate officia atque optio, cum aspernatur vero iure natus totam consequatur praesentium iusto. Numquam nostrum optio eligendi error veniam ducimus officiis rerum iure deserunt!',
            price: price
        });
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})