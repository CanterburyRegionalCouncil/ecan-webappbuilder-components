define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'esri/request'
], function(declare, lang, esriRequest){
  return declare("RetrieveWebMapSearchItems", [], {
    _baseUri:"",
    _pageSize:-1,
    query:"",
    offset:-1,
    _callback:null,
    constructor:function(options){
      this._baseUri = options.baseUri;
      this._pageSize = options.pageSize;
    },
    request:function(callback){

      this._callback = callback;

      var requestUri = this._baseUri + "/WebMapSearch";
      requestUri+= "?";
      requestUri += "query=" + this.query;
      requestUri += "&count=" + this._pageSize;
      requestUri += "&offset=" + this.offset;

      var requestGroups = esriRequest({
        url:requestUri
      });

      requestGroups.then(lang.hitch(this, this._response), this._error);
    },
    _response:function(response){
      var items = response;
      this._callback(null, items);
    },
    _error:function(error){
      this._callback(error, null);
    }
  });
});
