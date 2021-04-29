odoo.define('js_training.relational_fields', function (require) {
"use strict";

var relational_fields = require('web.relational_fields');
var core = require('web.core');
var AbstractField = require('web.AbstractField');
var Dialog = require('web.Dialog');
var dialogs = require('web.view_dialogs');
var FieldMany2One = relational_fields.FieldMany2One;

var _t = core._t;

FieldMany2One.include({

    events: _.extend({}, FieldMany2One.prototype.events, {
        'click .o_external_custom_button': '_onExternalCustomButtonClick',
    }),

    _onExternalCustomButtonClick: function () {
        // method to direct open list of records
        var self = this;
        var dynamicFilters = []
        self._searchCreatePopup("search", false, {}, dynamicFilters);
    },

    init: function (parent, name, record, options){
        // inherited init method to add functionality of Custom Search
        this._super.apply(this, arguments);
        this.customSearch = 'customSearch' in (options || {}) ? options.customSearch : this.nodeOptions.custom_search;
    },

});

});