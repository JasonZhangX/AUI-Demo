define(['jquery', 'AX'], function ($, AX) {
    'use strict';
    var log = AX.Util.log;
    var Validation = AX.Base.extend({
        defaults: {
            $form: null,
            errorClass: 'error',
            errorIconHTML: '<i class="icon icon-wrong"></i>',
            inputFieldClass: '.input-container, .textarea-container',
            messages: {},
            rules: {
                required: function () {
                    return /\S+/;
                },
                maxlength: function (nLength) {
                    return new RegExp('^.{1,' + nLength + '}$', 'g');
                }
            }
        },
        init: function (oConfig) {
            this._config = $.extend({}, this.defaults, oConfig);
            var o$form = this.get('$form');
            if (o$form === null) {
                return;
            }
            o$form.attr('novalidate', 'novalidate');
            this.set('o$AllInputField', o$form.find('input, textarea, select').not(':input[type=button], :input[type=submit], :input[type=reset]'));
            this.set('passed', false);
            this.bind();
        },
        getInputRule: function (o$input) {
            var oTemp = {};
            if(o$input.prop('required')){
                oTemp['required'] = true;
            }  
            if(o$input.attr('maxlength')){
                oTemp['maxlength'] = o$input.prop('maxlength');
            }
            if(o$input.attr('pattern')){
                oTemp['pattern'] = o$input.prop('pattern');
            }      
            return oTemp;
        },
        error: function(o$input){
            var self = this;
            o$input.parent(self.get('inputFieldClass')).append(self.get('errorIconHTML')).addClass(self.get('errorClass'));
        },
        validate: function (o$input) {
            var oAttributes = this.getInputRule(o$input);
            if($.isEmptyObject(oAttributes)){
                return;
            }
            var sValue = o$input.val();
            var oRegRules = this.get('rules');
            var self = this;
            log('oAttributes', oAttributes);
            
            $.each(oAttributes, function(sKey, oValue){
                //required
                if(sKey === 'required' && oAttributes[sKey] === true &&  !oRegRules.required().test(sValue)){
                    self.error(o$input);
                    return false;
                }
                //maxlength
                if(sKey === 'maxlength' && !oRegRules.maxlength(oAttributes[sKey]).test(sValue)){
                    self.error(o$input);
                    return false;
                }
                //pattern  
                if(sKey === 'pattern'){
                    var rRegExp = new RegExp(oAttributes[sKey]);
                    if(!rRegExp.test(sValue)){
                        self.error(o$input);
                        return false; 
                    }                   
                }
                //self.reset(o$input);
            });              
        },
        resetAll: function(){
            var self = this;
            this.get('$form').find(self.get('inputFieldClass')).each(function(){
                $(this).removeClass(self.get('errorClass'));
                $(this).find('.icon').remove();
            });  
        },
        reset: function(o$input){
            var self = this;
            o$input.parent(self.get('inputFieldClass')).removeClass(self.get('errorClass')).find('.icon').remove();
        },
        disable: function(o$input){
            if(!o$input.prop('disabled')){
                o$input.prop('disabled', true);
            }          
        },
        disableAll: function(){
            var self = this;
            this.get('o$AllInputField').each(function(){
                self.disable($(this));            
            });        
        },
        enable: function(o$input){
            if(o$input.prop('disabled')){
                o$input.prop('disabled', false);
            }          
        },
        enableAll: function(){
            var self = this;
            this.get('o$AllInputField').each(function(){
                self.enable($(this));       
            });      
        },
        render: function(){
            var self = this;
            this.get('o$AllInputField').each(function(){
               self.validate($(this));
            });
        },
        status: function(){
            var self = this;
            var bMark = true;
            this.get('o$AllInputField').each(function(){
                if($(this).parent(self.get('inputFieldClass')).hasClass(self.get('errorClass'))){
                    bMark = false;
                    return bMark;
                }
            });
            this.set('passed', bMark); 
        },
        submitHandle: function () {
            log('Validation Form Handle', 'Submit');
        },
        bind: function(){
            var self = this;
            this.get('$form').find(':input[type=submit]').on('click.Validation', function(){
                self.resetAll();
                self.render();
                self.status();
                if(self.get('passed')){
                    self.submitHandle();
                }
                return self.get('passed');
            })
            this.get('o$AllInputField').each(function(){
                $(this).on('focus.Validation', function(){
                    log('change');
                    self.reset($(this));
                })
            });
        }
    });
    return Validation;
});