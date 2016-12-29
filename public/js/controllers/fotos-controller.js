// Importando o main.js
// Criação de um controller que importa o main.js
angular.module('alurapic').controller('FotosController', function($scope, $http) {

	// $scope -> dependência do controller
	// é adicionada a foto dinamicamente no $scope
	// pra q serve o $scope? pro controller disponibilizar dados na minha view
	$scope.fotos = [];

	/*
	var promise = $http.get('v1/fotos');
	promise.then(function(retorno) {
		$scope.fotos = retorno.data;
	}).catch(function(error) {
		console.log(error);
	});
	*/

	/*
	$http.get('v1/fotos')
		.then(retorno => $scope.fotos = retorno.data)
		.catch(error => console.log(error));
	*/

	$http.get('v1/fotos')
		.success( fotos => $scope.fotos = fotos )
		.error( message => console.log(message) );

});
