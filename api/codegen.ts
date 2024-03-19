
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/schema.gql",
  generates: {
    "src/graphql/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
