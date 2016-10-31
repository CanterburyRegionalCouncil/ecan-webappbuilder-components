define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/Widget.html',
		'./../../js/ExtentUtilities'
	],function(declare, lang, on, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate, ExtentUtilities){
		return declare('ItemThumbWidget',[_WidgetBase, _TemplatedMixin, ExtentUtilities],{
			templateString:widgetTemplate,
			map:null,
			_urls:null,
			_item:null,
			constructor:function(urls, item){

				this._urls = urls;
				this._item = item;
				this._item.isWebMap = this._isWebMap();

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
				}else{
					domClass.add(this.resultGlyphiconNode, "glyphicon-phone");
				}
			},
			_openAppWithWebMapAtCurrentExtent:function(/*Event*/ e){

				if(this._isSpatialReferenceMatch()){
					this._currentExtentToURLParameters();
				}else{
					var newWKID = this._item.SpatialReferenceWKID;
					this._reprojectExtentToUrlParameters(newWKID);
				}

			},
			projectionStringReady:function(projectionString){
				this.inherited(arguments);

				var url = this._urls.basicUrl;
				url += "?webmap=" + this._item.Id;
				url += "&extent=" + projectionString;

				window.open(url, '_self');

			},_openDetails:function(/*Event*/ e){
				e.preventDefault();

				var url = this._urls.itemDetailsUrl + "?webmap=" + this._item.Id;
				window.open(url, '_blank');
			},
			_isSpatialReferenceMatch:function(){
				return (this.map.spatialReference.wkid === this._item.SpatialReferenceWKID);
			},
			_isWebMap:function(){
				url = this._item.Url;
				endIndex = url.length;
				startIndex = endIndex - 4; //to account for {id}
				console.log(url.substring(startIndex, endIndex));
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
