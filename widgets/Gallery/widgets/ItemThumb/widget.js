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
				
				this.set("_imageSrc", "http://www.arcgis.com/sharing/rest/content/items/" + item.Id + "/info/" + item.Thumbnail);
				this.set("_imageAlt", item.Title);
				this.set("_title", item.Title);
				this.set("_snippet", item.Snippet);
				
				if(item.Type == "Web Mapping Application"){
					this.set("_imageLink", item.Url);
					this.set("_btnLink", item.Url);
					this.set("_btnTarget", "_blank");
				}else if(item.Type == "Web Map"){
					this.set("_imageLink", "#");
					this.set("_btnLink", "#"); 
					this.set("_btnTarget", "_self");
				}
			},
			startup:function(){
				this.inherited(arguments);
				
				if(this._item.Type == "Web Mapping Application"){
					domClass.add(this.resultGlyphiconNode, "glyphicon-phone");
				}else if(this._item.Type == "Web Map"){
					domClass.add(this.resultGlyphiconNode, "glyphicon-globe");
					on(this.resultOpenButtonNode, "click", lang.hitch(this, this._openAppWithWebMapAtCurrentExtent));
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