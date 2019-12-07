/**
 * Main controller.js file
 * Define controllers with data used in app
 * Functions (controllers)
 *  - MainCtrl
 *  - commonCtrl
 *  - loginCtrl
 */
var filepath = "http://localhost/streetxWebApi/api"

/**
 * MainCtrl - controller
 * Contains severals global data used in diferent view
 *
 */
function MainCtrl($cookieStore, $scope, $rootScope, $state, $modal) {
    var isUserLoggedIn = $cookieStore.get("UserLoggedin");
    if (!isUserLoggedIn) {
        $state.go("user.login");
    }
    else {
        var userModel = $cookieStore.get("userDetails");
        if ($state.current.name == "" || $state.current.name == "user.login") {
            if (userModel) {
                if (userModel.userRole == "admin") {
                    $rootScope.userModel = userModel;
                    $state.go("courses.allcourses");
                }
            }
        }
        else {
            if (!userModel) {
                $state.go("user.login");
            }
        }
    }

    this.logout = function (id) {
        $cookieStore.remove('UserLoggedin');
        $cookieStore.remove('userDetails');
        $rootScope.userModel = { isLoggedin: false, userId: 0, userTitle: "", userRole: "", customerId: null, userImage: "" };
        $rootScope.isLoggedOut = true;
        $state.go("user.login");
    }
}


/**
 * commonCtrl - controller
 * Contains Functionlity of check if user is logged in and redirect to its dashboard as per user role
 */
function commonCtrl($cookieStore, $scope, $rootScope, $state, $modal, notify) {
    var isUserLoggedIn = $cookieStore.get("UserLoggedin");
    if (!isUserLoggedIn) {
        $state.go("user.login");
    }
    else {
        var userModel = $cookieStore.get("userDetails");
        if (userModel) {
            $rootScope.userModel = userModel;
            $state.go("courses.allcourses");
        }
        else {
            if (!userModel) {
                $state.go("user.login");
            }
        }
    }

    $scope.notifyTemplate = 'views/common/notify.html';
    $scope.notifySuccess = function (msg) {
        notify.closeAll();
        notify({ message: 'Success - ' + msg, classes: 'alert-info', templateUrl: $scope.notifyTemplate });
    }
    $scope.notifyError = function (msg) {
        notify.closeAll();
        notify({ message: 'Error - ' + msg, classes: 'alert-danger', templateUrl: $scope.notifyTemplate });
    }

}


/**
 *
 * Pass all functions into module
 */
angular
.module('ResultatPartnerAS')
.controller('MainCtrl', MainCtrl)
.controller('commonCtrl', commonCtrl);
