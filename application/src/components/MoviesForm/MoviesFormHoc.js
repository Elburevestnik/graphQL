import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {moviesQuery} from '../MoviesTable/queries';
import { graphql } from '@apollo/client/react/hoc';
import { styles } from './styles';
import { addMovieMutation, updateMovieMutation } from './mutations';
import { directorsQuery } from './queries';

const withGraphAdd = graphql(addMovieMutation, {
    props: ({mutate}) => ({
        addMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{query: moviesQuery}]
        })
    })
});

const withGraphUpdate = graphql(updateMovieMutation, {
    props: ({mutate}) => ({
        updateMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{query: moviesQuery}]
        })
    })
});

export default compose(withStyles(styles), withGraphAdd, graphql(directorsQuery), withGraphUpdate);