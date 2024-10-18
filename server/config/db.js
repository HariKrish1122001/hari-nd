const mongoose = require('mongoose');
const url = 'mongodb+srv://harikrishnannexusdigitalia:APs74g5Rna0O1eVU@myfirstapp.q9rwk.mongodb.net/?retryWrites=true&w=majority&appName=myfirstapp';
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: false,
            useUnifiedTopology:false,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
module.exports = connectDB;