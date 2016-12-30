angular.module('alurapic').controller('FotoController', 
	function($scope, recursoFoto, cadastroDeFoto, $routeParams){

	$scope.foto = {};
	$scope.mensagem = '';

	// Condicional para edição da foto
	if ($routeParams.fotoId) {
		recursoFoto.get({fotoId : $routeParams.fotoId}, foto => $scope.foto = foto, erro => {
			console.log(erro);
			$scope.mensagem = `Não foi possível obter a foto de ID ${$routeParams.fotoId}`;
		});
	}

	// Função de "Salvar" do formulário de cadastro/edição
	$scope.submeter = function() {
		if ( $scope.cadastro.$valid ) {

			cadastroDeFoto.cadastrar($scope.foto).then( dados => {
				$scope.mensagem = dados.mensagem;

				if ( dados.inclusao ) {
					$scope.foto = {};
					$scope.cadastro.$setPristine();
				}

			}).catch( erro => $scope.mensagem = dados.mensagem);
		}
	};
});
