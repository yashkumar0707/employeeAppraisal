var myNinjaApp = angular.module('myNinjaApp', ['ngRoute'])

myNinjaApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        }).when('/detailed/:pid', {
            templateUrl: 'views/detailed.html',
            controller: 'Detailed'
        }).when('/addEmployee', {
            templateUrl: 'views/addEmployee.html',
            controller: 'addEmployee'
        })
        .otherwise({
            redirectTo: '/directory'
        })

}])


myNinjaApp.controller('NinjaController', ['$scope', '$http', '$window', (function ($scope, $http, $window) {
    $scope.message = "kaise hein app"
    $scope.removeEmployee = function (ninja) {
        console.log(ninja._id)
        // var removedNinja = $scope.ninjas.indexOf(ninja)
        // $scope.ninjas.splice(removedNinja, 1)
        $http({
            method: 'DELETE',
            url: `http://localhost:5000/api/users/deleteUser/` + ninja._id
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $http({
                method: 'GET',
                url: 'http://localhost:5000/api/users/'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data)
                $scope.ninjas = response.data
                console.log($scope.ninjas[0].name)
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.detailedNinja = function (ninja) {
        console.log(ninja._id)
        var id = ninja._id
        $window.location.href = '/index.html#!/detailed/' + id;
    }

    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/users/'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data)
        $scope.ninjas = response.data
        console.log($scope.ninjas[0].name)
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
})])


myNinjaApp.controller('Detailed', ['$scope', '$routeParams', '$http', '$window', (function ($scope, $routeParams, $http, $window) {
    var param = $routeParams.pid
    console.log(param)

    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/users/specificuser/' + param
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data)
        $scope.data = response.data
        $scope.message = $scope.data.name
        $scope.newninja = response.data
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/users/specificuser2/' + param
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data)
        $scope.info = response.data[0]


        if ($scope.info) {
            $scope.details = $scope.info.details
            if ($scope.info.rating == 1 || $scope.info.rating == 2) {
                $scope.appraisal = "The estimated appraisal amount should be 5 %"
            }
            else if ($scope.info.rating == 3 || $scope.info.rating == 4) {
                $scope.appraisal = "The estimated appraisal amount should be 10 %"
            }
            else if ($scope.info.rating == 5) {
                $scope.appraisal = "The estimated appraisal amount should be 15 %"
            }
            else if ($scope.info.rating == undefined) {
                $scope.appraisal = "New employee rating not available for an appraisal"
            }
            console.log($scope.appraisal)
        }
        else {
            $scope.appraisal = "New employee rating not available for an appraisal"
            $scope.details = "New Employee"
        }
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    $scope.update = async function (ninja) {
        var data = {
            name: $scope.newninja.name,
            salary: parseInt($scope.newninja.salary),
            department: $scope.newninja.department,
            designation: $scope.newninja.designation,
            address: $scope.newninja.address,
            age: parseInt($scope.newninja.salary)
        }
        console.log(data)
        await $http.patch(`http://localhost:5000/api/users/updateUser/` + param, JSON.stringify(data)).then(function (response) {
            console.log(response)
            $window.location.href = '/index.html#!/directory/';
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    }
    $scope.removeEmployee = function (ninja) {
        //console.log(ninja._id)
        // var removedNinja = $scope.ninjas.indexOf(ninja)
        // $scope.ninjas.splice(removedNinja, 1)
        $http({
            method: 'DELETE',
            url: `http://localhost:5000/api/users/deleteUser/` + param
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $window.location.href = '/index.html#!/directory/';
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    }
})


])



myNinjaApp.controller('addEmployee', ['$scope', '$http', '$window', (function ($scope, $http, $window) {

    $scope.addNinja = async function () {

        var data = {
            name: $scope.newninja.name,
            salary: parseInt($scope.newninja.salary),
            department: $scope.newninja.department,
            designation: $scope.newninja.designation,
            address: $scope.newninja.address,
            age: $scope.newninja.age
        }

        await $http.post("http://localhost:5000/api/users/addUser", JSON.stringify(data)).then(function (response) {
            console.log(response)
            $http({
                method: 'GET',
                url: 'http://localhost:5000/api/users/'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data)
                $scope.ninjas = response.data
                $window.location.href = '/index.html#!/directory/';
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        })
        console.log(data)
        $scope.newninja.name = ''
        $scope.newninja.belt = ''
        $scope.newninja.rate = ''

    }

    $http({
        method: 'GET',
        url: 'http://localhost:5000/api/users/'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data)
        $scope.ninjas = response.data
        console.log($scope.ninjas[0].name)
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
})])

