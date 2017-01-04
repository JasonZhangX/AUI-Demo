require(['Common', 'Banner', 'StorageByURL'], function(Common, Banner, StorageByURL){
	Common.init();
	Banner.init();
	var oStorageByURL = new StorageByURL();
    oStorageByURL.init();
});