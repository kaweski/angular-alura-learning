angular.module('meusServicos', ['ngResource']).factory('recursoFoto', 
	function($resource) {

	// Substitui o $http por $resource, utilizando $resource, o endereço do banco só precisa ser buscado uma vez
	return $resource('v1/fotos/:fotoId', null, { // null seria para montar uma query string
		update : {
			method : 'PUT'
		}
	});

})

// $q, especializado na criação de promises
.factory('cadastroDeFoto', function(recursoFoto, $q, $rootScope) {
	
	var servico = {};
	var evento = "fotoCadastrada";

	servico.cadastrar = foto => {
		return $q(function(resolve, reject) {

			// Se possuir ID é porque eu quero editar
			if ( foto._id ) {

				recursoFoto.update({fotoId : foto._id}, foto, function() {
					$rootScope.$broadcast(evento);
					resolve({
						mensagem : `Foto ${foto.titulo} alterada com sucesso.`,
						inclusao : false
					});

				}, erro => {
					console.log(erro);
					reject({
						mensagem : `Ocorreu algum problema ao tentar alterar a foto ${foto.titulo}.`
					});
				});

			// Se não é porque eu quero incluir uma nova foto
			} else {

				recursoFoto.save(foto, function() {
					$rootScope.$broadcast(evento);
					resolve({
						mensagem : `Foto ${foto.titulo} incluída com sucesso`,
						inclusao : true
					});

				}, erro => {
					console.log(erro);
					reject({
						mensagem : "Não foi possível incluir a foto"
					});
				});
			}
		});
	};

	return servico;
});
