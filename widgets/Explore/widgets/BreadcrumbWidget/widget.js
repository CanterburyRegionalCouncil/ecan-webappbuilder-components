define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./widget.html',
],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){
  return declare("BreadcrumbWidget", [_WidgetBase, _TemplatedMixin], {
    templateString:widgetTemplate,
    _homeCallback:null,
    _trailCallback:null,
    constructor:function(homeCallback){
      this._homeCallback = homeCallback;
    },
    addWebMapGroupTitle:function(trailLabel){
      this._WebMapGroupsTitle.textContent = trailLabel;
    },
    addResults:function(trailCallback){
      this._trailCallback = trailCallback;
    },
    clearTrail:function(){
      this._WebMapGroupsTitle.textContent = "";
      this._trailCallback = null;
    },
    _homeClick:function(e){
      e.preventDefault();
      this._homeCallback(null, e);
    },
    _WebMapGroupsClick:function(e){
      e.preventDefault();

      if(this._trailCallback){
        this._trailCallback(null, e);
      }
    },
  });
});
