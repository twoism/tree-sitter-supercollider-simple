module.exports = grammar({
  name: 'supercollider',

  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.line_comment,
      $.block_comment,
      $.keyword,
      $.class_name,
      $.identifier,
      $.number,
      $.string,
      $.symbol,
      $.operator,
      $.punctuation,
      /./  // Catch any other character
    ),

    line_comment: $ => token(seq('//', /.*/)),
    
    block_comment: $ => token(seq(
      '/*',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/'
    )),

    keyword: $ => token(choice(
      'var', 'arg', 'classvar', 'const',
      'if', 'else', 'while', 'for', 'do', 'case', 'switch',
      'true', 'false', 'nil', 'inf',
      'this', 'super', 'thisFunction', 'thisMethod', 'thisProcess',
      'SynthDef', 'Pbind', 'Pdef', 'Tdef', 'Routine',
      'Out', 'In', 'SinOsc', 'Saw', 'Pulse', 'WhiteNoise', 'PinkNoise',
      'EnvGen', 'Env', 'ADSR', 'Line', 'XLine',
      'Mix', 'Pan2', 'Out'
    )),

    class_name: $ => /[A-Z][a-zA-Z0-9_]*/,

    identifier: $ => /[a-z~][a-zA-Z0-9_]*/,

    number: $ => /\d+(\.\d+)?/,

    string: $ => /"[^"]*"/,

    symbol: $ => /\\[a-zA-Z_][a-zA-Z0-9_]*/,

    operator: $ => token(choice(
      '+', '-', '*', '/', '%', '**',
      '==', '!=', '<', '>', '<=', '>=',
      '=', '!', '?', ':',
      '&&', '||',
      '++', '--',
      '..', '...',
      '|>', '<|', '<<', '>>',
      '@', '@@', '@|@'
    )),

    punctuation: $ => token(choice(
      '(', ')', '[', ']', '{', '}',
      ';', ',', '.', '|', '~'
    )),
  }
});