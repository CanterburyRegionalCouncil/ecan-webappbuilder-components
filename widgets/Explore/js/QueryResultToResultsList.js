define([
  'dojo/_base/declare',
],function(declare, PortalItemFactory){
  return declare("QueryResultToResultsList",[],{
    _portalItemFactory:null,
    _resultsList:[],
    constructor:function(portalItemFactory){
      this._portalItemFactory = portalItemFactory;
    },
    addToResultsList:function(queryResult){

      this._resultsList = [];
      
      for(var i = 0; i < queryResult.length; i++){
        rawItem = queryResult[i];
        item = this._portalItemFactory.createItem(rawItem);
        this._resultsList.push(item);
      }

      return this._resultsList;
    }
  });
});
