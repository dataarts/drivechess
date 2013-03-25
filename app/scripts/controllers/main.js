'use strict';

angular.module('chessApp')
  .controller('MainCtrl', function($scope, rtclient) {

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

    function initializeModel(model) {
      var board = model.createMap(startState);
      model.getRoot().set('board', board);
      $scope.board = board;
    }

    function onFileLoaded(doc) {
      $scope.board = doc.getModel().getRoot().get('board');
      window.board = $scope.board;
      $scope.$apply();
      // // Keeping one box updated with a String binder.
      // var textArea1 = document.getElementById('editor1');
      // gapi.drive.realtime.databinding.bindString(string, textArea1);

      // // Keeping one box updated with a custom EventListener.
      // var textArea2 = document.getElementById('editor2');
      // var updateTextArea2 = function(e) {
      //   textArea2.value = string;
      // };
      $scope.board.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
        console.log('object changed');
        $scope.$apply();
      });
      // string.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, updateTextArea2);
      // string.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, updateTextArea2);
      // textArea2.onkeyup = function() {
      //   string.setText(textArea2.value);
      // };
      // updateTextArea2();

      // // Enabling UI Elements.
      // textArea1.disabled = false;
      // textArea2.disabled = false;
    }

    var realtimeOptions = {
      clientId: '34208184131.apps.googleusercontent.com',
      authButtonElementId: 'authorizeButton',
      initializeModel: initializeModel,
      autoCreate: true,
      defaultTitle: 'DriveChess',
      onFileLoaded: onFileLoaded
    };

    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start();

  });
