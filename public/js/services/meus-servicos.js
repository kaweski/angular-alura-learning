angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource){

	// Substitui o $http por $resource, utilizando $resource, o endereço do banco só precisa ser buscado uma vez
	return $resource('v1/fotos/:fotoId', null, { // null seria para montar uma query string
		update : {
			method : 'PUT'
		}
	});

})

.factory('cadastroDeFoto', function(recursoFoto, $q) {
	
	var servico = {};

	servico.cadastrar = function(foto) {
		return $q(resolve, reject) {

			// Se possuir ID é porque eu quero editar
			if ( foto._id ) {

				recursoFoto.update({fotoId : foto._id}, foto, function() {
					resolve({
						mensagem : `Foto ${foto.titulo} alterada com sucesso.`;
						inclusao : false
					});
				}, function(erro) {
					reject({
						mensagem: `Ocorreu algum problema ao tentar alterar a foto ${foto.titulo}.`;
					})
				});

			// Se não é porque eu quero incluir uma nova foto
			} error {
				//
			}

			// resolve();
			// reject();
		}
	};

	return servico;
});
