module.exports = {
  app: {
    defaultBatchSize: process.env.DEFAULT_BATCH_SIZE,
  },
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    dbName: process.env.MONGODB_DBNAME,
  },
};