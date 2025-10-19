import { defineData } from "@aws-amplify/backend";

export const data = defineData({
  schema: `
    type Item @model {
      id: ID!
      name: String!
      description: String
      createdAt: AWSDateTime
      updatedAt: AWSDateTime
    }
  `,
});
