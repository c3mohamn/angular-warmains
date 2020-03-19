import * as mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://admin:password@ds239968.mlab.com:39968/angular-warmains-test';

const options: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

function connect() {
  mongoose.connect(MONGODB_URI, options).then(
    () => console.log(`Connected to db ${MONGODB_URI}`),
    (error: any) => {
      console.log(error);
    }
  );
}

export default { connect };
