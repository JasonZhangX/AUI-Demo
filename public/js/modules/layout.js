define(['jquery', 'AX'], function($, AX) {
	'use strict';
	var log = AX.Util.log;
	var oConfig = {};
	var oDefaults = {
			defaultLayout: {
				column: 3,
				layout: 'col3'
			},
			allClass: 'col-md-2 col-md-8 col-md-10 col-md-12 hidden-all',
			layoutMapping: {
				threeColumn:{
					col1: ['', 'col-md-12', ''],
					col2l: ['col-md-2', 'col-md-10', ''],
					col2r: ['', 'col-md-10', 'col-md-2'],
					col3: ['col-md-2', 'col-md-8', 'col-md-2']					
				},
				twoColumn: {
					col2l: ['col-md-2', 'col-md-10'],
					col2r: ['col-md-10', 'col-md-2'],
					col1l: ['','col-md-12'],
					col1r: ['col-md-12', '']
				}
			},
			hiddenClass: 'hidden-all',
			containerDom: $('.single-page'),
			equalHeight: false
		}
		//Switch layout
	var fSwitchLayout = function(sLayoutName) {
			log('sLayoutName', sLayoutName);
			var sMultipleSelector = $.map(oConfig.allClass.split(' '), function(oElement, nIndex){
				return ('.' + oElement);
			}).join(',');
			var o$ColumnDom = oConfig.containerDom.find('.row').children(sMultipleSelector);
			var nColumnCount = o$ColumnDom.length;
			var aColumnsClass;
			switch(nColumnCount){
				case 3:
				aColumnsClass = oConfig.layoutMapping['threeColumn'][sLayoutName];
				break;
				
				case 2:
				aColumnsClass = oConfig.layoutMapping['twoColumn'][sLayoutName];
				break;
			
				default:
				aColumnsClass = oConfig.layoutMapping['threeColumn'][sLayoutName];
			}
			fRenderClass(o$ColumnDom, aColumnsClass);
			log(o$ColumnDom);
		}

	var fRenderClass = function(o$ColumnDom, aColumnsClass){
		for (var i = 0; i < aColumnsClass.length; i++) {
			if(aColumnsClass[i] === ''){
				o$ColumnDom.eq(i).removeClass(oConfig.allClass).addClass(oConfig.hiddenClass);
			}else{
				o$ColumnDom.eq(i).removeClass(oConfig.allClass).addClass(aColumnsClass[i]);
			}
		}		
	}
	
		//Initialization
	var fInit = function(oCustomConfig) {
		oConfig = $.extend({}, oDefaults, oCustomConfig);
	}
	return {
		init: fInit,
		switchLayout: fSwitchLayout
	}
});