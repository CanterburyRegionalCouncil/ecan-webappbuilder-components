define([
		'dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../Result/widget',
	], function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate, ResultWidget){
		return declare('HomeWidget', [_WidgetBase, _TemplatedMixin], {
			templateString:widgetTemplate,
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			_resultsWidget:null,
			startup:function(){
				this.inherited(arguments);
				
				this._resultsWidget = new ResultWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.placeAt(this, "last");
				this._resultsWidget.getAllMapsAndApps();
			},
			searchText:function(/* Event */ e){
				e.preventDefault();
				alert("Not yet implemented");
			},
			searchByCategory:function(/* Event */ e){
				e.preventDefault();
				this.onShowPanelEvent("Category");
			},
			searchByOrganisation:function(/* Event */ e){
				e.preventDefault();
				alert("Not yet implemented");
			},
			searchByTag:function(/* Event */ e){
				e.preventDefault();
				alert("Not yet implemented");
			},
			resize:function(){
				this._resultsWidget.resize();
			},
			onShowPanelEvent:function(){}
		});
	}
);