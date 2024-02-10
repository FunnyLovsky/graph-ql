import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GITHUB_TOKEN } from "./token";

export const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
});

export const GET_REPOSITORIES = gql`
  query GetRepositories($queryString: String!, $afterCursor: String) {
    search(query: $queryString, type: REPOSITORY, first: 10, after: $afterCursor) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          url
          description
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
