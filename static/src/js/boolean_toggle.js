//Inherited the below code to add pop up while click on the toggle boolean widget

odoo.define('js_training.basic_fields', function (require) {
"use strict";

var core = require('web.core');
var basic_fields = require('web.basic_fields');
var Dialog = require('web.Dialog');
var BooleanToggle = basic_fields.BooleanToggle;
var FieldBoolean = basic_fields.FieldBoolean;
var registry = require('web.field_registry');

var _t = core._t;
var qweb = core.qweb;
var _lt = core._lt;

//BooleanToggle.include({
//    //Inherit the _onClick function form BooleanToggle to open pop up while clicking on boolean field.
//    _onClick: function (event) {
//        this._super.apply(this, arguments);
//        Dialog.alert(this, _t("You are trying to change a boolean field! "));
//    },
//
//    init: function (parent, options){
//        // inherited init method to add functionality of Custom Search
//        this._super.apply(this, arguments);
//        this.customSearchBoolean = this.custom_search_boolean;
//    },
//
//    _render: function () {
//        this._super.apply(this, arguments);
//        if (this.$el.find('input.custom-control-input').is(':checked'))
//        {
//
//            this.$el.find('input.custom-control-input:checked + label.custom-control-label').text('ON')
//        }
//
//        if (!this.$el.find('input.custom-control-input').is(':checked'))
//        {
////                this.$el.find('input.custom-control-input:checked + label.custom-control-label').removeClass('xxx');
//                this.$el.find('label.custom-control-label').text('OFF')
//        }
//    },
//
//
//});

var CustomBooleanToggle = BooleanToggle.extend({
    className: 'o_boolean_toggle o_custom_boolean_toggle',

    _render: function () {
        this._super.apply(this, arguments);
        if (this.$el.find('input.custom-control-input').is(':checked')) {
            this.$el.find('input.custom-control-input:checked + label.custom-control-label').text('ON')
        }
        if (!this.$el.find('input.custom-control-input').is(':checked')) {
                this.$el.find('label.custom-control-label').text('OFF')
        }
    },
});

registry.add("custom_boolean_toggle", CustomBooleanToggle);
return {
    CustomBooleanToggle: CustomBooleanToggle
}
});