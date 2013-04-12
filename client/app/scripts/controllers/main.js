'use strict';

angular.module('chessApp')
  .controller('MainCtrl', function($scope, rtclient, $log, $location) {

    var startState = {
        'PBa': 'a7',
        'PBb': 'b7',
        'PBc': 'c7',
        'PBd': 'd7',
        'PBe': 'e7',
        'PBf': 'f7',
        'PBg': 'g7',
        'PBh': 'h7',
        'RBa': 'a8',
        'RBh': 'h8',
        'NBb': 'b8',
        'NBg': 'g8',
        'BBc': 'c8',
        'BBf': 'f8',
        'QBd': 'd8',
        'KBe': 'e8',
        'PWa': 'a2',
        'PWb': 'b2',
        'PWc': 'c2',
        'PWd': 'd2',
        'PWe': 'e2',
        'PWf': 'f2',
        'PWg': 'g2',
        'PWh': 'h2',
        'RWa': 'a1',
        'RWh': 'h1',
        'NWb': 'b1',
        'NWg': 'g1',
        'BWc': 'c1',
        'BWf': 'f1',
        'QWd': 'd1',
        'KWe': 'e1'
    };

    var appId = 34208184131;

    function initializeModel(model) {
      var board = model.createMap(startState);
      model.getRoot().set('board', board);
      $scope.board = board;
    }

    function onFileLoaded(doc) {
      console.log(doc);
      window.doc = doc;
      $scope.showBoard = true;
      $scope.board = doc.getModel().getRoot().get('board');
      $scope.$apply();
      $scope.board.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
        $scope.$apply();
      });
    }

    var realtimeOptions = {
      clientId: '34208184131.apps.googleusercontent.com',
      authButtonElementId: 'authorizeButton',
      authNeededCallback: function() {
        $scope.needsAuth = true;
        $scope.$apply();
      },
      initializeModel: initializeModel,
      autoCreate: true,
      defaultTitle: 'Untitled Drive Chess Game',
      onFileLoaded: onFileLoaded
    };

    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start(function() {
      $scope.authorized = true;
      $scope.$apply();
    });

    $scope.flip = function() {
      $('chessboard').toggleClass('black');
    };

    $scope.rename = function() {
      console.log('rename game');
    };

    $scope.share = function() { drive.share(rtclient, appId); };
    $scope.open = function() { drive.open(rtclient, appId, realtimeLoader); };
    $scope.create = function() { window.location.href = '/'; };


  });
