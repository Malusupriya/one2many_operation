{
    'name': "JS Version 14: One2many operations",

    'summary': """ """,

    'description': """
        Task related to One2many operations for selecting one2many lines and perform basic 
        operations - duplicate, delete,etc.
        
    """,

    'author': "Bista Solutions Pvt. Ltd",
    'website': "",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'web',
    'version': '1.0',

    # any module necessary for this one to work correctly
    'depends': ['sale', 'web'],

    # always loaded
    'data': [
        'views/view.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
    ],
    'qweb': [
        'static/src/xml/new_button.xml'],
}
# -*- coding: utf-8 -*-
