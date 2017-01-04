//AJAX Form
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var AJAXForm = AX.Base.extend({
		defaults: {
            $form : null,
            sLoaderHTML: ['<div class="loader">',
                            '<i class="circle"></i>',
                            '<i class="circle"></i>',
                            '<i class="circle"></i>',
                            '<i class="circle"></i>',
                            '<i class="circle"></i>',
                        '</div>'].join('')
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			var o$form = this.get('$form');
			if(o$form === null){
				return;
			}
            //this.set('o$AllInputField', o$form.find('input, textarea, select').not(':input[type=button], :input[type=submit], :input[type=reset]'));
            this.set('$FormInfo', o$form.parent('.form-container').find('.form-info'));
            this.set('oFormConfig', o$form.data('config'));
            this.render();
            this.bind();
		},
        submit: function(){
            var self = this;
            var o$Form = this.get('$form');
            
            $.ajax({
                type: o$Form.attr('method'),
                url: o$Form.attr('action'),
                dataType: 'json',
                data: o$Form.serialize(),
                beforeSend: function(){
                    self.loader(true); 
                    self.get('$form').find('.form-action').find('input[type="submit"]').prop('disabled', true).addClass('loading');
                    self.beforeSend();
                }
            }).done(function(oData){
                self.loader(false);    
                self.get('$form').find('.form-action').find('input[type="submit"]').prop('disabled', false).removeClass('loading');
                self.success(oData);
                self.completeCall();
            }).fail(function(){
                self.loader(false);   
                self.get('$form').find('.form-action').find('input[type="submit"]').prop('disabled', false).removeClass('loading'); 
                self.fail();
                self.completeCall();
            });
        },
        beforeSend: function(){
           
        },
        completeCall: function(){

        },
        success: function(oData){
            this.successCall && this.successCall();
            var sSuccessMessage = this.get('oFormConfig')['SuccessMessage'];
            this.get('$FormInfo').empty().append($('<p>' + sSuccessMessage + '</p>'));
            this.get('$FormInfo').removeClass('error').addClass('success');
            log(oData);
        },
        successCall: function(){
           
        },
        fail: function(){
            var sFailedMessage = this.get('oFormConfig')['FailMessage'];
            this.get('$FormInfo').empty().append($('<p>' + sFailedMessage + '</p>'));
            this.get('$FormInfo').removeClass('success').addClass('error');
        },
        bind: function () {
            var self = this;
            this.get('$form').on('submit.AJAXForm', function(){
                self.submit();
                return false;
            })
        },
        render: function(){
            var self = this;
            this.get('$form').find('.form-action .btn-wrapper').append($(self.get('sLoaderHTML')).hide());
        },
        loader: function(bSwitch){
            if(bSwitch){
                this.get('$form').find('.form-action .btn-wrapper').find('.loader').show();
            }else{
                this.get('$form').find('.form-action .btn-wrapper').find('.loader').hide();
            }
        }
	});
	return AJAXForm;
});