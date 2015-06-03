define([
		'dojo/_base/declare',
		'dojo/dom-class',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../Result/widget',
	], function(declare, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate, ResultsWidget){
		return declare('HomeWidget', [_WidgetBase, _TemplatedMixin], {
			templateString:widgetTemplate,
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			description:"", 
			geometryService:null,
			_resultsWidgetAll:null,
			startup:function(){
				this.inherited(arguments);
				
				this.searchDescriptionNode.textContent = this.description;
				
				this._resultsWidgetAll = new ResultsWidget();
				this._resultsWidgetAll.baseUri = this.baseUri;
				this._resultsWidgetAll.pageSize = this.pageSize;
				this._resultsWidgetAll.mapItemUrls = this.mapItemUrls;
				this._resultsWidgetAll.map = this.map;
				this._resultsWidgetAll.geometryService = this.geometryService;
				this._resultsWidgetAll.placeAt(this.searchItemsNode, "last");
				this._resultsWidgetAll.searchMapsAndApps();
				
				this._resultsWidget = new ResultsWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.geometryService = this.geometryService;
				this._resultsWidget.isFreeText = true;
				this._resultsWidget.placeAt(this.searchResultsNode);
			},
			searchText:function(/* Event */ e){
				
				e.preventDefault();
				
				var searchText = this.searchInputNode.value;
				
				if(searchText){
					this._resultsWidget.clearResults();
					this._resultsWidget.updatePagination = true;
					this._resultsWidget.searchText = searchText;
					this._resultsWidget.searchMapsAndApps();
					
					this._showResults();
				}
			},
			searchByCategory:function(/* Event */ e){
				e.preventDefault();
				this.onShowPanelEvent("Category");
			},
			searchByOrganisation:function(/* Event */ e){
				e.preventDefault();
				this.onShowPanelEvent("Organisation");
			},
			searchByTag:function(/* Event */ e){
				e.preventDefault();
				this.onShowPanelEvent("Tags");
			},
			_showItemsClick:function(/*Event*/ e){
				e.preventDefault();
				this._resultsWidget.clearResults();
				this._showItems();
			},
			_showItems:function(){
				domClass.remove(this.searchItemsNode, 'hide');
				domClass.add(this.searchResultsNode, 'hide');
			},
			_showResults:function(){
				domClass.add(this.searchItemsNode, 'hide');
				domClass.remove(this.searchResultsNode, 'hide');
			},
			resize:function(){
				this._resultsWidgetAll.resize();
				this._resultsWidget.resize();
			},
			onShowPanelEvent:function(){}
		});
	}
);