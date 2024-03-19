import { readFileSync } from "fs";

// According to the exercise we can assume all data will be formatted this way.
const typeDefs = readFileSync('./src/graphql/schema.gql', { encoding: 'utf-8' });

export default typeDefs