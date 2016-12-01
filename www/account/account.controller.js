angular.module('starter.controllers').controller('AccountCtrl', function($scope, $http, $cordovaCamera, Filmes) {
	$scope.filme = {
		id: ''
	};
	$scope.debugar = function() {
		console.log($scope.filme.id);
		if ($scope.filme.id != '') {
			let filme = Filmes.get($scope.filme.id);
			if (filme == false) {
				$scope.debug = 'Não encontrei esse filme no localStorage';
				$scope.imdbID = '';
			} else {
				$scope.debug = JSON.stringify(filme);
			}
		} else {
			$scope.debug = '';
			keys = Object.keys(window.localStorage);
			i = keys.length;

			while (i--) {
				$scope.debug += 'ID:' + keys[i] + ' - ' + Filmes.get(keys[i]).Title + "<br />";
			}
		}
	}

	$scope.limpar = function() {
		window.localStorage.clear();
	}

	$scope.takePicture = function() {
		var options = {
			quality: 100,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 400,
			targetHeight: 400,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.imgURI = "data:image/jpeg;base64," + imageData;
		}, function(err) {
			// An error occured. Show a message to the user
		});
	}

	$scope.listarUsuarios = function() {
		$http.get(
			'http://localhost:8084/usuarios/list'
		).success(function(data) {
			console.log(data);
		});
	};
	$scope.listarFilmes = function() {
		$http.get(
			'http://localhost:8084/emcartaz/list?cidade_id=1'
		).success(function(data) {
			console.log(data);
		});
	};
});
