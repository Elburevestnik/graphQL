const qraphql = require('graphql');

const movies = [
    { id: "1", name: "Name 1", genre: 'Genre1', directorId: "1"},
    { id: "2", name: "Name 2", genre: 'Genre2', directorId: 3},
    { id: 3, name: "Name 3", genre: 'Genre3', directorId: "2"},
    { id: 4, name: "Name 4", genre: 'Genre2', directorId: "2"},
    { id: 5, name: "Name 5", genre: 'Genre1', directorId: "2"},
    { id: 6, name: "Name 6", genre: 'Genre3', directorId: "2"},
];
const directors = [
    { id: "1", name: "Name 1", age: 44},
    { id: "2", name: "Name 2", age: 55},
    { id: 3, name: "Name 3", age: 33},
]

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,GraphQLList} = qraphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, arg) {
                return directors.find(director => director.id === parent.directorId);
            }
        }
    })
})
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter(movie => movie.directorId === parent.id);
            }
        }
    })
}) 

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id == args.id);
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})