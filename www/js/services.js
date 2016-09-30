angular.module('starter.services', [])

.factory('Filmes', function($http, $ionicLoading) {
	var filmes = [{
		id: 'tt1540011',
		titulo: 'Bruxa de Blair',
		vai_gostar: false,
	}, {
		id: 'tt2709768',
		titulo: 'Pets - A vida secreta dos bichos',
		thumbnail: 'img/pets.jpg',
		vai_gostar: true,
	}, {
		id: 'tt4160708',
		titulo: 'O homem nas trevas',
		vai_gostar: false,
	}, {
		id: 'tt5475002',
		titulo: 'Um namorado para minha esposa',
		thumbnail: 'img/namorado.jpg',
		vai_gostar: false,
	}, {
		id: 'tt2660888',
		titulo: 'Star Trek - Sem Fronteiras',
		vai_gostar: true,
		info: "Star Trek Beyond é um filme norte-americano de 2016 dirigido por Justin Lin e escrito por Simon Pegg e Doug Jung. É o décimo terceiro longa-metragem da franquia Star Trek e o terceiro estrelado pelo novo elenco na série reboot. Na história, a tripulação da USS Enterprise é atacada e presa por uma espécia alienígena desconhecida, precisando encontrar um modo de fugir e enfrentar um inimigo que odeia a Federação dos Planetas Unidos.",
		horarios: [{
			cinema: 'UCI Palladium',
			sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
		}, {
			cinema: 'IMAX Palladium',
			sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
		}, ],
	}, {
		id: 'tt1386697',
		titulo: 'Esquadrão Suicida',
		thumbnail: 'img/suicide.jpg',
		vai_gostar: true,
	}, {
		id: 'tt1355631',
		titulo: 'Conexão Escobar',
		vai_gostar: true,
	}, {
		id: 'tt5221584',
		vai_gostar: false,
	}, {
		id: 'tt3774114',
		vai_gostar: true,
	}, {
		id: 'tt2005151',
		vai_gostar: false,
	}];

	var em_cartaz = glb.getEmCartaz();

	return {
		listar: function(vaiGostar) {
			var retorno = [];
			for (var i = 0; i < em_cartaz.length; i++) {
				var filme = JSON.parse(window.localStorage.getItem(em_cartaz[i]));

				if (filme.vai_gostar == vaiGostar) {
					retorno.push(filme);
				}
			}
			return retorno;
		},
        set: function(filme) {
            window.localStorage.setItem(filme.id, JSON.stringify(filme));
            return true;
        },
		get: function(filmeId) {
            if(window.localStorage.getItem(filmeId) != undefined) {
    			return JSON.parse(window.localStorage.getItem(filmeId));
            } else {
                return false;
            }
		},
		all: function() {
			return filmes;
		},
		// criar um item local para cada um dos filmes em cartaz
		salvarLocal: function(){
			for (var i = 0; i < em_cartaz.length; i++){
				// vamos checar se já está salvo localmente
				if (window.localStorage.getItem(em_cartaz[i]) == undefined){
					var req = glb.getReq(em_cartaz[i]);
	                $http(req).then(function successCallback(response){
	                    var filme = response.data;
						var encontrou = false;
	                    for (var j = 0; j < filmes.length; j++) {
							var filme_local = filmes[j];
							if (filme.imdbID == filme_local.id){
								encontrou = true;
								filme.id = filme.imdbID;
								// ve se tem título em pt
	                            if (filme_local.titulo != undefined){
									filme.titulo = filme_local.titulo;
									filme.Title = filme_local.titulo;
								}
								// operações com poster e miniatura
								if (filme.Poster == 'N/A' || filme.Poster == undefined)
									filme.Poster == 'img/semposter.png';
								if (filme_local.thumbnail != undefined ){
									filme.thumbnail = filme_local.thumbnail;
									filme.Poster = filme_local.thumbnail;
								} else {
									filme.thumbnail = filme.Poster;
								}
								// setar vai_gostar
								if (filme_local.vai_gostar != undefined)
	                                filme.vai_gostar = filme_local.vai_gostar;
								else
									filme.vai_gostar = false;
							}
						} // end loop filmes
						if (encontrou == false)
							filme.vai_gostar == false;
						window.localStorage.setItem(filme.imdbID, JSON.stringify(filme));
						loaded_qtde++;
	                });
				} else {
					loaded_qtde++;
				}
			} // end loop em_cartaz
		},
	}
})

;
