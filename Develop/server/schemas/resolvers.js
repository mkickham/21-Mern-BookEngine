const { User } = require('../models');
const { signToken, AutheticationError, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, { userId }, context) => {
            return User.findOne({_id: userId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({
                username,
                email,
                password
            });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){
                throw AutheticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword){
                throw AutheticationError;
            }

            const token = signToken(user);
            return{ token, user };
        },
        saveBook: async (parent, {input}, context) => {
            if (context.user){
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $push: { savedBooks: input }},
                    { new: true, runValidators: true }
                )
            };
            throw AuthenticationError('You must be logged in');
        },
        deleteBook: async (parent, {bookId}, context) => {
            if (context.user){
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { bookId: bookId }},
                    }
                );
            }
            throw AuthenticationError('You must be logged in');
        }
    }
};

module.exports = resolvers;