const mongoConfig = (dbName: string) => {
  const username = encodeURIComponent(process.env.MONGO_DB_USERNAME);
  const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
  const DB_NAME = dbName;
  const DB_HOST = process.env.MONGO_DB_HOST;
  const AUTH = `${username}:${password}`;
  const DB = `${DB_HOST}/${DB_NAME}`;
  const MONGO_URI = `mongodb+srv://${AUTH}@${DB}?retryWrites=true&w=majority`;

  return {
    MONGO_URI,
  };
};

const mongoConfig2 = () => {
  const username = encodeURIComponent(process.env.MONGO_DB_USERNAME);
  const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
  const DB_NAME = process.env.MONGO_DB_NAME;
  const DB_HOST = process.env.MONGO_DB_HOST;
  const AUTH = `${username}:${password}`;
  const DB = `${DB_HOST}/${DB_NAME}`;
  const MONGO_URI = `mongodb+srv://${AUTH}@${DB}?retryWrites=true&w=majority`;

  return {
    MONGO_URI,
  };
};

export { mongoConfig, mongoConfig2 };
