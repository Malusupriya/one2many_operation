odoo.define('js_training.FormViewInherit', function (require)
{
"use strict";
var core = require('web.core');
var FormController = require('web.FormController');
var _t = core._t;
var Dialog = require('web.Dialog');
var web_client = require('web.web_client');

FormController.include
({
    renderButtons: function ($node)
    {
        this._super.apply(this, arguments);
        self = this
        if (this.$buttons)
        {
            this.$buttons.find('.oe_action_button').click(function(e)
            {
                web_client.action_manager.do_action({
                    type: 'ir.actions.act_window',
                    res_model: 'project.project',
                    res_id: 648,
                    views: [[false, 'form']],
                    target: 'current'
                });
            });
        }
    },
});
});