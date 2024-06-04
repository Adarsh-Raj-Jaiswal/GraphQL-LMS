import mutations from "./mutations";
import queries from "./queries";
import schemaTypes from "./schemaTypes";

const typeDefs = {
  queries,
  mutations,
  types: schemaTypes,
};
export type Ttypekeytypes = keyof typeof typeDefs.types;
export type Ttypekeymutations = keyof typeof typeDefs.mutations;
export type Ttypekeyqueries = keyof typeof typeDefs.queries;
export default typeDefs;
