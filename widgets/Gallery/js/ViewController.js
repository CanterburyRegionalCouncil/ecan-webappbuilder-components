define([
		'dojo/_base/declare',
		'dojo/dom',
		'dojo/dom-class',
		'dojo/_base/array',
		'dojo/_base/lang',
	], function(declare, dom, domClass, arrayUtil, lang){

		return declare('ViewController', [], {
		
			_viewIds:[],
			_focusViewId:null,
			_focusCSSClass:"view-stack-focus",
			configureViews:function(viewIds){				
				this._viewIds = viewIds;
			},
			focusView:function(id){
				this._hideAllViews();
				this._focusViewById(id);
			},
			_hideAllViews:function(){
				arrayUtil.forEach(this._viewIds, lang.hitch(this, function(id){
					domClass.remove(id, this._focusCSSClass);
				}));
			},
			_focusViewById:function(id){
				domClass.add(id, this._focusCSSClass);
				this._focusViewId = id;
			},
			_getViewFromDomById:function(id){
				return dom.byId(id);
			}
		});
	}
);