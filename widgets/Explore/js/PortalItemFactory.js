define([
  'dojo/_base/declare',
  './../widgets/GroupItemThumb/Widget',
  './../widgets/AppItemThumb/Widget',
  './../widgets/MapItemThumb/Widget',
],function(declare, GroupThumb, AppThumb, MapThumb){
  return declare("PortalItemFactory",[],{
    constructor:function(groupItemCallback, appItemCallback, mapItemCallback){
      this._groupItemCallback = groupItemCallback;
      this._appItemCallback = appItemCallback;
      this._mapItemCallback = mapItemCallback;
    },
    createItem:function(rawItem){
      var thumb = null;

      if(this._isGroup(rawItem)){
          thumb= new GroupThumb(rawItem, this._groupItemCallback);
      }else {
        if(this._isWebMap(rawItem)){
          thumb= new MapThumb(rawItem, this._mapItemCallback);
        }else{
          thumb = new AppThumb(rawItem, this._appItemCallback);
        }
      }

      return thumb;
    },
    _isGroup:function(item){
      return !item.hasOwnProperty("Url");
    },
    _isWebMap:function(item){
      endIndex = item.Url.length;
      startIndex = endIndex - 4; //to account for {id}
      return item.Url.substring(startIndex, endIndex) === "{id}";
    },
  });
});
