angular.module('starter.services', [])

  .factory('Filmes', function(){
    var filmes = [
      {
        id : 1,
        titulo : 'Star Trek Sem Fronteiras',
        thumbnail : 'startrek.jpg',
        capa : 'capa_startrek.jpg',
        vaiGostar : true,
        info: "Star Trek Beyond é um filme norte-americano de 2016 dirigido por Justin Lin e escrito por Simon Pegg e Doug Jung. É o décimo terceiro longa-metragem da franquia Star Trek e o terceiro estrelado pelo novo elenco na série reboot. Na história, a tripulação da USS Enterprise é atacada e presa por uma espécia alienígena desconhecida, precisando encontrar um modo de fugir e enfrentar um inimigo que odeia a Federação dos Planetas Unidos.",
        horarios: [
            {
                cinema: 'UCI Palladium',
                sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
            },
            {
                cinema: 'IMAX Palladium',
                sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
            },
        ],
      },
      {
        id : 4,
        titulo : 'Esquadrão Suicida',
        thumbnail : 'suicide.jpg',
        vaiGostar : true,
      },
      {
        id : 5,
        titulo : 'Ben Hur',
        thumbnail : 'benhur.jpg',
        vaiGostar : true,
      },
      {
        id : 2,
        titulo : 'A vida secreta dos bichos',
        thumbnail : 'pets.jpg',
        vaiGostar : false,
      },
      {
        id : 3,
        titulo : 'Um namorado pra minha mulher',
        thumbnail : 'namorado.jpg',
        vaiGostar : false,
      },
    ];

    return {
      listar: function (vaiGostar){
        var retorno = [];
        for (var i = 0; i < filmes.length; i++) {
          var filme = filmes[i];
          if (filme.vaiGostar == vaiGostar){
            retorno.push(filme);
          }
        }
        return retorno;
      },
      get: function (filmeId){
          var retorno = [];
          for (var i = 0; i < filmes.length; i++) {
            var filme = filmes[i];
            if (filme.id == filmeId){
              return filme;
            }
          }
      },
      all: function (){
          return filmes;
      },
    }
  })

    .factory('Trakt', function($http){
        // var client_id = "776612b19d6d3811237441b7f05eaa19f5dcd59a650b71e6574133b1827f2431"; // live
        var client_id = "ff3b9ae43cf4b08d7e1d47f8576ddbf1016b22fceaa0c7f0ff0695abd0d5226b"; // staging
        var client_secret = "dcadfb407389c5d8156b77b6252c348d6e761e5fa8d59d01c3565968550b50f2"; // staging
        // var url = 'https://api-staging.trakt.tv/'; // staging
        // var url = 'https://api.trakt.tv/'; // live
        var url = "http://www.omdbapi.com/";

        return {
            conectar: function() {
                var req = {
                     method: 'GET',
                     url: url ,
                     headers: {
                       'Content-Type': 'application/json',
                    //    'trakt-api-key': client_id,
                    //    'trakt-api-version': 2,
                     },
                     params: {
                        //  "response_type" : "code",
                        //  "client_id": client_id,
                        //  "redirect_uri" : "urn:ietf:wg:oauth:2.0:oob",
                        //  "state" : "tab.account",
                        't' : t,
                        'plot' : 'short',
                        'r' : 'json',
                     }
                }
                var ret;
                $http(req).then(function successCallback(data){
                    console.log(data);
                    return data;
                });
                return ret;
            },
            getFilme: function(t) {
                var req = {
                     method: 'GET',
                     url: url ,
                     headers: {
                       'Content-Type': 'application/json',
                     },
                     params: {
                        't' : t,
                        'plot' : 'short',
                        'r' : 'json',
                     }
                }
                var filme;
                return $http(req).then(function successCallback(response){
                    // console.log(response.data);
                    // export data;
                    filme = response.data;
                    return response.data;
                });
                // console.log(data)
                return filme;
            },
        }
    })

  ;
