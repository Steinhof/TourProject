module.exports = {
    plugins: ['stylelint-scss'],
    extends: [
        'stylelint-scss',
        'stylelint-config-airbnb',
        'stylelint-config-recommended-scss',
        'stylelint-config-rational-order',
    ],
    syntax: 'sass',
    rules: {
        'selector-class-pattern': null /* BEM pattern */,
        indentation: null,
        'selector-max-id': null /* AirBnB prohibits Id selectors, but uses them. Ironic... */,
        'property-no-vendor-prefix': null,
        'block-opening-brace-space-before': null /* can't handle the Sass style */,
        'block-opening-brace-space-after': null,
        'declaration-block-trailing-semicolon': 'never' /* Sass */,
        'order/properties-alphabetical-order': null,
        'number-leading-zero': 'always' /* 0 before number */,
    },
};

/* SPECIFIC STYLES */
/* CSS
 * 1. Two empty lines before sibling element
 * 2. One empty line before child element
 * 3. Do not nest selectors unnecessarily
 * 4. Make heavy use of classes
 * 5. Rarely use @extend, because it creates more class selectors
 * 6. Use @mixin for repeating abstract styles
 */
/* HTML
 * 1. Concrete class goes first (descending classes)
 */


/* AutoFix in PHPStorm
 *  0)Install stylelint -g
 *
 *  1)Tools => External Tools
 *  Program: /node_modules/bin/stylelint.cmd
 *  Arguments: $FileName$ --fix
 *  Working Directory: $FileDir$
 *
 *  2)KeyMap => External Tools => Set keymap for stylelint
 *
 *  */
