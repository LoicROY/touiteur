const mongoose = require('mongoose');
const { db: {
  protocol,
  user,
  password,
  host,
  name,
  options,
}} = require(`../environnement/${process.env.NODE_ENV}`);

mongoose
  .connect(
    `${protocol}://${user}:${password}@${host}/${name}?${options}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  .then(() => console.log('Connected to db.'))
  .catch(console.error);
