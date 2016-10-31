define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Evented',
  'esri/request'
], function(declare, lang, Evented, esriRequest){
  return declare("RetrieveWebMapGroups", [Evented], {
    baseUri:"",
    type:"",
    request:function(){

      var requestUri = this.baseUri + "/" + this.type;
      var requestGroups = esriRequest({
        url:requestUri,
        content:{f:"json"}
      });

      requestGroups.then(lang.hitch(this, this._response), this._error);
    },
    _response:function(response){
      var groups = response;
      this.emit("onGroupsRetrievedEvent", groups);
    },
    _error:function(error){
      console.log(error);
    }
  });
});
