import mongoose from 'mongoose';

const monogoUrl = process.env.MongoUrl as string;

if(!monogoUrl){
    throw new Error( " monogoUrl is not defined");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = ( global as any ).mongoose;

if(!cached){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cached = ( global as any ).mongoose = { conn: null , Promise: null}
}

async function connectToMongo(){
    if(cached.conn){    
        return cached.conn;

    }
    if( !cached.Promise ){
        cached.Promise = mongoose.connect(monogoUrl,{
            dbName : "BookStore"
        }).then(m => m);

    }
    cached.conn = await cached.Promise;
    return cached.conn;

}
export default connectToMongo;