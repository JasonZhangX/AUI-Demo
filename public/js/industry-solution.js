require(['Common', 'Banner', 'Validation', 'AJAXForm'], function(Common, Banner, Validation, AJAXForm){
	Common.init();
	Banner.init();

	var oAJAXForm = new AJAXForm();
	var oValidation = new Validation();
	oValidation.init({
		$form: $('.form-content')
	});
	oAJAXForm.init({
		$form: $('.ajax-form')
	});
	oAJAXForm.beforeSend = function(){
		oValidation.disableAll();
	};
	oAJAXForm.completeCall = function(){
		oValidation.enableAll();
	};
	oAJAXForm.successCall = function(){
		if($('html').hasClass('mobile')){
			$('.form-content').remove();
		}			
	};
});