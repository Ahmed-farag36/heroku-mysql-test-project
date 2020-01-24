const { ApolloServer, gql } = require("apollo-server");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "Test",
  "test",
  "Af#123456789",
  {
    host: "SG-Test-1831-master.servers.mongodirector.com:3306",
    dialect: "mysql"
  }
  // "var conn = mysql.createConnection({host: "SG - Test - 1831 - master.servers.mongodirector.com", user: '<user>', password: '<password>', database: <your-database-name>, port: 3306});"
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
