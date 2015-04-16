define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/Evented',
		'esri/request',
	],function(declare, lang, Evented, esriRequest){
	
		return declare('PortalSearch', [Evented], {
			_uriBase:"",
			pageSize:10,
			orderBy:"MostRecent",
			
			constructor:function(uriBase){
				this._uriBase = uriBase;
			},
			requestSearchLinks:function(){
				var requestUri = this._uriBase + "/TagData";
				
				var requestSearchLinksHandle = esriRequest({
					url:requestUri,
					content:{ f:"json" }
				});

				requestSearchLinksHandle.then(lang.hitch(this, this._searchLinksRequestResponse), this._searchLinksRequestError);
			},			
			_searchLinksRequestResponse:function(response){
				var categories = response.Categories;
				var organisations = response.Organisations;
				var tags = response.Tags;
				
				this.emit("onCategoriesRetrievedEvent", categories);
				this.emit("onOrganisationsRetrievedEvent", organisations);
				this.emit("onTagsRetrievedEvent", tags);
			},
			_searchLinksRequestError:function(error){
				console.log(error);
				//todo: add better error messaging
			},
			searchCategory:function(category){
				var searchParameters = "category=" + category.Title;
				this._requestSearchResults(searchParameters);
			},
			_requestSearchResults:function(searchParameters){
				
				var requestUri = this._uriBase + "?";
				requestUri += searchParameters;
				requestUri += "PageSize=" + this.pageSize;
				requestUri += "page=1";
				requestUri += "OrderBy" + this.orderBy;
				
				var requestSearchResults = esriRequest({
					url:requestUri,
					content:{f:"json"}
				});
				
				requestSearchLinksHandle.then(lang.hitch(this, this._searchResultsRequestResponse), this._searchResultsRequestError);
			},
			_searchResultsRequestResponse:function(results){
				this.emit("onSearchResultsRetreived", results);
			},
			_searchResultsRequestError:function(error){
				console.log(error);
				//todo: add better error messaging
			}
		});
	}	
);