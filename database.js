const mongoose = require('mongoose');
(async () => {
    try {
        const db = await mongoose.connect("mongodb+srv://jesusc:jMJAZMs7fFTvDl8T@cluster0.mwr31.mongodb.net/tendencys?retryWrites=true&w=majority");
        console.log("Connected to MongoDB", db.connection.name);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
})()