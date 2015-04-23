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
				
			},
			_displayThumbs:function(){
				
			},
			_updateDisplayThumbs:function(/*Event*/ e){
				console.log("Need to update the thumbs to show page " + e);
			}
		});

	}
);