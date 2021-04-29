odoo.define('js_training.FormController', function (require) {
    "use strict";


    const FormController = require('web.FormController');

    FormController.include({
        custom_events: _.extend({}, FormController.prototype.custom_events, {
            'get_controller': function (event) {
                event.data && event.data.callback && event.data.callback(this);
            }
        }),
    });
});