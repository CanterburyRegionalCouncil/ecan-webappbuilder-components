define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'esri/request'
], function(declare, lang, esriRequest){
  return declare("RetrieveWebMapGroupItems", [], {
    baseUri:"",
    groupID:"",
    count:-1,
    offset:-1,
    _callback:null,
    request:function(callback){

      this._callback = callback;

      var requestUri = this.baseUri + "/WebMapsForGroup";
      requestUri+= "?";
      requestUri += "groupid=" + this.groupID;
      requestUri += "&count=" + this.count;
      requestUri += "&offset=" + this.offset;

      var requestGroups = esriRequest({
        url:requestUri
      });

      requestGroups.then(lang.hitch(this, this._response), this._error);
    },
    _response:function(response){
      var groups = response;
      this.callback(null, groups);
    },
    _error:function(error){
      this.callback(groups, null);
    }
  });
});
