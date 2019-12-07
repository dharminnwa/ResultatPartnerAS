/**
 * loginCtrl - controller
 * Contains Functionlity of check login with valid credential
 */
angular.module("ResultatPartnerAS").controller('loginCtrl', function ($scope, $http, $rootScope, $state, $stateParams, $modal, userFactory, notify, $cookieStore) {
    $scope.loading = false;
    if ($state.current == "user.login") {
        $rootScope.userModel = { isLoggedin: false, userRole: "", userToken: "", userRole: "", isAdmin: false };
    }
    $scope.username = "";
    $scope.password = "";
    $scope.notifyTemplate = 'views/common/notify.html';
    $scope.notifySuccess = function (msg) {
        notify.closeAll();
        notify({ message: 'Success - ' + msg, classes: 'alert-info', templateUrl: $scope.notifyTemplate });
    };
    $scope.notifyError = function (msg) {
        notify.closeAll();
        notify({ message: 'Error - ' + msg, classes: 'alert-danger', templateUrl: $scope.notifyTemplate });
    };
    $scope.notifyWarning = function (msg) {
        notify.closeAll();
        notify({ message: 'Error - ' + msg, classes: 'alert-warning', templateUrl: $scope.notifyTemplate });
    };
    $scope.CheckLogin = function () {
        $scope.form.submitted = true;
        if ($scope.form.username.$valid && $scope.form.password.$valid) {
            $scope.loading = true;
            $scope.loginData = { UserName: "", Password: "" };
            var promise = userFactory.checkLogin($scope.username, $scope.password);
            promise.then(function (payload) {
                if (payload.data != null || payload.data != undefined || payload.data != "") {
                    if (payload.data.token != "" && payload.data.token != null) {
                        $rootScope.userModel.userName = payload.data.userName;
                        $rootScope.userModel.isLoggedin = true;
                        $rootScope.userModel.userToken = payload.data.token;
                        $rootScope.userModel.userRole = payload.data.userRole;
                        if ($rootScope.userModel.userRole == "Admin") {
                            $rootScope.userModel.isAdmin = true;
                        }
                        else if ($rootScope.userModel.userRole == "User") {
                            $rootScope.userModel.isAdmin = false;
                        }
                        $scope.notifySuccess("Logged in Successfully...");
                        $cookieStore.put('UserLoggedin', true);
                        $cookieStore.put('userDetails', $rootScope.userModel);
                        if ($rootScope.previousState != "" && $rootScope.previousState != undefined) {
                            if (!($rootScope.previousState.indexOf('login') > -1)) {
                                $state.go($rootScope.previousState);
                            }
                            else {
                                $state.go("courses.allcourses");
                            }
                        }
                        else {
                            $state.go("courses.allcourses");
                        }

                    }
                    else {
                        $rootScope.userModel = { isLoggedin: false, userRole: "", userToken: "", userRole: "", isAdmin: false };
                        $cookieStore.remove('UserLoggedin');
                        $cookieStore.remove('userDetails');
                        $scope.notifyError("Login Failed," + payload.data.Status);
                    }
                }
                else {
                    $scope.notifyError("Login Failed,Please enter valid credential");
                }
                $scope.loading = false;
            }, function (errorPayload) {
                $scope.loading = false;
                console.log('failure login  Check', errorPayload);
            });
        }
    };
});