const qraphql = require('graphql');

/*
// All IDs set automatically by mLab
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 62826854835dfe87a876e24c
  { "name": "Michael Radford", "age": 72 }, // 628268cb835dfe87a876e24d
  { "name": "James McTeigue", "age": 51 }, // 62826914835dfe87a876e24e
  { "name": "Guy Ritchie", "age": 50 }, // 62826937835dfe87a876e24f
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "62826854835dfe87a876e24c" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "628268cb835dfe87a876e24d" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "62826914835dfe87a876e24e" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "62826937835dfe87a876e24f" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "62826854835dfe87a876e24c" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "62826854835dfe87a876e24c" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "62826854835dfe87a876e24c" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "62826937835dfe87a876e24f" },
];*/

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = qraphql;
const Movies = require('../server/models/movies');
const Directors = require('../server/models/directors');


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        director: {
            type: DirectorType,
            resolve(parent, arg) {
                return Directors.findById(parent.directorId);
            }
        }
    })
})
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({ directorId: parent.id });
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {name: {type: GraphQLString},  age: {type: GraphQLInt}},
            resolve(parent, args) {
                const director = new Directors({
                    name: args.name,
                    age: args.age,
                });
                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {name: {type: GraphQLString},  genre: {type: GraphQLString}, directorId: {type: GraphQLID}},
            resolve(parent, args) {
                const movie = new Movies({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                });
                return movie.save();
            }
        },
        removeDirector: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
               return Directors.findByIdAndRemove(args.id);
            }
        },
        removeMovie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movies.findByIdAndRemove(args.id);
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {id: {type: GraphQLID}, name: {type: GraphQLString},  age: {type: GraphQLInt}},
            resolve(parent, args) {
                return Movies.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, age: args.age}},
                    {new: true}
                );
            }
        },
        updateMovie: {
            type: MovieType,
            args: {id: {type: GraphQLID}, name: {type: GraphQLString},  genre: {type: GraphQLString}, directorId: {type: GraphQLID}},
            resolve(parent, args) {
                return Movies.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, age: args.age, directorId: args.directorId}},
                    {new: true}
                );
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Movies.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Directors.findById(args.id);
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Directors.find({});
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})