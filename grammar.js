module.exports = grammar({
  name: 'supercollider',

  rules: {
    source_file: $ => repeat($._item),

    _item: $ => choice(
      $.comment,
      $.number,  
      $.string,
      $.keyword,
      $.identifier,
      /./
    ),

    comment: $ => choice(
      seq('//', /.*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    ),

    number: $ => /\d+(\.\d+)?/,

    string: $ => /"[^"]*"/,

    keyword: $ => choice(
      'SynthDef', 'Pbind', 'Out', 'var', 'arg',
      'if', 'else', 'while', 'for'
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  }
});