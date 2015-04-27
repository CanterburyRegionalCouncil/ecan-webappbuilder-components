define([
		'dojo/_base/declare',
		'dojo/dom',
		'dojo/dom-class',
		'dojo/_base/array',
		'dojo/_base/lang',
	], function(declare, dom, domClass, arrayUtil, lang){

		return declare('ViewController', [], {
		
			views:[],
			_focusView:null,
			_focusCSSClass:"view-stack-focus",
			focusView:function(view){
				this._hideAllViews();
				domClass.add(view, this._focusCSSClass);
				this._focusView = view;
			},
			_hideAllViews:function(){
				arrayUtil.forEach(this._views, lang.hitch(this, function(view){
					domClass.remove(view, this._focusCSSClass);
				}));
			}
		});
	}
);