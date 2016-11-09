define([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!./widget.html',
],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){

		return declare('ResultsWidget', [_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			map:null,
			_webMaps:[],
			pageSize:0,
			page:1,
			updatePagination:true,
			itemDetailsUrl:null,
			webMaps:null,
			addItems:function(items){

				var oldItems = this.galleryResultsContainerNode.children;
				for(var i=oldItems.length-1 ; i>=0 ; i--){
					oldItem = oldItems[i];
					this.galleryResultsContainerNode.removeChild(oldItem);
				}

				for(var i = 0; i < items.length; i++){
					item = items[i];
					item.placeAt(this.galleryResultsContainerNode, 'last');
				}
			}
		});
	}
);
