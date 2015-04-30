define([
		'dojo/_base/declare',
		'dojo/topic',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/Widget.html'
	],function(declare, topic, _WidgetBase, _TemplatedMixin, widgetTemplate){
		return declare('ItemThumbMapWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			map:null, 
			_urls:null,
			_webMap:null,
			constructor:function(urls, webMap){
				
				this._urls = urls;
				this._webMap = webMap;
				this.set("_imageSrc", "http://www.arcgis.com/sharing/rest/content/items/" + webMap.Id + "/info/" + webMap.Thumbnail);
				this.set("_imageAlt", webMap.Title);
				this.set("_title", webMap.Title);
				this.set("_snippet", webMap.Snippet);
				
			},
			_extentArgs:function(){
			
				var extent = this.map.extent;
				
				var xmin = extent.xmin;
				var ymin = extent.ymin;
				var xmax = extent.xmax;
				var ymax = extent.ymax;
				
				var extentArgs = "extent=" + xmin + "," + ymin  + "," + xmax + "," + ymax + ",2193";
				
				return extentArgs;
			},
			_openBasicViewer:function(/*Event*/ e){
				e.preventDefault();
				
				var url = this._urls.basicUrl + "?webmap=" + this._webMap.Id + "&" + this._extentArgs(); //may need wkid if not nztm	
				window.open(url, '_blank');
			},
			_openAdvancedViewer:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.advancedUrl + "?webmap=" + this._webMap.Id;
				window.open(url, '_blank');
			},
			_openAGOLViewer:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.viewerAGOLUrl + "?webmap=" + this._webMap.Id;
				window.open(url, '_blank');
			},
			_openDetails:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.itemDetailsUrl + "?webmap=" + this._webMap.Id;
				window.open(url, '_blank');
			},
			
			_imageSrc:"",
			_setImageSrcAttr:{node: "resultImageNode", type: "attribute", attribute: "src" },
			
			_imageAlt:"",
			_setImageAltAttr:{node: "resultImageNode", type: "attribute", attribute: "alt" },
			
			_title:"",
			_setTitleAttr:{node: "resultTitleNode", type:"innerHTML" },
			
			_snippet:"",
			_setSnippetAttr:{node: "resultSnippedNode", type:"innerHTML" },
		});
	
	}
);