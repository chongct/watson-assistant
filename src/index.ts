import { GraphQLServer } from 'graphql-yoga';
require('dotenv').config();

import Query = require('./resolvers/Query');
import Mutation = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
  Intent: {
    intent: (root) => root.intent,
    description: (root) => root.description
  },
  Output: {
    text: (root) => root.text,
    conversationId: (root) => root.conversationId
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
