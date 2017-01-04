//Language switch
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var LanguageSwitch = AX.Base.extend({
		defaults: {
			defaultLang: 'cn',
			$languageSwitch: $('.language-switch'),
			languageCategory: ['cn','en']
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			this.getLanguage();
		},
		getLanguage: function(){
			var self = this;
			var sLanguage = $('tags').attr('ms.lang') || '';			
			if(sLanguage){
				sLanguage = sLanguage.toLowerCase();
			}else{
				var o$LangSwitch = this.get('$languageSwitch');
				if(o$LangSwitch.length >　0){
					o$LangSwitch.find('li').each(function(nLi){
						if($(this).hasClass('active')){
							sLanguage = self.get('languageCategory')[nLi];		
						}
					});				
				}else{
					sLanguage =	this.get('defaultLang');
				}
			}			
			this.set('language', sLanguage);			
		},
		language: function(){
			return this.get('language');
		}
	});
	var oLanguage = new LanguageSwitch();
	return oLanguage;
});