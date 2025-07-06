import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/employee';
import { context } from './context';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
