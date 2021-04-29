# -*- coding: utf-8 -*-
from odoo import api, fields, models, _, tools


class SaleOrder(models.Model):
    _inherit = "sale.order"

    is_toggle_boolean = fields.Boolean('Is Toggle Boolean Without CSS changes.')
    is_toggle_boolean_with_css_changes = fields.Boolean('Is Toggle Boolean With CSS changes.')
    product_ids = fields.One2many('product.product', 'sale_id')


class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    order_id = fields.Many2one('sale.order', string='Order Reference', required=True, ondelete='cascade',
                               index=True, copy=True)


class ProductProduct(models.Model):
    _inherit = "product.product"

    sale_id = fields.Many2one('sale.order', string='Order Reference')
