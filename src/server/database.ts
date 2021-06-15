import mongoose from 'mongoose';
import config from './configs';

const mongoUri = config.get("DATABASE_URI");

console.log("=============", mongoUri)

mongoose.Promise = Promise;

const mongooseOpts = {
  // options for mongoose 4.11.3 and above
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
};

const connectDb = async (opts = {}) =>{
  const dbOpts = {...mongooseOpts, ...opts}
  await mongoose.connect(mongoUri, dbOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
    }
    console.log(e);
});

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}


export default connectDb 
