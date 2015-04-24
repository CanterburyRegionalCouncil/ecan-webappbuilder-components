define([
	'dojo/_base/declare',
	'dojo/_base/array',
	'dojo/_base/lang',
	'dojo/query',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'./js/MapGallerySearch',
	'./../Pagination/widget',
	'./../ItemThumbMap/Widget',
	'./../ItemThumbApp/Widget',
	'dojo/text!./template/widget.html',
	],function(declare, arrayUtil, lang, query, _WidgetBase, _TemplatedMixin, MapGallerySearch, Pagination, MapThumb, AppThumb, widgetTemplate){
	
		return declare('ResultsWidget', [_WidgetBase, _TemplatedMixin, MapGallerySearch],{
			templateString:widgetTemplate,
			_webMaps:[],
			_pagination:null,
			pageSize:0,
			page:1,
			mapItemUrls:null,
			_resultsContainer:null,
			startup:function(){
				this.inherited(arguments);
				this._resultsContainer = query('.gallery-results-container', this.domNode)[0];//only one so grab the first
			},
			getAllMapsAndApps:function(){
				this.requestSearchResults();
			},
			searchResultsRequestResponse:function(results){
				this._displayThumbs(results.WebMaps);
				this._configurePagination(results.TotalHits);
			},
			_configurePagination:function(totalHits){
				
				var pagination = new Pagination();
				pagination.totalResults = totalHits;
				pagination.resultsPerPage = this.pageSize;
				pagination.currentPage = this.page;
				pagination.pagesPerSide = 1;
				pagination.placeAt(this.domNode, "last");
				pagination.on("page", lang.hitch(this, this._updateDisplayThumbs));
				
			},
			_displayThumbs:function(webItems){
				arrayUtil.forEach(webItems, lang.hitch(this, this._displayThumb));
			},
			_displayThumb:function(webItem){
				
				var itemThumb = null;
				
				if(webItem.Type == "Web Mapping Application"){
					itemThumb = new AppThumb(this.mapItemUrls, webItem);
				}else{
					itemThumb = new MapThumb(this.mapItemUrls, webItem);
				}
			
				itemThumb.placeAt(this._resultsContainer, 'last');
			},
			_updateDisplayThumbs:function(/*Event*/ e){
				console.log("Need to update the thumbs to show page " + e);
			}
		});

	}
);