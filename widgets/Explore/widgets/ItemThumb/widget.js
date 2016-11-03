define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/Widget.html',
	],function(declare, lang, on, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate){
		return declare('ItemThumbWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			map:null,
			_item:null,
			constructor:function(urls, item){

				this._item = item;
				this._item.isWebMap = this._isWebMap();
				this._urls = urls;

				this.set("_imageSrc", "http://www.arcgis.com/sharing/rest/content/items/" + item.Id + "/info/" + item.ThumbnailUrl);
				this.set("_imageAlt", item.Title);
				this.set("_title", item.Title);
				this.set("_snippet", item.Snippet);

				if(item.isWebMap){
					this.set("_imageLink", "#");
					this.set("_btnLink", "#");
					this.set("_btnTarget", "_self");
				}else{
					this.set("_imageLink", item.Url);
					this.set("_btnLink", item.Url);
					this.set("_btnTarget", "_blank");
				}
			},
			startup:function(){
				this.inherited(arguments);

				if(this._item.isWebMap){
					domClass.add(this.resultGlyphiconNode, "glyphicon-globe");
					on(this.resultOpenButtonNode, "click", lang.hitch(this, this._openAppWithWebMapAtCurrentExtent));
					on(this.resultImageNode, "click", lang.hitch(this, this._openAppWithWebMapAtCurrentExtent));
				}else{
					domClass.add(this.resultGlyphiconNode, "glyphicon-phone");
				}
			},
			_openAppWithWebMapAtCurrentExtent:function(/*Event*/ e){
					e.preventDefault();
					
					var exent = "";
					exent += this.map.extent.xmin + ",";
					exent += this.map.extent.ymin + ",";
					exent += this.map.extent.xmax + ",";
					exent += this.map.extent.ymax + ",";
					exent += this.map.extent.spatialReference.wkid;

					var url = this._item.Url.replace("{id}", this._item.Id);
					url += "&extent=" + exent;

					window.open(url, '_self');

			},_openDetails:function(/*Event*/ e){
				e.preventDefault();

				var url = this._urls.itemDetailsUrl + "?webmap=" + this._item.Id;
				window.open(url, '_blank');
			},
			_isWebMap:function(){
				url = this._item.Url;
				endIndex = url.length;
				startIndex = endIndex - 4; //to account for {id}
				return url.substring(startIndex, endIndex) === "{id}";
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
			_setBtnLinkAttr:{node: "resultOpenButtonNode", type: "attribute", attribute: "href" },

			_btnTarget:"",
			_setBtnTargetAttr:{node: "resultOpenButtonNode", type: "attribute", attribute: "target" }
		});

	}
);
