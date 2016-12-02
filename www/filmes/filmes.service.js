angular
	.module('starter.services', [])
	.factory('Filmes', Filmes);

Filmes.$inject = ['$http', '$ionicLoading'];

function Filmes($http, $ionicLoading) {
	return {
		getListaBackend: getListaBackend,
		listar: listar,
		getEmCartaz: getEmCartaz,
		setEmCartaz: setEmCartaz,
		set: set,
		get: get,
		all: all,
		salvarLocal: salvarLocal,
		salvarLista: salvarLista,
	};
	var fm = this;
	var filmes = [];
	var backend = 'http://localhost:8084/';
	var em_cartaz = [];

	function getListaBackend() {
		return $http.get('http://localhost:8084/emcartaz/list?cidade_id=1')
			.then(getListaCompleto)
			.catch(listaErro);

		function getListaCompleto(response){
			return response.data;
		}

		function listaErro(error){
			console.log('Erro na busca da lista de filmes.');
			console.log(error);
			return error;
		}
	}

	function listar(vaiGostar) {
		return true;
		var retorno = [];
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

	function set(filme) {
		// vamos procurar localmente os filmes
		let encontrou = false;
		console.log('set');
		console.log(filme);
		for (let j = 0; j < filmes.length; j++) {
			var filme_local = filmes[j];
			if (filme.imdbID == filme_local.id) {
				encontrou = true;
				filme.id = filme.imdbID;
				// ve se tem título em pt
				if (filme_local.titulo != undefined) {
					filme.titulo = filme_local.titulo;
					filme.Title = filme_local.titulo;
				}
				// operações com poster e miniatura
				if (filme.Poster == 'N/A' || filme.Poster == undefined)
					filme.Poster == 'img/semposter.png';
				if (filme_local.thumbnail != undefined) {
					filme.thumbnail = filme_local.thumbnail;
					filme.Poster = filme_local.thumbnail;
				}
				// setar vai_gostar
				if (filme_local.vai_gostar != undefined)
					filme.vai_gostar = filme_local.vai_gostar;
			}
		}
		// se não encontrou localmente preenche com os valores da API
		if (encontrou == false) {
			filme.id = filme.imdbID;
			if (filme.Poster == 'N/A')
				filme.Poster = 'img/semposter.png';
			if (filme.thumbnail == undefined)
				filme.thumbnail = filme.Poster;
			if (filme.titulo == undefined)
				filme.titulo = filme.Title;
			if (filme.vai_gostar == undefined)
				filme.vai_gostar = false;
		}

		window.localStorage.setItem(filme.id, JSON.stringify(filme));
		return true;
	}

	function get(filmeId) {
		if (window.localStorage.getItem(filmeId) != undefined) {
			return JSON.parse(window.localStorage.getItem(filmeId));
		} else {
			return false;
		}
	}

	function all() {
		return filmes;
	}

	// criar um item local para cada um dos filmes em cartaz
	function salvarLocal() {
		// for (var i = 0; i < em_cartaz.length; i++) {
		// 	// vamos checar se já está salvo localmente
		// 	if (window.localStorage.getItem(em_cartaz[i]) == undefined) {
		// 		var req = glb.getReq(em_cartaz[i]);
		// 		$http(req).then(function successCallback(response) {
		// 			var filme = response.data;
		// 			var encontrou = false;
		// 			for (let j = 0; j < filmes.length; j++) {
		// 				var filme_local = filmes[j];
		// 				if (filme.imdbID == filme_local.id) {
		// 					encontrou = true;
		// 					filme.id = filme.imdbID;
		// 					// ve se tem título em pt
		// 					if (filme_local.titulo != undefined) {
		// 						filme.titulo = filme_local.titulo;
		// 						filme.Title = filme_local.titulo;
		// 					}
		// 					// operações com poster e miniatura
		// 					if (filme.Poster == 'N/A' || filme.Poster == undefined)
		// 						filme.Poster == 'img/semposter.png';
		// 					if (filme_local.thumbnail != undefined) {
		// 						filme.thumbnail = filme_local.thumbnail;
		// 						filme.Poster = filme_local.thumbnail;
		// 					} else {
		// 						filme.thumbnail = filme.Poster;
		// 					}
		// 					// setar vai_gostar
		// 					if (filme_local.vai_gostar != undefined)
		// 						filme.vai_gostar = filme_local.vai_gostar;
		// 					else
		// 						filme.vai_gostar = false;
		// 				}
		// 			} // end loop filmes
		// 			if (encontrou == false)
		// 				filme.vai_gostar == false;
		// 			window.localStorage.setItem(filme.imdbID, JSON.stringify(filme));
		// 			loaded_qtde++;
		// 		});
		// 	} else {
		// 		loaded_qtde++;
		// 	}
		// } // end loop em_cartaz
	}

	// salva a lista de filmes em cartaz localmente
	function salvarLista(data) {
		console.log('salvarLista');
		for (var i = 0; i < data.length; i++) {
			var filme = data[i];
			window.localStorage.setItem(filme.imdbid, JSON.stringify(filme));
		}
	}
}
