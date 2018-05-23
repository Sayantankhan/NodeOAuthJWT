var _ = require('lodash');

var Users = [
    {
        'name': 'Nick Cerminara', 
        'password': 'password',
        'admin': true,
        'tokenId':'',
        'refreshTokenId':''
    },
    {
        'name': 'Sayantan Khan', 
        'password': 'password',
        'admin': true,
        'tokenId':'',
        'refreshTokenId':''
    }
];

exports.findUser = function(username,password){
   return _.find(Users,{'name':username,'password':password});
}

exports.fetchAllUser = Users;
