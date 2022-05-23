import { gql } from '@apollo/client';

export const directorsQuery = gql`
    query directorsQuery {
        directors{
            id,
            name,
        }
    }
`