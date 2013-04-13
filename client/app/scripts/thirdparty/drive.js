'use strict';

(function(window, document, undefined) {
  var drive = {};

  google.load('picker', '1');

  drive.open = function(rtclient, appId, realTimeLoader) {
    var token = gapi.auth.getToken().access_token;
    var view = new google.picker.View(google.picker.ViewId.DOCS);
    view.setMimeTypes('application/vnd.google-apps.drive-sdk.' + appId);
    var picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .setAppId(appId)
    .setOAuthToken(token)
    .addView(view)
    .addView(new google.picker.DocsUploadView())
    .setCallback(function(data) {
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        rtclient.redirectTo(fileId, realTimeLoader.authorizer.userId);
      }
    })
    .build();
    picker.setVisible(true);
  };

  drive.share = function(rtclient, appId) {
    var shareClient = new gapi.drive.share.ShareClient(appId);
    shareClient.setItemIds([rtclient.params['fileId']]);
    shareClient.showSettingsDialog();
  };

  //export
  window.drive = drive;

})(window, document);

