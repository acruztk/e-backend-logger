const mongoose = require ('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
    
  })
