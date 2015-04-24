define([
		'dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/Widget.html'
	],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){
		return declare('ItemThumbMapWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			_urls:null,
			_webMap:null,
			constructor:function(urls, webMap){
				
				this._urls = urls;
				this._webMap = webMap;
				
				this.set("_imageSrc", "http://www.arcgis.com/sharing/rest/content/items/" + webMap.Id + "/info/" + webMap.Thumbnail);
				this.set("_imageAlt", webMap.Title);
				this.set("_title", webMap.Title);
				this.set("_snippet", webMap.Snippet);
				
				/*this.set("_imageLink", urls.basicUrl + "?webmap=" + webMap.Id);
				this.set("_basicUrl", urls.basicUrl + "?webmap=" + webMap.Id);
				this.set("_advancedUrl", urls.advancedUrl + "?webmap=" + webMap.Id);				
				this.set("_agolUrl", urls.viewerAGOLUrl + "?webmap=" + webMap.Id);*/
				
			},
			_openBasicViewer:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.basicUrl + "?webmap=" + this._webMap.Id;
				window.open(url, '_blank');
			},
			_openAdvancedViewer:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.advancedUrl + "?webmap=" + this._webMap.Id
				window.open(url, '_blank');
			},
			_openAGOLViewer:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.viewerAGOLUrl + "?webmap=" + this._webMap.Id
				window.open(url, '_blank');
			},
			_openDetails:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.itemDetailsUrl + "?webmap=" + this._webMap.Id
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
			
			/*_imageLink:"",
			_setImageLinkAttr:{node: "resultLinkNode", type: "attribute", attribute: "href" },
			
			_basicUrl:"",
			_setBasicUrlAttr:{node: "resultLinkBasicNode", type: "attribute", attribute: "href" },
			
			_advancedUrl:"",
			_setAdvancedUrlAttr:{node: "resultLinkAdvancedNode", type: "attribute", attribute: "href" },
			
			_agolUrl:"",
			_setAgolUrlAttr:{node: "resultLinkAGOLNode", type: "attribute", attribute: "href" },*/
		});
	
	}
);