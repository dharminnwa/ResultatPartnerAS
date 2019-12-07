/**
 * courseCtrl - controller
 * Contains Functionlity of course management module
 */

angular.module("ResultatPartnerAS").controller('courseCtrl', function ($scope, $rootScope, $stateParams, $state, $cookieStore, notify, courseFactory) {
    var isUserLoggedIn = $cookieStore.get("UserLoggedin");
    $scope.courseDetail = null;
    if (!isUserLoggedIn) {
        $state.go("user.login");
    }
    else {
        var userModel = $cookieStore.get("userDetails");
        if ($state.current.name == "" || $state.current.name == "user.login") {
            if (userModel) {
                if (userModel.userRole == "admin") {
                    $scope.isAdmin = userModel.isAdmin;
                }
                $rootScope.userModel = userModel;
                $state.go("courses.allcourses");

            }
        }
        else {
            if (!userModel) {
                $state.go("user.login");
            }
        }
    }
    $scope.courseList = [];
    $scope.getAllCourse = function () {
        var promise = courseFactory.getAllCourses();
        promise.then(function (payload) {
            if (payload.data != null || payload.data != undefined || payload.data != "") {
                var isvalidToken = $rootScope.checkIsValidToken(payload.data);
                if (isvalidToken) {
                    $scope.courseList = payload.data;
                }
            }
            else {
                $scope.notifyError("No Courses Available");
            }
            $scope.loading = false;
        }, function (errorPayload) {
            $scope.loading = false;
            var isvalidToken = $rootScope.checkIsValidToken(errorPayload.data);
            console.log('No Courses Available', errorPayload);
        });
    }
    $scope.getCourseInfo = function (id) {
        if (id) {
            $state.go("courses.info", { CourseID: id });
        }
        else {
            $scope.notifyError("Invalid request");
        }
    }
    $scope.isParticipatedInCourse = function () {
        var promise = courseFactory.getCourseDetail($scope.CourseID);
        promise.then(function (payload) {
            var isvalidToken = $rootScope.checkIsValidToken(payload.data);
            if (isvalidToken) {
                $scope.courseDetail = payload.data.course;
                $scope.isUserParticipatedInCourse = payload.data.participated;
                if ($scope.isUserParticipatedInCourse) {
                    $scope.isUserParticipatedInCourse = true;
                    $scope.ButtonText = "Cancel your registration";
                    $scope.RegisterMessage = "You have registered!";
                }
                else {
                    $scope.isUserParticipatedInCourse = false;
                    $scope.ButtonText = "Register";
                    $scope.RegisterMessage = "";
                }
            }
        }, function (errorPayload) {
            $scope.loading = false;
            var isvalidToken = $rootScope.checkIsValidToken(errorPayload.data);
            console.log('No Course Found', errorPayload);
        });
    }

    $scope.ParticipateInCourse = function (id) {
        var promise = courseFactory.participateInCourse(id);
        promise.then(function (payload) {
            var isvalidToken = $rootScope.checkIsValidToken(payload.data);

            if (isvalidToken) {
                if (payload.data != null || payload.data != undefined || payload.data != "") {
                    if (payload.data) {
                        $scope.isUserParticipatedInCourse = true;
                        $scope.ButtonText = "Cancel your registration";
                        $scope.RegisterMessage = "You have registered!";
                    }
                    else {
                        $scope.isUserParticipatedInCourse = false;
                        $scope.ButtonText = "Register";
                        $scope.RegisterMessage = "";
                    }
                }
                else {
                    $scope.notifyError("Course creation failed");
                }
            }
            $scope.loading = false;
        }, function (errorPayload) {
            $scope.loading = false;
            var isvalidToken = $rootScope.checkIsValidToken(errorPayload.data);
            console.log('No Course Found', errorPayload);
        });
    }
    $scope.AddNewCourse = function () {

        var promise = courseFactory.newCourse($scope.courseDetail);
        promise.then(function (payload) {
            var isvalidToken = $rootScope.checkIsValidToken(payload.data);

            if (isvalidToken) {
                if (payload.data != null || payload.data != undefined || payload.data != "") {
                    if (payload.data) {
                        $scope.RegisterMessage = "Course Added successfully!";
                        $state.go("courses.allcourses");
                    }
                    else {
                        $scope.RegisterMessage = "Course creation failed";
                    }
                }
                else {
                    $scope.notifyError("Course creation failed");
                }
            }
            $scope.loading = false;
        }, function (errorPayload) {
            $scope.loading = false;
            var isvalidToken = $rootScope.checkIsValidToken(errorPayload.data);
            console.log('No Course Found', errorPayload);
        });

    }
    $scope.EditCourseInfo = function (id) {
        if (id) {
            $state.go("courses.edit", { CourseID: id });
        }
        else {
            $scope.notifyError("Invalid request");
        }
    }
    $scope.updateCourseInfo = function (id) {
        var promise = courseFactory.updateCourse($scope.courseDetail);
        promise.then(function (payload) {
            var isvalidToken = $rootScope.checkIsValidToken(payload.data);

            if (isvalidToken) {
                if (payload.data != null || payload.data != undefined || payload.data != "") {
                    if (payload.data) {
                        $scope.RegisterMessage = "Course detail updated!";
                    }
                    else {
                        $scope.RegisterMessage = "";
                    }
                }
                else {
                    $scope.notifyError("Update course detail failed");
                }
            }
            $scope.loading = false;
        }, function (errorPayload) {
            $scope.loading = false;
            var isvalidToken = $rootScope.checkIsValidToken(errorPayload.data);
            console.log('No Course Found', errorPayload);
        });
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
})
