
var app = angular.module("shoppingApp", []);

app.factory('products',['$http', function($http) {
  var url = window.location.href + 'assets/products.json';      
  return $http.get(url)
         .success(function(data) {			
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);

app.controller('productsCtrl', ['$scope', 'products', function($scope, products) { 			
  $scope.basket = {};
  $scope.total = 0;
  $scope.path = window.location.href;

  products.success(function(data) { 
    $scope.products = data; 	
  });	
  
  $scope.basketAdd = function(index)
  {		
	$scope.total = parseInt($scope.products[index].price) + $scope.total;
	
	$scope.basket[index] ? 
		$scope.basket[index].qty += 1 : 
		$scope.basket[index] = {qty: 1};	
	
	$scope.basket[index].item = $scope.products[index];
	
  };
  
  $scope.basketRemove = function(key)
  {	
	var item = parseInt(key);
  
	$scope.total =  $scope.total - (parseInt($scope.products[key].price) * parseInt($scope.basket[item].qty)) ;
		
	
		
	delete $scope.basket[item];   
	

  };
  

  
  
  
}]);



