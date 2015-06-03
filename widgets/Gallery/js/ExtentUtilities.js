define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		"dojo/number",
		'esri/SpatialReference'
	], function(declare, lang, number, SpatialReference){
		
		return declare('ExtentUtilities', [], {
			geometryService:null,
			map:null,
			_reprojectExtentToUrlParameters:function(newWKID){
				var outSR = new SpatialReference(newWKID);
				var extent = this.map.extent;
				
				this.geometryService.project([extent], outSR, lang.hitch(this, this._projectResults));
			},
			_projectResults:function(projectedExents){
				var projectedExtent = projectedExents[0]; //Only one so grab the first;
				var extentParameters = this._extentToString(projectedExtent);
				this.projectionStringReady(extentParameters);
			},
			_extentToString:function(extent){
				
				var extentParameters = "";
				extentParameters += extent.xmin + ",";
				extentParameters += extent.ymin + ",";
				extentParameters += extent.xmax + ",";
				extentParameters += extent.ymax + ",";
				extentParameters += extent.spatialReference.wkid;
				
				return extentParameters;
			},
			_currentExtentToURLParameters:function(){
				var extent = this.map.extent;
				
				var extentParameters = "";
				extentParameters += extent.xmin + ",";
				extentParameters += extent.ymin + ",";
				extentParameters += extent.xmax + ",";
				extentParameters += extent.ymax + ",";
				extentParameters += this.map.spatialReference.wkid;
				
				this.projectionStringReady(extentParameters);
			},
			projectionStringReady:function(projectionString){
				//To be overridden;
			}
		});
	}
);