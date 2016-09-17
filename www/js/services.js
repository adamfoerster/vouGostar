angular.module('starter.services', [])

.factory('Filmes', function() {
  var filmes = [{
    id: 1,
    titulo: 'Star Trek Sem Fronteiras',
    thumbnail: 'startrek.jpg',
    capa: 'capa_startrek.jpg',
    vaiGostar: true,
    info: "Star Trek Beyond é um filme norte-americano de 2016 dirigido por Justin Lin e escrito por Simon Pegg e Doug Jung. É o décimo terceiro longa-metragem da franquia Star Trek e o terceiro estrelado pelo novo elenco na série reboot. Na história, a tripulação da USS Enterprise é atacada e presa por uma espécia alienígena desconhecida, precisando encontrar um modo de fugir e enfrentar um inimigo que odeia a Federação dos Planetas Unidos.",
    horarios: [{
      cinema: 'UCI Palladium',
      sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
    }, {
      cinema: 'IMAX Palladium',
      sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
    }, ],
  }, {
    id: 4,
    titulo: 'Esquadrão Suicida',
    thumbnail: 'suicide.jpg',
    vaiGostar: true,
  }, {
    id: 5,
    titulo: 'Ben Hur',
    thumbnail: 'benhur.jpg',
    vaiGostar: true,
  }, {
    id: 2,
    titulo: 'A vida secreta dos bichos',
    thumbnail: 'pets.jpg',
    vaiGostar: false,
  }, {
    id: 3,
    titulo: 'Um namorado pra minha mulher',
    thumbnail: 'namorado.jpg',
    vaiGostar: false,
  }, ];

  return {
    listar: function(vaiGostar) {
      var retorno = [];
      for (var i = 0; i < filmes.length; i++) {
        var filme = filmes[i];
        if (filme.vaiGostar == vaiGostar) {
          retorno.push(filme);
        }
      }
      return retorno;
    },
    get: function(filmeId) {
      var retorno = [];
      for (var i = 0; i < filmes.length; i++) {
        var filme = filmes[i];
        if (filme.id == filmeId) {
          return filme;
        }
      }
    },
    all: function() {
      return filmes;
    },
  }
})

.factory('Globais', function() {

  return {
    getUrl: function() {
        return "http://www.omdbapi.com/";
    },
  }
})

.factory('Omdb', function() {

  var url = "http://www.omdbapi.com/";

  return {

    getFilme: function(t) {
      var req = {
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          't': t,
          'plot': 'short',
          'r': 'json',
        }
      }
      var teste = {};
      var filme = $http(req).then(function successCallback(response) {
        console.log(response.data);
        // export data;
        this.teste = response.data;
        return response.data;
      });
      console.log(teste);
      return teste;
    },
  }
})

;
