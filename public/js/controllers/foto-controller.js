angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams){

	$scope.foto = {};
	$scope.mensagem = '';

	$scope.submeter = function() {
		if ( $scope.cadastro.$valid ) {

			// Verifica se possui ID na foto
			if ( $scope.foto._id ) {

				// Se possuir, habilita sua edição
				$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
				.success(function() {
					$scope.mensagem = `A foto ${$scope.foto.titulo} foi alterada com sucesso.`;
				})
				.error(function(erro) {
					console.log(erro);
					$scope.mensagem = `Não foi possível alterar a foto ${$scope.foto.titulo}.`;
				})

			} else {

				// Se não possuir ID na foto atual, habilita a criação de uma nova foto
				$http.post('v1/fotos', $scope.foto)
				.success( function() {
					$scope.foto = {};
					$scope.cadastro.$setPristine();
					$scope.mensagem = "Foto incluída com sucesso";
				})
				.error( function(erro){
					$scope.mensagem = "Não foi possível incluir a foto";
					console.log(erro);
				});
			}
		}
	};

	// Condicional para edição da foto
	if ($routeParams.fotoId) {
		$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto) {
			$scope.foto = foto;
		})
		.error(function(erro) {
			$scope.mensagem = `Não foi possível obter a foto de ID ${$routeParams.fotoId}`;
		});
	}
	
});
