import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema.js";
import resolvers from"./resolvers.js";
import TrackAPI  from"./datasources/track-api.js";
// import { addMocksToSchema } from "@graphql-tools/mock";
// import { makeExecutableSchema } from "@graphql-tools/schema";


// const mocks = {
//     Query: () => ({
//         tracksForHome: () => [...new Array(6)],
//       }),
//     Track: () => ({
//       id: () => "track_01",
//       title: () => "Astro Kitty, Space Explorer",
//       author: () => {
//         return {
//           name: "Grumpy Cat",
//           photo:
//             "https://res.cloudinary.com/apollographql/image/upload/v1730818804/odyssey/lift-off-api/catstrophysicist_bqfh9n_j0amow.jpg",
//         };
//       },
//       thumbnail: () =>
//         "https://res.cloudinary.com/apollographql/image/upload/v1730818804/odyssey/lift-off-api/nebula_cat_djkt9r_nzifdj.jpg",
//       length: () => 1210,
//       modulesCount: () => 6,
//     }),
//   };


async function startApolloServer() {
    const server = new ApolloServer({
        // schema: addMocksToSchema({
        //   schema: makeExecutableSchema({ typeDefs }),
        //   mocks,
        // }),

        typeDefs,
        resolvers,
      });
    const { url } = await startStandaloneServer(server,{
      context: async () => {
        // this object becomes resolver's contextValue, the third positional argument
        const { cache } = server;
        return {
          dataSources: {
            trackAPI: new TrackAPI({cache}),
          },
        };
      },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }

  startApolloServer();