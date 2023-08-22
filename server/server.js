require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
}

// star is needed for the code to run on atlasDB.
// app.get('/*', (req, res) => { 
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  console.log('Connected to apollo!');
  server.applyMiddleware({ app });

  db.once('open', () => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
