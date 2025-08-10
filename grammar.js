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
      $.method_call,
      $.function_call,
      $.array,
      $.number,
      $.string,
      $.char,
      $.keyword,
      $.ugen,
      $.pattern_class,
      $.class_name,
      $.identifier,
      /./
    ),

    // Comments
    line_comment: $ => seq('//', /.*/),
    block_comment: $ => seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),

    // Literals
    number: $ => choice(
      /\d+\.\d+/,          // Float
      /\d+/,               // Integer
      /0x[0-9a-fA-F]+/,    // Hex
      /\d+[eE][+-]?\d+/,   // Scientific notation
      /pi/,                // Pi constant
      /inf/                // Infinity
    ),

    string: $ => seq('"', /[^"]*/, '"'),
    char: $ => /\$./,

    // Symbols - essential for SuperCollider
    symbol: $ => seq('\\', /[a-zA-Z_][a-zA-Z0-9_]*/),

    // Method calls: object.method or object.method()
    method_call: $ => prec(2, seq(
      choice($.identifier, $.class_name, $.ugen, $.pattern_class),
      '.',
      /[a-zA-Z_][a-zA-Z0-9_]*/,
      optional(seq('(', optional($._arg_list), ')'))
    )),

    // Function calls: Function() or Function(args)
    function_call: $ => prec(1, seq(
      choice($.identifier, $.class_name, $.ugen, $.pattern_class),
      '(',
      optional($._arg_list),
      ')'
    )),

    // Arrays: [1, 2, 3]
    array: $ => seq('[', optional($._arg_list), ']'),

    _arg_list: $ => seq(
      $._item,
      repeat(seq(',', $._item))
    ),

    // SuperCollider Keywords
    keyword: $ => choice(
      // Variable declarations
      'var', 'arg', 'classvar', 'const',
      
      // Control structures
      'if', 'else', 'while', 'for', 'do', 'case', 'switch',
      'try', 'catch', 'finally', 'throw',
      'break', 'continue', 'return', 'yield',
      
      // Class definitions
      'class', 'extends',
      
      // Special values
      'true', 'false', 'nil', 'inf', 'pi',
      
      // Built-in references
      'this', 'super', 'thisFunction', 'thisMethod', 'thisProcess',
      'currentEnvironment', 'topEnvironment'
    ),

    // UGens (Unit Generators) - comprehensive list
    ugen: $ => choice(
      // Core synthesis
      'SynthDef', 'Synth',
      
      // Oscillators
      'SinOsc', 'Saw', 'Pulse', 'LFSaw', 'LFPulse', 'LFTri', 'Blip',
      'Klang', 'Klank', 'Formant', 'Impulse', 'PMOsc', 'FM7',
      
      // Noise generators
      'WhiteNoise', 'PinkNoise', 'BrownNoise', 'GrayNoise', 'ClipNoise',
      'LFNoise0', 'LFNoise1', 'LFNoise2', 'Dust', 'Dust2',
      
      // Filters
      'LPF', 'HPF', 'BPF', 'BRF', 'Resonz', 'RLPF', 'RHPF',
      'Integrator', 'LeakDC', 'OnePole', 'OneZero',
      
      // Envelopes and control
      'EnvGen', 'Env', 'Line', 'XLine', 'Decay', 'Decay2',
      'Linen', 'ASR', 'ADSR', 'DetectSilence',
      
      // Delay effects
      'Delay1', 'Delay2', 'DelayN', 'DelayL', 'DelayC',
      'CombN', 'CombL', 'CombC', 'AllpassN', 'AllpassL', 'AllpassC',
      'FreeVerb', 'GVerb', 'JPverb',
      
      // Dynamics
      'Compander', 'Limiter', 'Normalizer', 'Gate',
      
      // Input/Output
      'In', 'Out', 'ReplaceOut', 'OffsetOut', 'LocalIn', 'LocalOut',
      'InFeedback', 'SoundIn', 'AudioIn',
      
      // Multichannel and panning
      'Mix', 'Splay', 'Pan2', 'Pan4', 'PanAz', 'Balance2',
      'Rotate2', 'XFade2', 'LinXFade2',
      
      // Math and utility
      'Select', 'LinExp', 'LinLin', 'Clip', 'Wrap', 'Fold',
      
      // Triggers
      'Trig', 'Trig1', 'TrigHold', 'Latch', 'Sample',
      'PulseCount', 'PulseDivider',
      
      // Analysis
      'Amplitude', 'Pitch', 'ZeroCrossing', 'FFT', 'IFFT'
    ),

    // Pattern Classes - comprehensive list
    pattern_class: $ => choice(
      // Basic patterns
      'Pbind', 'Pmono', 'PmonoArtic',
      
      // Sequence patterns
      'Pseq', 'Pser', 'Prand', 'Pxrand', 'Pwrand', 'Pshuf',
      
      // Number patterns
      'Pwhite', 'Pbrown', 'Pgbrown', 'Pexprand', 'Plprand', 'Phprand',
      
      // Utility patterns
      'Pkey', 'Pn', 'Pstutter', 'PdurStutter',
      
      // Parallel patterns
      'Ppar', 'Pspawn', 'Pfx', 'Pfxb',
      
      // Definition patterns
      'Pdef', 'Pdefn', 'Tdef', 'Ndef',
      
      // Control patterns
      'Routine', 'Task', 'Prout',
      'Pattern', 'ListPattern', 'FuncPattern'
    ),

    // Class Names (capitalized identifiers)
    class_name: $ => /[A-Z][a-zA-Z0-9_]*/,

    // Regular identifiers
    identifier: $ => /[a-z_~][a-zA-Z0-9_]*/,
  }
});