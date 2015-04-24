define([
		'dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/Widget.html'
	],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){
		return declare('ItemThumbMapWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			_urls:null,
			_webApp:null,
			constructor:function(urls, webApp){
				
				this._urls = urls;
				this._webApp = webApp
				this.set("_imageLink", webApp.Url);
				this.set("_imageSrc", "http://www.arcgis.com/sharing/rest/content/items/" + webApp.Id + "/info/" + webApp.Thumbnail);
				this.set("_imageAlt", webApp.Title);
				this.set("_title", webApp.Title);
				this.set("_snippet", webApp.Snippet);
				this.set("_btnLink", webApp.Url);
				
			},
			_openDetails:function(/*Event*/ e){
				e.preventDefault();
				var url = this._urls.itemDetailsUrl + "?webmap=" + this._webApp.Id
				window.open(url, '_blank');
			},
			
			_imageLink:"",
			_setImageLinkAttr:{node: "resultLinkNode", type: "attribute", attribute: "href" },
			
			_imageSrc:"",
			_setImageSrcAttr:{node: "resultImageNode", type: "attribute", attribute: "src" },
			
			_imageAlt:"",
			_setImageAltAttr:{node: "resultImageNode", type: "attribute", attribute: "alt" },
			
			_title:"",
			_setTitleAttr:{node: "resultTitleNode", type:"innerHTML" },
			
			_snippet:"",
			_setSnippetAttr:{node: "resultSnippedNode", type:"innerHTML" },
			
			_btnLink:"",
			_setBtnLinkAttr:{node: "resultOpenButtonNode", type: "attribute", attribute: "href" }
		});
	
	}
);