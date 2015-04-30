define([
	'dojo/_base/declare',
	'dojo/_base/array',
	'dojo/_base/lang',
	'dojo/query',
	'dojo/dom-construct',
	'dojo/dom-geometry',
	'dojo/dom-class',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'./js/MapGallerySearch',
	'./../Pagination/widget',
	'./../ItemThumbMap/Widget',
	'./../ItemThumbApp/Widget',
	'dojo/text!./template/widget.html',
	],function(declare, arrayUtil, lang, query, domConstruct, domGeom, domClass, _WidgetBase, _TemplatedMixin, MapGallerySearch, Pagination, MapThumb, AppThumb, widgetTemplate){
	
		return declare('ResultsWidget', [_WidgetBase, _TemplatedMixin, MapGallerySearch],{
			templateString:widgetTemplate,
			map:null, 
			_webMaps:[],
			pageSize:0,
			page:1,
			updatePagination:true,
			mapItemUrls:null,
			type:"",
			allMapsAndApps:function(){
				this.requestSearchResults();
			},
			searchMapsAndApps:function(searchText){
				this.requestSearchResults(this.type, searchText);
			},
			searchResultsRequestResponse:function(results){
				
				this._removeAllThumbs();
				
				if(results.TotalHits === 0){
					this._showAlert();
				}				
				else{
					
					this._displayThumbs(results.WebMaps);
					
					if(this.updatePagination){
						this._configurePagination(results.TotalHits);
					}
					
					this._showResults();
				}
			},
			clearResults:function(){
				this.updatePagination = true;
				this._removeAllThumbs();
			},
			_showResults:function(){
				domClass.add(this.alertNode, 'hide');
				domClass.remove(this.galleryResultsContainerNode, 'hide');
			},
			_showAlert:function(){
				domClass.remove(this.alertNode, 'hide');
				domClass.add(this.galleryResultsContainerNode, 'hide');
				this._removePagination();
			},
			_configurePagination:function(totalHits){
				
				this._removePagination();
				
				var pagination = new Pagination();
				pagination.totalResults = totalHits;
				pagination.resultsPerPage = this.pageSize;
				pagination.currentPage = this.page;
				pagination.pagesPerSide = 1;
				pagination.placeAt(this.domNode, "last");
				pagination.on("page", lang.hitch(this, this._changePage));
				
			},
			_removePagination:function(){
				query('.dojoPage', this.domNode).forEach(domConstruct.destroy);
			},
			_displayThumbs:function(webItems){
				arrayUtil.forEach(webItems, lang.hitch(this, this._displayThumb));
				this.resize();
			},
			_displayThumb:function(webItem){
				
				var itemThumb = null;
				
				if(webItem.Type == "Web Mapping Application"){
					itemThumb = new AppThumb(this.mapItemUrls, webItem);
				}else{ //Else it is a web map
					itemThumb = new MapThumb(this.mapItemUrls, webItem);
					itemThumb.map = this.map;
				}
				
				itemThumb.placeAt(this.galleryResultsContainerNode, 'last');
			},
			_changePage:function(/*Event*/ e){
				this._removeAllThumbs();
				this.page = e.selectedPage;
				this.updatePagination = false;
				this.requestSearchResults();
			},
			_removeAllThumbs:function(){
				query('.thumbnail', this.domNode).forEach(domConstruct.destroy);
			},
			resize:function(){
				var widgetPosition = domGeom.position(this.domNode);
				var nodes = query(".widget-responsive", this.domNode);
				
				if(widgetPosition.w > 0 && widgetPosition.w < 404){
					nodes.removeClass("widget-size-medium");
				}
				else if(widgetPosition.w > 405){
					nodes.addClass("widget-size-medium");
				}
			}
		});

	}
);