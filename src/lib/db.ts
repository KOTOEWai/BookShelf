
import mongoose from 'mongoose';

const mongoUri=process.env.MongoUrl as string;

if (!mongoUri) {
    throw new Error("❌ Database Connection Error: 'MongoUrl' environment variable is not defined in .env");
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, Promise: null };
}

async function connectToMongo() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.Promise) {
        cached.Promise = mongoose.connect(mongoUri, {
            dbName: "BookStore"
        }).then(m => m);
    }

    try {
        cached.conn = await cached.Promise;
    } catch (e) {
        cached.Promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToMongo;
