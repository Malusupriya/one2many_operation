odoo.define('js_training.ListRenderer', function (require) {
    "use strict";

    const core = require('web.core');
    const ListRenderer = require('web.ListRenderer');
    const Dialog = require('web.Dialog');
    const _t = core._t;


    ListRenderer.include({
        events: _.extend({}, ListRenderer.prototype.events, {
            'click .o2m_duplicate_line': '_onClickDuplicate',
            'click .o2m_remove_line': '_onClickDelete',
            'click .o2m_clear_line': '_onClickClear',
        }),
        /**
         * @constructor
         */
        init: function (parent, state, params) {
            this._super.apply(this, arguments);
            this.parent = parent;
            if (parent.nodeOptions && parent.nodeOptions.custom_visible && (this.addTrashIcon || this.addCreateLine)) {
                this.hasSelectors = true;
            }
        },

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        /**
         * return form view controller.
         *
         * @public
         * @returns {object} custom controller.
         */
        getController: function () {
            let controller;
            this.trigger_up('get_controller', {
                callback: (result) => {
                    controller = result;
                }
            });
            return controller;
        },

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

        /**
         * @override
         */
        _renderView: function () {
            return this._super.apply(this, arguments).then(() => {
                // for Duplicate
                if (this.parent.nodeOptions && this.parent.nodeOptions.custom_visible) {
                    if (this.addCreateLine) {
                        this.$('.o_optional_columns_dropdown').append($("<div>", {
                            class: "dropdown-item o2m_duplicate_line o_option_disabled",
                            text: _t('Duplicate'),
                        }));
                    }

                    // for Remove
                    if (this.addTrashIcon) {
                        this.$('.o_optional_columns_dropdown').append($("<div>", {
                            class: "dropdown-item o2m_remove_line text-danger o_option_disabled",
                            text: _t('Remove'),
                        }));
                    }

                    // for Clear selection
                    if (this.hasSelectors) {
                        this.$('.o_optional_columns_dropdown').append($("<div>", {
                            class: "dropdown-item o2m_clear_line o_option_disabled",
                            text: _t('Clear Selection'),
                        }));
                    }
                }
            });
        },
        /**
         * Prepare default data for create new record.
         *
         * @private
         * @param record
         * @return {Object}
         */
        _prepareDefaultData: function(record) {
            let data = {};
            _.each(_.keys(record.data), function (index) {
                var r = record.fields[index];
                var value = record.data[index];
                if (r.type === 'date' || r.type === 'datetime') {
                    if (value) {
                        if (value._isAMomentObject) {
                            data[index] = value;
                        } else if (typeof value == 'string') {
                            // -- check again for utc ---
                            var _d = moment(value).utc().local();
                            var date = _d.add(self.getSession().getTZOffset(_d), 'minutes');
                            data[index] = value ? date : false;
                        } else {
                            data[index] = value;
                        }
                    } else {
                        data[index] = value;
                    }
                } else if (r.type === 'one2many' || r.type === 'many2many') {
                    data[index] = value.count ? value.res_ids : [];
                } else if (r.type === 'many2one') {
                    data[index] = value && [value.data.id, value.data.display_name] || value;
                } else {
                    data[index] = value;
                }
            });

            data.id = false;
            return {
                data: data,
                context: this.state.context,
                fields: this.state.fields,
                fieldsInfo: this.state.fieldsInfo,
                modelName: this.state.model,
                parentID: this.state.id,
                viewType: 'list',
            }
        },


        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
         * @override
         * @param {MouseEvent} ev
         */
        _onToggleOptionalColumn: function (ev) {
            var $target = $(ev.currentTarget);
            if ($target.hasClass('o2m_duplicate_line')
                || $target.hasClass('o2m_remove_line')
                || $target.hasClass('o2m_clear_line')) return;
            this._super.apply(this, arguments);
        },
        /**
         * Duplicate Record
         *
         * @override
         * @param {MouseEvent} ev
         */
        _onClickDuplicate: function (ev) {
            ev.stopPropagation()
            let controller = this.getController();
            if (controller && this.selection.length) {
                let commands = _.chain(this.selection).map((selection) => {
                    let record = controller.model.get(selection);
                    let newRecordData = this._prepareDefaultData(record);
                    let newRecord = controller.model._makeDataPoint(newRecordData);
                    controller.model._parseServerData(_.keys(record.data), newRecord, newRecord.data);

                    newRecord._changes = newRecord.data;
                    return {
                        'operation': 'ADD',
                        'id': newRecord.id
                    }
                }).value();

                if (commands.length) {
                    this.getParent()._setValue({
                        operation: 'MULTI',
                        commands: commands,
                    });
                }
            }
        },
        /**
         * Function to delete the selected one2many lines
         *
         * @override
         * @param {MouseEvent} ev
         */
        _onClickDelete: function (ev) {
            ev.stopPropagation()
            if (this.selection.length >= 1) {
                var operation = this.isMany2Many ? 'FORGET' : 'DELETE';
                this.getParent()._setValue({
                    operation: operation,
                    ids: this.selection,
                });
            }
            else {
                Dialog.alert(this, _t("Please select lines to delete!"));
            }
        },
        /**
         * To clear the selected rows from One2Many lines
         *
         * @override
         * @param {MouseEvent} ev
         */
        _onClickClear: function(ev) {
            ev.stopPropagation()
            if (this.selection.length >= 1) {
                var $inputs = this.$('tbody .o_list_record_selector input');
                for (var i = 0; i < $inputs.length; i++) {
                    if ($inputs[i].checked) {
                        $inputs[i].checked = false;
                    }
                }
                this._updateSelection();
            }
            else {
                Dialog.alert(this, _t("Please select lines to clear lines!"));
            }
        },

    });

});