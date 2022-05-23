import { gql } from '@apollo/client';

export const removeDirectorMutation = gql`
     mutation removeDirector($id: ID) {
        removeDirector(id: $id){
            id
        }
    }
`