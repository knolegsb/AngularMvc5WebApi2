//var app = angular.module("ngApp", []);

app.controller("appController", function ($scope, $http, productService) {
    $scope.productData = null;
    productService.GetAllRecords().then(function (data) {
        $scope.productData = data.data;
    }, function () {
        alert('Error Occured !');
    });

    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.productData, function (item) {
            total += item.Price;
        })
        return total;
    }

    $scope.Product = {
        Id: '',
        Name: '',
        Price: '',
        Category: ''
    };

    $scope.clear = function () {
        $scope.Prodcut.Id = '';
        $scope.Product.Name = '';
        $scope.Product.Price = '';
        $scope.Product.Category = '';
    }

    $scope.save = function () {
        if ($scope.Product.Name != "" && $scope.Product.Price != "" && $scope.Product.Category != "") {
            $http({
                method: 'POST',
                url: '/api/Product/PostProduct/',
                data: $scope.Product
            }).then(function successCallback(response) {
                $scope.productData.push(response.data);
                $scope.clear();
                alert("Product Added Successfully !");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !');
        }
    };

    $scope.edit = function (data) {
        $scope.Product = { Id: data.Id, Name: data.Name, Price: data.Price, Category: data.Category };
        console.log($scope.Product.Id);
    }

    $scope.cancel = function () {
        $scope.clear();
    }

    $scope.update = function () {
        if ($scope.Product.Name != "" && $scope.Product.Price != "" && $scope.Product.Category != "") {
            console.log($scope.Product.Id);
            $http({
                method: 'PUT',
                url: '/api/product/PutProduct/' + $scope.Product.Id,
                data: $scope.Product
            }).then(function successCallback(response) {
                $scope.productData = response.data;
                $scope.clear();
                alert("Product Updated Successfully !");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
            
        }
        else {
            alert('Please Enter All the Values !');
        }
    };

    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: '/api/Product/DeleteProduct/' + $scope.productData[index].Id,
        }).then(function successCallback(response) {
            $scope.productData.splice(index, 1);
            aleart("Product Deleted Successfully !");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };
});

app.factory("productService", function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/api/product/GetAllProducts');
    }    
    return fac;
});