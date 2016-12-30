angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, $routeParams){

	$scope.foto = {};
	$scope.mensagem = '';

	// Condicional para edição da foto
	if ($routeParams.fotoId) {
		recursoFoto.get({fotoId : $routeParams.fotoId}, 
			foto => $scope.foto = foto, 
			erro => {
				console.log(erro);
				$scope.mensagem = `Não foi possível obter a foto de ID ${$routeParams.fotoId}`;
			}
		);
	}

	// Função de "Salvar" do formulário de cadastro/edição
	$scope.submeter = function() {
		if ( $scope.cadastro.$valid ) {

			// Verifica se possui ID na foto
			if ( $routeParams.fotoId ) {

				// Se possuir, habilita sua edição

				// ------------- Edição
				recursoFoto.update({fotoId : $scope.foto._id}, 
					$scope.foto, function() {
					$scope.mensagem = `A foto ${$scope.foto.titulo} foi alterada com sucesso.`;
				}, erro => {
					console.log(erro);
					$scope.mensagem = `Não foi possível alterar a foto ${$scope.foto.titulo}.`;
				});

			} else {

				// Se não possuir ID na foto atual, habilita a criação de uma nova foto

				// ------------- Criação
				recursoFoto.save($scope.foto, function() {
					$scope.foto = {};
					$scope.cadastro.$setPristine();
					$scope.mensagem = "Foto incluída com sucesso";
				}, erro => {
					console.log(erro);
					$scope.mensagem = "Não foi possível incluir a foto";
				});
			}
		}
	};
});
