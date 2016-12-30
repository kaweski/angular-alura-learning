// Importando o main.js
// Criação de um controller que o main.js importa
angular.module('alurapic').controller('FotosController', function($scope, recursoFoto) {

	// $scope: dependência do controller.
	// É adicionada a foto dinamicamente no $scope.
	// Pra q serve o $scope? pro controller disponibilizar dados na minha view com angular expression que é unidirecional, os dados são apenas LIDOS.
	$scope.fotos = [];
	$scope.filtro = ''; // O filtro deve ser bidirecional, ou seja, o que eu digitar no filtro deve ser entendido
	$scope.mensagem = '';

	recursoFoto.query(
		fotos => $scope.fotos = fotos,
		erro => console.log(erro)
	);

	// Função que remove uma foto da listagem de fotos
	$scope.remover = foto => {

		recursoFoto.delete({fotoId : foto._id}, function() {
			
			let indexFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indexFoto, 1);
			$scope.mensagem = `Foto ${foto.titulo} foi removida com sucesso!`;

		}, erro => {
			console.log(erro);
			$scope.mensagem = `Não foi possível remover a foto ${foto.titulo}.`;
		});

	};

});
