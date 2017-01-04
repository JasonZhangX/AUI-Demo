//Responsive table
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var Table = AX.Base.extend({
		defaults: {
			$table: null,
			scrollClass: 'scroll-table',
			$wrapper: null
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			var o$table = this.get('$table');
			if(o$table === null){
				return;
			}
			//log('table', o$table);
			this.bind();
			this.render();
		},
		update: function(e){
			var self = e.data;
			var nTableWidth = self.get('$table').outerWidth();
			var nTabbleWrapperWidth = self.get('$wrapper').outerWidth();
			if(nTableWidth > nTabbleWrapperWidth){
				self.get('$wrapper').addClass('has-scroll');
			}else{
				self.get('$wrapper').removeClass('has-scroll');
			}
		},
		bind: function(){
			var self = this;
			$(window).on('resize.table', '', self, self.update);
		}, 
		render: function(){
			var sWrapperClass = this.get('scrollClass');
			var o$table = this.get('$table');
			var $scrollWrapper = $('<div/>', {
				class: sWrapperClass,
				html: '<div/>'
			});
			this.set('$wrapper', $scrollWrapper);
			$scrollWrapper.insertBefore(o$table)
			o$table.appendTo($scrollWrapper.find('div'));
			var nTableWidth = this.get('$table').outerWidth();
			var nTabbleWrapperWidth = this.get('$wrapper').outerWidth();
			if(nTableWidth > nTabbleWrapperWidth){
				this.get('$wrapper').addClass('has-scroll');
			}			
		}
	});
	return Table;
});