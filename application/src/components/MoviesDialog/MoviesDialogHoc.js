import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {moviesQuery} from '../MoviesTable/queries';
import { graphql } from '@apollo/client/react/hoc';
import { removeMovieMutation } from './mutations';

const withGraphRemove = graphql(removeMovieMutation, {
    props: ({mutate}) => ({
        removeMovie: id => mutate({
            variables: id,
            refetchQueries: [{query: moviesQuery}]
        })
    })
});

export default compose(withGraphRemove);