define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/Evented',
		'esri/request',
	],function(declare, lang, Evented, esriRequest){
	
		return declare('SearchParameters', [Evented], {
			uri:"",
			requestSearchParameters:function(){
				
				var requestSearchParametersHandle = esriRequest({
					url:this.uri,
					content:{ f:"json" }
				});

				requestSearchParametersHandle.then(lang.hitch(this, this._searchParametersRequestResponse), this._searchParametersRequestError);
			},			
			_searchParametersRequestResponse:function(response){
				var categories = response.Categories;
				var organisations = response.Organisations;
				var tags = response.Tags;
				
				this.emit("onCategoriesRetrievedEvent", categories);
				this.emit("onOrganisationsRetrievedEvent", organisations);
				this.emit("onTagsRetrievedEvent", tags);
			},
			_searchParametersRequestError:function(error){
				console.log(error);
			}
		});
	}	
);