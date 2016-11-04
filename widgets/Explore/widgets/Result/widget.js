define([
	'dojo/_base/declare',
	// 'dojo/_base/array',
	// 'dojo/_base/lang',
	// 'dojo/query',
	// 'dojo/dom-construct',
	// 'dojo/dom-geometry',
	// 'dojo/dom-class',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	//'./../Pagination/widget',
	'dojo/text!./widget.html',
	// "dojox/mobile",
  // "dojox/mobile/parser",
],//function(declare, arrayUtil, lang, query, domConstruct, domGeom, domClass, _WidgetBase, _TemplatedMixin, Pagination, ItemThumb, widgetTemplate){
function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){

		return declare('ResultsWidget', [_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			map:null,
			_webMaps:[],
			pageSize:0,
			page:1,
			updatePagination:true,
			itemDetailsUrl:null,
			webMaps:null,
			replaceItems:function(items){

				var oldItems = this.galleryResultsContainerNode.children;
				for(var i=oldItems.length-1 ; i>=0 ; i--){
					oldItem = oldItems[i];
					this.galleryResultsContainerNode.removeChild(oldItem);
				}

				this.addItems(items);
			},
			addItems:function(items){
				for(var i = 0; i < items.length; i++){
					item = items[i];
					item.placeAt(this.galleryResultsContainerNode, 'last');
				}
			}
			// showResults:function(response){
			//
			// 	this._removeAllThumbs();
			//
			// 	if(response.TotalCount === 0){
			// 		this._showAlert();
			// 	}
			// 	else{
			// 		this.webMaps = response.Results;
			// 		this._appendThumbs(response.Results);
			// 		this._configurePagination(response.TotalCount);
			// 		this._showResults();
			// 	}
			// },
			// searchResultsRequestResponse:function(results){
			//
			// 	this._removeAllThumbs();
			//
			// 	if(results.TotalHits === 0){
			// 		this._showAlert();
			// 	}
			// 	else{
			// 		this.webMaps = results.WebMaps;
			// 		this._appendThumbs(results.WebMaps);
			// 		this._configurePagination(results.TotalHits);
			// 		this._showResults();
			// 	}
			// },
			// clearResults:function(){
			// 	this.page = 1;
			// 	this.updatePagination = true;
			// 	this._removeExistingPagination();
			// 	this._removeAllThumbs();
			// },
			// _showResults:function(){
			// 	domClass.add(this.alertNode, 'hide');
			// 	domClass.remove(this.galleryResultsContainerNode, 'hide');
			// },
			// _showAlert:function(){
			// 	domClass.remove(this.alertNode, 'hide');
			// 	domClass.add(this.galleryResultsContainerNode, 'hide');
			// 	this._removeExistingPagination();
			// },
			// _configurePagination:function(totalHits){
			//
			// 	if(this.updatePagination){
			//
			// 		this._removeExistingPagination();
			//
			// 		var pagination = new Pagination();
			// 		pagination.totalResults = totalHits;
			// 		pagination.resultsPerPage = this.pageSize;
			// 		pagination.currentPage = this.page;
			// 		pagination.pagesPerSide = 1;
			// 		pagination.placeAt(this.domNode, "last");
			// 		pagination.on("page", lang.hitch(this, this._changePage));
			// 	}
			//
			// },
			// _removeExistingPagination:function(){
			// 	query('.dojoPage', this.domNode).forEach(domConstruct.destroy);
			// },
			// _appendThumbs:function(webItems){
			// 	arrayUtil.forEach(webItems, lang.hitch(this, this._appendThumb));
			// 	this.resize();
			// },
			// _appendThumb:function(webItem){
			//
			// 	var itemThumb = new ItemThumb(this.itemDetailsUrl, webItem);
			// 	itemThumb.map = this.map;
			// 	itemThumb.placeAt(this.galleryResultsContainerNode, 'last');
			//
			// },
			// _changePage:function(/*Event*/ e){
			// 	this._removeAllThumbs();
			// 	this.page = e.selectedPage;
			// 	this.updatePagination = false;
			// 	this.requestSearchResults();
			// },
			// _removeAllThumbs:function(){
			// 	query('.thumbnail', this.domNode).forEach(domConstruct.destroy);
			// },
			// resize:function(){
			// 	var widgetPosition = domGeom.position(this.domNode);
			// 	var nodes = query(".widget-responsive", this.domNode);
			//
			// 	if(widgetPosition.w > 0 && widgetPosition.w < 404){
			// 		nodes.removeClass("widget-size-medium");
			// 	}
			// 	else if(widgetPosition.w > 405){
			// 		nodes.addClass("widget-size-medium");
			// 	}
			// },
			// searchByCategory:function(/* Event */ e){
			// 	e.preventDefault();
			// 	this._appendThumbs(this.webMaps);
			// }
		});

	}
);
