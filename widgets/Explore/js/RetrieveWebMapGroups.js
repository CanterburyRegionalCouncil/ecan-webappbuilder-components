define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'esri/request'
], function(declare, lang, esriRequest){
  return declare("RetrieveWebMapGroups",[], {
    baseUri:"",
    _callback:null,
    request:function(type, callback){

      this._callback = callback;

      var requestUri = this.baseUri + "/" + type;
      var requestGroups = esriRequest({
        url:requestUri,
        content:{f:"json"}
      });

      requestGroups.then(lang.hitch(this, this._response), this._error);
    },
    _response:function(response){
      var groups = response;
      this._callback(null, groups);
    },
    _error:function(error){
      this._callback(error, null);
    }
  });
});
