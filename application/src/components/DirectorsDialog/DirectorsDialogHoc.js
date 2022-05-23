import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';
import { removeDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphRemove = graphql(removeDirectorMutation, {
    props: ({mutate}) => ({
        removeDirector: id => mutate({
            variables: id,
            refetchQueries: [{query: directorsQuery}]
        })
    })
});

export default compose(withGraphRemove);