import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to the database");
        return;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("MongoDB connection URI is missing");
        process.exit(1);
    }

    try {
        const db = await mongoose.connect(mongoUri);

        connection.isConnected = db.connections[0].readyState;

        console.log("DB connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;
