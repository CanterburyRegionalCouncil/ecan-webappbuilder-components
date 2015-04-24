define([
	'dojo/_base/declare',
	'dojo/_base/array',
	'dojo/_base/lang',
	'dojo/query',
	'dojo/dom-construct',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'./js/MapGallerySearch',
	'./../Pagination/widget',
	'./../ItemThumbMap/Widget',
	'./../ItemThumbApp/Widget',
	'dojo/text!./template/widget.html',
	],function(declare, arrayUtil, lang, query, domConstruct, _WidgetBase, _TemplatedMixin, MapGallerySearch, Pagination, MapThumb, AppThumb, widgetTemplate){
	
		return declare('ResultsWidget', [_WidgetBase, _TemplatedMixin, MapGallerySearch],{
			templateString:widgetTemplate,
			map:null, 
			_webMaps:[],
			_pagination:null,
			pageSize:0,
			page:1,
			updatePagination:true,
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
				
				if(this.updatePagination){
					this._configurePagination(results.TotalHits);
				}
			},
			_configurePagination:function(totalHits){
				
				var pagination = new Pagination();
				pagination.totalResults = totalHits;
				pagination.resultsPerPage = this.pageSize;
				pagination.currentPage = this.page;
				pagination.pagesPerSide = 1;
				pagination.placeAt(this.domNode, "last");
				pagination.on("page", lang.hitch(this, this._changePage));
				
			},
			_displayThumbs:function(webItems){
				arrayUtil.forEach(webItems, lang.hitch(this, this._displayThumb));
			},
			_displayThumb:function(webItem){
				
				var itemThumb = null;
				
				if(webItem.Type == "Web Mapping Application"){
					itemThumb = new AppThumb(this.mapItemUrls, webItem);
				}else{ //Else it is a web map
					itemThumb = new MapThumb(this.mapItemUrls, webItem);
					itemThumb.map = this.map;
				}
				
				itemThumb.placeAt(this._resultsContainer, 'last');
			},
			_changePage:function(/*Event*/ e){
				this._removeAllThumbs();
				this.page = e.selectedPage;
				this.updatePagination = false;
				this.requestSearchResults();
			},
			_removeAllThumbs:function(){
				query('.thumbnail').forEach(domConstruct.destroy);
			}
		});

	}
);