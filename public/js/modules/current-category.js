//Current Category
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var LanguageSwitch = AX.Base.extend({
		defaults: {
			$languageSwitch: $('.language-switch')
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			
		},
		language: function(){
			var sLanguage = $('tags').attr('ms.lang') || '';
			sLanguage = sLanguage.toLowerCase();
			return sLanguage;			
		}
	});
	return LanguageSwitch;
});