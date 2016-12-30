// Importando o main.js
// Criação de um controller que importa o main.js
angular.module('alurapic').controller('FotosController', function($scope, $http) {

	// $scope -> dependência do controller
	// é adicionada a foto dinamicamente no $scope
	// pra q serve o $scope? pro controller disponibilizar dados na minha view com angular expression
	// que é unidirecional, os dados são apenas LIDOS.
	$scope.fotos = [];

	// O filtro deve ser bidirecional, ou seja, o que eu digitar no filtro deve ser entendido
	$scope.filtro = '';

	$scope.mensagem = '';

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
		.success( retorno => $scope.fotos = retorno )
		.error( erro => console.log(erro) );

	// Função que remove uma foto da listagem de fotos
	$scope.remover = function(foto) {
		$http.delete('v1/fotos/' + foto._id)
		.success(function() {
			let indexFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indexFoto, 1);

			$scope.mensagem = `Foto ${foto.titulo} foi removida com sucesso!`;
		})
		.error(function(erro) {
			console.log(erro);
			$scope.mensagem = `Não foi possível remover a foto ${foto.titulo}.`;
		})
	};

});
