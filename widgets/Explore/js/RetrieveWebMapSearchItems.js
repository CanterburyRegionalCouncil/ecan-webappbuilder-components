define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Evented',
  'esri/request'
], function(declare, lang, Evented, esriRequest){
  return declare("RetrieveWebMapSearchItems", [Evented], {
    baseUri:"",
    groupID:"",
    count:-1,
    offset:-1,
    request:function(){

      var requestUri = this.baseUri + "/WebMapSearch";
      requestUri+= "?";
      requestUri += "query=" + this.query;
      requestUri += "&count=" + this.count;
      requestUri += "&offset=" + this.offset;

      var requestGroups = esriRequest({
        url:requestUri
      });

      requestGroups.then(lang.hitch(this, this._response), this._error);
    },
    _response:function(response){
      var groups = response;
      this.emit("onItemsRetrievedEvent", groups);
    },
    _error:function(error){
      console.log(error);
    }
  });
});
