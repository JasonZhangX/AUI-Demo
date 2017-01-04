//Responsive table
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var oStorage = AX.Storage;
	var StorageByURL = AX.Base.extend({
		defaults: {
			//storage name
			storageName: 'azure-local-data'
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			var sLocalStorageName = this.get('storageName');
			var aLocalData = oStorage.get(sLocalStorageName);
			if(!aLocalData){
				this.set('localData', []);
			}else{
				this.set('localData', aLocalData);
			}
		},
		//Current URL
		hasData: function(){
			var sLocalStorageName = this.get('storageName');
			var sCurrentURL = window.location.pathname;
			var bHasData = false;
			$.each(oStorage.get(sLocalStorageName), function(){
				if(this == sCurrentURL){
					bHasData = true;
					return false;
				}
			});
			return bHasData;
		},
		//Save data to localstorage
		save: function(){
			var sCurrentURL = window.location.pathname;
			var sLocalStorageName = this.get('storageName');
			if(!this.hasData()){
				this.get('localData').push(sCurrentURL);
				oStorage.set(sLocalStorageName, this.get('localData'));				
			}
		}
	});
	return StorageByURL;
});