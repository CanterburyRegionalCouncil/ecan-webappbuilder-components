define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./widget.html',
],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){
  return declare('SearchWidget',[_WidgetBase, _TemplatedMixin],{
    templateString:widgetTemplate,
    _searchTextCallback:null,
    constructor:function(options){
      this._searchTextCallback = options.searchTextCallback;
      this._searchByCategoryCallback = options.searchByCategoryCallback;
      this._searchByOrganisationCallback = options.searchByOrganisationCallback;
    },
    searchText:function(/* Event */ e){
      this._searchTextCallback(null, this.searchInputNode.value);
    },
    searchByCategory:function(/* Event */ e){
      this._searchByCategoryCallback(null, true);
    },
    searchByOrganisation:function(/* Event */ e){
      this._searchByOrganisationCallback(null, true);
    }
  });
});
