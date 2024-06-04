import { ApolloServer } from "@apollo/server";
import resolvers from "../resolvers";
import typeDefs, {
  Ttypekeymutations,
  Ttypekeyqueries,
  Ttypekeytypes,
} from "../typedefs";
// import authDirectiveTransformer, {
//   authDirectiveTypeDefs,
// } from "../typedefs/schemaDirectives/directive";
import UserContext from "../interfaces/context/context.interface";
// import { makeExecutableSchema } from "@graphql-tools/schema";

const createApolloServer = async () => {
  let typeDefTypes = ``;
  let typeDefQuery = ``;
  let typeDefMutaions = ``;

  for (const x in typeDefs.types) {
    typeDefTypes += typeDefs.types[x as Ttypekeytypes] + "\n\n";
  }
  for (const x in typeDefs.queries) {
    typeDefQuery += typeDefs.queries[x as Ttypekeyqueries] + "\n\n";
  }
  for (const x in typeDefs.mutations) {
    typeDefMutaions += typeDefs.mutations[x as Ttypekeymutations] + "\n\n";
  }

  // const schema = makeExecutableSchema({
  //   typeDefs: `
  //       ${typeDefTypes}
  //       type Query{
  //         ${typeDefQuery}
  //       }
  //       type Mutation{
  //         ${typeDefMutaions}
  //       }
  //       ${authDirectiveTypeDefs}
  //       `,
  //   resolvers: {
  //     Query: {
  //       ...resolvers.queries,
  //     },
  //     Mutation: {
  //       ...resolvers.mutations,
  //     },
  //   },
  // });

  // const transformedSchema = authDirectiveTransformer(schema);

  // const server = new ApolloServer<UserContext>({
  //   schema: transformedSchema,

  //   introspection: true,
  //   formatError(formattedError) {
  //     return {
  //       message: formattedError.message,
  //       // code: formattedError.extensions.code,
  //       // status: formattedError.extensions.status,
  //     };
  //   },
  //   // plugins: [loggingPlugin],
  // });

  // Start Graphql Server

  const server = new ApolloServer<UserContext>({
    typeDefs: `
        ${typeDefTypes}
        type Query{
          ${typeDefQuery}
        }
        type Mutation{
          ${typeDefMutaions}
        }
        `,
    resolvers: {
      Query: {
        ...resolvers.queries,
      },
      Mutation: {
        ...resolvers.mutations,
      },
    },
  });

  await server.start();

  return server;
};

export default createApolloServer;
