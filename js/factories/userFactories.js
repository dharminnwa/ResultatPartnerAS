/*
Factory for user hadling server calls 
*/

angular.module('ResultatPartnerAS')
.factory('userFactory', function ($http, $rootScope) {
    return {
        checkLogin: function (userName, password) {
            var config = {
            };
            var data = { UserName: "", Password: "" };
            data.UserName = userName;
            data.Password = password;
            return $http.post($rootScope.apiPath + "/User/LoginUser", data, config);
        },
        userLogout: function (id) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            return $http.get($rootScope.apiPath + "/user/UserLogOut?TokenId=" + id, config);
        },

        
    }
})