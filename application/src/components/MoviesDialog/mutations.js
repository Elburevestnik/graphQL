import { gql } from '@apollo/client';

export const removeMovieMutation = gql`
     mutation removeMovie($id: ID) {
        removeMovie(id: $id){
            id
        }
    }
`