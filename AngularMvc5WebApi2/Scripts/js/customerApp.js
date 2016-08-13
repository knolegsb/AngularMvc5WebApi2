var app = angular.module('ngApp', []);
app.controller('customerController', ['$scope', '$http', customerController]);

function customerController($scope, $http) {
    $scope.loading = true;
    $scope.addMode = false;

    $http.get('/api/Customer').success(function (data) {
        $scope.customers = data;
        $scope.loading = false;
    })
    .error(function(){
        $scope.error = "An Error has occured while loading posts!";
        $scope.loading = false;
    });

    $scope.toggleEdit = function () {
        this.customer.editMode = !this.customer.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
    };

    $scope.add = function () {
        $scope.loading = true;
        $http.post('/api/Customer/', this.newcustomer).success(function (data) {
            alert('Added Successfully!');
            $scope.addMode = false;
            $scope.customers.push(data);
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while adding customer!" + data;
            $scope.loading = false;
        });
    };

    $scope.deletecustomer = function () {
        $scope.loading = true;
        var Id = this.customer.Id;
        $http.delete('/api/Customer/' + Id).success(function (data) {
            $.each($scope.customers, function (i) {
                if ($scope.customers[i].Id === Id) {
                    $scope.customers.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving Customer! " + data;
            $scope.loading = false;
        });
    };
}