(function() {
    'use strict';

    angular
        .module('starter')
        .constant('config', {
            // 'BACKEND': 'http://ec2-52-41-8-252.us-west-2.compute.amazonaws.com:8081/',
            'BACKEND': 'http://localhost:8888/',
			'client_id': '1030600482588-fta9g0t6uo71lvo959v3f0mssb6gdj55.apps.googleusercontent.com',
			'client_secret': 'thWZUpABS6nJWSyZ56FPax2p',
			'redirect_uri': 'http://localhost:8100',
			'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
        });

})();
