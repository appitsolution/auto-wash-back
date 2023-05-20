import { buildConfig } from "payload/config";
import path from "path";
// import Examples from './collections/Examples';
import Discount from "./collections/Discount";
import Users from "./collections/Users";
import Wash from "./collections/Wash";
import Media from "./collections/Media";
import Question from "./collections/Question";
import Support from "./collections/Support";
import Payments from "./collections/Payments";

export default buildConfig({
  serverURL: process.env.SERVER,
  admin: {
    user: Users.slug,
  },
  collections: [
    Discount,
    Users,
    Wash,
    Media,
    Question,
    Support,
    Payments,
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
