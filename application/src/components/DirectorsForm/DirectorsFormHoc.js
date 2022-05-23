import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';
import {directorsQuery} from '../DirectorsTable/queries';
import { styles } from './styles';
import { addDirectorMutation, updateDirectorMutation } from './mutations';

const withGraphAdd = graphql(addDirectorMutation, {
    props: ({mutate}) => ({
        addDirector: director => mutate({
            variables: director,
            refetchQueries: [{query: directorsQuery}]
        })
    })
});
const withGraphUpdate = graphql(updateDirectorMutation, {
    props: ({mutate}) => ({
        updateDirector: director => mutate({
            variables: director,
            refetchQueries: [{query: directorsQuery}]
        })
    })
});

export default compose(withStyles(styles), withGraphAdd, withGraphUpdate);