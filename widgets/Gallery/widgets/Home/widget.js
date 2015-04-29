define([
		'dojo/_base/declare',
		'dojo/query',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../Result/widget',
	], function(declare, query, _WidgetBase, _TemplatedMixin, widgetTemplate, ResultsWidget){
		return declare('HomeWidget', [_WidgetBase, _TemplatedMixin], {
			templateString:widgetTemplate,
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			_container:null,
			_searchInput:null,
			_resultsWidgetAll:null,
			startup:function(){
				this.inherited(arguments);
				
				this._container = query('.search-items', this.domNode)[0]; //Only one so grab the first
				this._searchInput = query('.form-control', this.domNode)[0]; //Only one so grab the first
				
				this._resultsWidgetAll = new ResultsWidget();
				this._resultsWidgetAll.baseUri = this.baseUri;
				this._resultsWidgetAll.pageSize = this.pageSize;
				this._resultsWidgetAll.mapItemUrls = this.mapItemUrls;
				this._resultsWidgetAll.map = this.map;
				this._resultsWidgetAll.placeAt(this._container, "last");
				this._resultsWidgetAll.allMapsAndApps();
				
				var resultContainer = query('.search-result-container', this.domNode)[0]; //Only one so grab the first
				this._resultsWidget = new ResultsWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.placeAt(resultContainer);
			},
			searchText:function(/* Event */ e){
				
				e.preventDefault();
				
				var searchText = this._searchInput.value;
				
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
				alert("Not yet implemented");
			},
			searchByTag:function(/* Event */ e){
				e.preventDefault();
				alert("Not yet implemented");
			},
			_showItemsClick:function(/*Event*/ e){
				e.preventDefault();
				this._showItems();
			},
			_showItems:function(){
				query('.search-items', this.domNode).removeClass('hide');
				query('.search-results', this.domNode).addClass('hide');
			},
			_showResults:function(){
				query('.search-items', this.domNode).addClass('hide');
				query('.search-results', this.domNode).removeClass('hide');
			},
			resize:function(){
				this._resultsWidgetAll.resize();
			},
			onShowPanelEvent:function(){}
		});
	}
);