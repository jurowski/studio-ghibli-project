import { gql } from '@apollo/client';

export const GET_HELLO_WORLD = gql`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`;

export const GET_FILMS = gql`
  query GetFilms {
    films {
      id
      title
      description
      director
      producer
      release_date
      running_time
      rt_score
      image
      movie_banner
    }
  }
`;
