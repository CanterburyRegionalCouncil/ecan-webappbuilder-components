define([
  'dojo/_base/declare',
  'dojo/_base/lang',
], function(declare, lang){
  return declare('InViewport',[],{
    _parent:null,
    _child:null,
    _callback:null,
    constructor:function(parent, child, callback){
      this._parent = parent;
      this._child = child;
      this._callback = callback;

      this._parent.on("scroll", lang.hitch(this, this._isInViewport));
    },
    _isInViewport:function(event){
      console.log("scroll occured");
    }
  });
});
