define([
	'dojo/_base/declare',
	'dojo/_base/array',
	'dojo/_base/lang',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'./../../js/MapGallerySearch',
	'./../Pagination/widget',
	'dojo/text!./template/widget.html'
	],function(declare, arrayUtil, lang, _WidgetBase, _TemplatedMixin, MapGallerySearch, Pagination, widgetTemplate){
	
		return declare('ResultsWidget', [_WidgetBase, _TemplatedMixin, MapGallerySearch],{
			templateString:widgetTemplate,
			_webMaps:[],
			_pagination:null,
			pageSize:0,
			page:1,
			startup:function(){
				this.inherited(arguments);
			},
			getAllMapsAndApps:function(){
				this.requestSearchResults();
			},
			searchResultsRequestResponse:function(results){
				this._webMaps = results.WebMaps;
				this._displayThumbs();
				
				var pagination = new Pagination();
				pagination.totalResults = results.TotalHits;
				pagination.resultsPerPage = this.pageSize;
				pagination.currentPage = this.page;
				pagination.pagesPerSide = 1;
				pagination.placeAt(this.domNode, "last");
				pagination.on("page", lang.hitch(this, this._updateDisplayThumbs));
			},
			_displayThumbs:function(){
				
			},
			_updateDisplayThumbs:function(/*Event*/ e){
				console.log("Need to update the thumbs to show page " + e);
			}
		});

	}
);