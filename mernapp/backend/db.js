const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://feedify1234:feedify1234@cluster0.mtw0jxp.mongodb.net/Feedify?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");

        // Fetch fooditems data
        const foodItemsCollection = mongoose.connection.db.collection("fooditems");
        const data = await foodItemsCollection.find({}).toArray();

        // Fetch foodCategory data
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategoryCollection.find({}).toArray();

        // Set to global
        global.fooditems = data;
        global.foodCategory = catData;

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = mongoDB;
