var loki = require('lokijs');

module.exports = function(options) {
    const db = new loki(options.location);
    var users;
    if (options.existing) {
        db.loadDatabase({}, function() {
            options.callback(api);
        })
    } else {
        users = db.addCollection('users');
        process.nextTick(() => {
            options.callback(api);
        });
    }

    const api = {
        insertUser: insertUser,
        updateCollectionWithNewUsers: updateCollectionWithNewUsers,
        findUserBySlackId: findUserBySlackId,
        getAllUsers: getAllUsers,
        getUsers: getUsers,
        getUserById: getUserById
    }

    function insertUser(user) {
        users.insert(user);
        db.saveDatabase();
    }

    function updateCollectionWithNewUsers(user) {
        db.loadDatabase({}, function () {
            var col = db.getCollection('users');
            col.insert(user);
            db.saveDatabase();
        });
    }

    function findUserBySlackId (id, callback) {
        db.loadDatabase({}, function () {
            var col = db.getCollection('users');
            callback(col.findOne({ 'slackId': id }));
        });
    }

    function getAllUsers(callback) {
        callback(users.data());
    }

    function getUsers() {
        return db.getCollection('users').data;
    }

    function getUserById(id) {
        return db.getCollection('users').find( {'slackId': id} );
    } 
        
};
