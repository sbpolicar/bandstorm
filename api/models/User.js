/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
        type:'string'
    },
    email: {
        type:'email',
        required: true,
        unique: true
    },
    password: {
        type:'string',
        required: true,
        min: 6,
        max: 24
    },
    songs: {
        collection: 'song',
        via: 'user',
        dominant: true
    },
    projects: {
        collection: 'project',
        via: 'users',
        dominant: true
    },
    toJSON: function(){
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
  },

  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                console.log(err);
                cb(err);
            } else {
                user.password = hash;
                console.log(hash);
                cb(null, user);
            }
        });
    });
  }
};

