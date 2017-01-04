//Temporary Hide
define(['jquery', 'AX', 'MobileDetect'], function($, AX, MobileDetect){
	'use strict';
	var log = AX.Util.log;
	var TemporaryHide = AX.Base.extend({
		defaults: {
			jsonURL: ''
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			this.getJSON();
		},
		getJSON: function(){
			var self = this;
			var sRequestUrl = this.get('jsonURL');
			$.ajax({
				type: "GET",
				url: sRequestUrl,
				dataType: 'json'
			}).done(function(oData) {
				var aHideElement = oData['rules'];
				self.hideElements(aHideElement);
			}).fail(function($XHR, sTextStatus) {
				log(sTextStatus);
				log('Temporary Hide:', 'Can not load the JSON or parser error.');
			});			
		},
		hideElements: function(aHideElement){
			if(aHideElement.length === 0){
				return;
			}
			$.each(aHideElement, function(nIndex, oElement) {
				var o$Selector = $(this[0]);
				var sClass = this[1];
				if(sClass==='del-xs'){
					var oMobileDetect = new MobileDetect(window.navigator.userAgent);
					if(oMobileDetect.is('iPhone')){
						o$Selector.remove();	
					}else{
						o$Selector.prop("disabled", true);
						o$Selector.addClass(sClass);
					}				
				}else{
					o$Selector.addClass(sClass);
				}
				
			});			
		}
	});
	return TemporaryHide;
});