import gql from "graphql-tag";

const typeDefs = gql`
  # Schema definitions 

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
  }
  
  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    name: String!
    photo: String
  }

type Module {
  id: ID!
  title: String!
  length: Int
}

type IncrementTrackViewsResponse {
code: Int!
success: Boolean!
message: String!
track: Track
}

  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
    track(id: ID!): Track
  }

type Mutation {
  incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
}

`;

export default typeDefs;