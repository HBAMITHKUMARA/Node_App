console.log('Starting seed...');

const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'gmail@test.com',
        password: 'gmailtest',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'yahoo@test.com',
        password: 'yahootest',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }
];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne =  new User(users[0]).save();
        let userTwo =  new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

const todos = [
    {
        _id: new ObjectID(),
        text: 'first test todo',
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: 'second test todo',
        completed: true,
        comletedAt: new Date().getTime(),
        _creator: userTwoId
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};