(function() {
	'use strict';

	angular
		.module('starter.services', [])
		.factory('Filmes', Filmes);

	Filmes.$inject = ['$http', '$ionicLoading', 'config'];

	function Filmes($http, $ionicLoading, config) {
		return {
			getListaBackend: getListaBackend,
			pesquisar: pesquisar,
			listar: listar,
			getEmCartaz: getEmCartaz,
			setEmCartaz: setEmCartaz,
			gostar: gostar,
			get: get,
			salvarLista: salvarLista,
		};

		function getListaBackend() {
			return $http.get(config.BACKEND + 'emcartaz/list?cidade_id=1')
				.then(getListaCompleto)
				.catch(listaErro);

			function getListaCompleto(response) {
				return response.data;
			}

			function listaErro(error) {
				console.log('Erro na busca da lista de filmes.');
				console.log(error);
				return error;
			}
		}

		function pesquisar(termo) {
			return $http.get(config.BACKEND + 'filmes/pesquisar?termo=' + termo)
				.then(getListaCompleto)
				.catch(listaErro);

			function getListaCompleto(response) {
				return response.data;
			}

			function listaErro(error) {
				console.log('Erro na busca da lista de filmes.');
				console.log(error);
				return error;
			}
		}

		function listar(vaiGostar) {
			// return true;
			var retorno = [];
			var em_cartaz = this.getEmCartaz();
			for (var i = 0; i < em_cartaz.length; i++) {
				var filme = JSON.parse(window.localStorage.getItem(em_cartaz[i]));

				if (filme.vai_gostar == vaiGostar || filme.vai_gostar == undefined) {
					retorno.push(filme);
				}

			}
			return retorno;
		}

		function getEmCartaz() {
			return JSON.parse(window.localStorage.getItem('em_cartaz'));
		}

		function setEmCartaz(data) {
			console.log('setEmCartaz');
			var em_cartaz = [];
			for (var i = 0; i < data.length; i++) {
				var filme = data[i];
				em_cartaz.push(filme.imdbid);
			}
			window.localStorage.setItem('em_cartaz', JSON.stringify(em_cartaz));
		}

		function gostar(gostou, imdbid) {
			let filme = JSON.parse(window.localStorage.getItem(filmeId));
			return $http.get(config.BACKEND + 'filmes/view-json?id=' + filmeId)
				.then(getCompleto)
				.catch(erro);
		}

		function getCompleto(response) {
			window.localStorage.setItem(filmeId, JSON.stringify(response.data));
			return response.data;
		}

		function erro() {
			console.log('erro na chamada de filme:' + filmeId);
		}
	}

	function get(filmeId) {
		if (window.localStorage.getItem(filmeId) != undefined) {
			return JSON.parse(window.localStorage.getItem(filmeId));
		} else {
			return $http.get(config.BACKEND + 'filmes/view-json?id=' + filmeId)
				.then(getCompleto)
				.catch(erro);
		}

		function getCompleto(response) {
			window.localStorage.setItem(filmeId, JSON.stringify(response.data));
			return response.data;
		}

		function erro() {
			console.log('erro na chamada de filme:' + filmeId);
		}
	}

	// salva a lista de filmes em cartaz localmente
	function salvarLista(data) {
		console.log('salvarLista');
		for (var i = 0; i < data.length; i++) {
			var filme = data[i];
			window.localStorage.setItem(filme.imdbid, JSON.stringify(filme));
		}
	}
})();
