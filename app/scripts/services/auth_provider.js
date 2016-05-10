// Used to redirect to a page when a user is not signed in

angular.module('smartLearnIoApp')
    .factory('authProvider', function() {
        var user;
        return {
            setUser : function(aUser){
            user = aUser;
            },
            isLoggedIn : function(){
            return(user)? user : false;
            }
        };
    });