module.exports = grammar({
  name: 'supercollider',

  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  rules: {
    source_file: $ => repeat($._item),

    _item: $ => choice(
      $.line_comment,
      $.block_comment,
      $.symbol,
      $.number,
      $.string,
      $.keyword,
      $.ugen,
      $.pattern_class,
      $.identifier,
      /./
    ),

    line_comment: $ => seq('//', /.*/),
    block_comment: $ => seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),

    number: $ => /\d+(\.\d+)?/,
    string: $ => seq('"', /[^"]*/, '"'),
    symbol: $ => seq('\\', /[a-zA-Z_][a-zA-Z0-9_]*/),

    keyword: $ => choice(
      'var', 'arg', 'if', 'else', 'while', 'for', 'do',
      'true', 'false', 'nil', 'this', 'super'
    ),

    ugen: $ => choice(
      'SynthDef', 'SinOsc', 'Saw', 'Pulse', 'WhiteNoise', 'PinkNoise',
      'EnvGen', 'Env', 'Out', 'In', 'Mix', 'Pan2',
      'LPF', 'HPF', 'BPF', 'Delay1', 'FreeVerb'
    ),

    pattern_class: $ => choice(
      'Pbind', 'Pseq', 'Prand', 'Pdef', 'Routine', 'Task'
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  }
});