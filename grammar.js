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
      $.class_name,
      $.identifier,
      /./
    ),

    // Comments
    line_comment: $ => seq('//', /.*/),
    block_comment: $ => seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),

    // Literals
    number: $ => choice(
      /\d+/,
      /\d+\.\d+/,
      /\d+e[+-]?\d+/,
      /\d+\.\d+e[+-]?\d+/,
      /0x[0-9a-fA-F]+/,
      /0b[01]+/,
      /\d+r[0-9a-zA-Z]+/
    ),

    string: $ => choice(
      seq('"', repeat(choice(/[^"\\]/, seq('\\', /./), '\\"')), '"'),
      seq("'", repeat(choice(/[^'\\]/, seq('\\', /./), "\\'")), "'")
    ),

    symbol: $ => seq('\\', choice(
      /[a-zA-Z_][a-zA-Z0-9_]*/,
      seq('"', /[^"]*/, '"'),
      seq("'", /[^']*/, "'")
    )),

    // SuperCollider keywords - higher precedence to avoid conflicts
    keyword: $ => token(prec(10, choice(
      'var', 'arg', 'classvar', 'const',
      'if', 'else', 'while', 'for', 'do', 'switch', 'case', 'default',
      'try', 'catch', 'throw',
      'true', 'false', 'nil', 'inf',
      'this', 'super', 'currentEnvironment', 'topEnvironment',
      'thisProcess', 'thisThread', 'thisFunctionDef', 'thisFunction',
      'return', 'yield'
    ))),

    // UGens (Unit Generators) - comprehensive list
    ugen: $ => token(prec(5, choice(
      // Oscillators
      'SinOsc', 'Saw', 'Pulse', 'LFSaw', 'LFPulse', 'LFTri', 'LFPar',
      'Blip', 'SyncSaw', 'VarSaw', 'Impulse', 'LFNoise0', 'LFNoise1', 'LFNoise2',
      'ClipNoise', 'WhiteNoise', 'PinkNoise', 'BrownNoise', 'GrayNoise',
      'Crackle', 'LFClipNoise', 'LFDNoise0', 'LFDNoise1', 'LFDNoise3',
      
      // Filters
      'LPF', 'HPF', 'BPF', 'BRF', 'Resonz', 'RLPF', 'RHPF',
      'Ramp', 'Lag', 'Lag2', 'Lag3', 'LagUD', 'Decay', 'Decay2',
      'Integrator', 'LeakDC', 'OnePole', 'OneZero', 'TwoPole', 'TwoZero',
      'APF', 'LPZ1', 'HPZ1', 'LPZ2', 'HPZ2', 'BPZ2', 'BRZ2',
      
      // Delays and Reverbs
      'Delay1', 'Delay2', 'DelayN', 'DelayL', 'DelayC',
      'CombN', 'CombL', 'CombC', 'AllpassN', 'AllpassL', 'AllpassC',
      'FreeVerb', 'GVerb', 'JPverb', 'Greyhole',
      
      // Envelopes
      'EnvGen', 'Linen', 'XLine', 'Line', 'IEnvGen', 'Env',
      
      // Panners and Spatial
      'Pan2', 'LinPan2', 'Pan4', 'PanAz', 'BiPanB2', 'DecodeB2', 'PanB',
      'Balance2', 'Rotate2', 'XFade2',
      
      // Analysis
      'Amplitude', 'Peak', 'RunningSum', 'RunningMin', 'RunningMax',
      'PitchShift', 'Pitch', 'ZeroCrossing', 'Timer',
      
      // I/O
      'In', 'Out', 'ReplaceOut', 'OffsetOut', 'XOut',
      'InFeedback', 'LocalIn', 'LocalOut', 'InTrig',
      
      // Triggers and Gates
      'Trig', 'Trig1', 'TrigControl', 'Gate', 'Latch', 'Sample',
      'Schmidt',
      
      // Math and Logic
      'UnaryOpUGen', 'BinaryOpUGen', 'MulAdd', 'LinExp', 'LinLin',
      'Clip', 'Wrap', 'Fold', 'Select', 'LinSelect',
      
      // Granular
      'GrainSin', 'GrainFM', 'GrainBuf', 'Warp1', 'TGrains',
      
      // Synthesis definitions
      'SynthDef', 'Synth', 'Group', 'Bus', 'Buffer',
      
      // Control
      'Control', 'LagControl', 'AudioControl',
      'Mix', 'Splay', 'SplayAz'
    ))),

    // Pattern classes - comprehensive list
    pattern_class: $ => token(prec(5, choice(
      // Event Patterns
      'Pbind', 'Pmono', 'PmonoArtic', 'Pdef', 'Pdefn',
      'Psync', 'Pfin', 'Ppar', 'Ptpar',
      
      // Value Patterns
      'Pseq', 'Pser', 'Prand', 'Pxrand', 'Pwrand', 'Pfsm',
      'Prout', 'Pseed', 'Pn', 'Pstep', 'Pwhite', 'Pbrown',
      'Pexprand', 'Pgauss', 'Pbeta', 'Pgbrown', 'Ppoisson',
      
      // Filter Patterns
      'Pselect', 'Preject', 'Pcollect', 'Paddp',
      'Pmul', 'Padd', 'Psubtract', 'Pdivide', 'Pmod',
      'Pseg', 'Penv',
      
      // Time Patterns
      'Ptime', 'Pkey', 'Pget', 'Pset',
      
      // Scheduling
      'TempoClock', 'SystemClock', 'AppClock',
      'Routine', 'Task', 'TaskProxy', 'Tdef',
      
      // Streams
      'Stream', 'EventStream', 'CleanupStream'
    ))),

    // Class names (CamelCase identifiers starting with uppercase)
    class_name: $ => token(prec(3, /[A-Z][a-zA-Z0-9_]*/)),
    
    // Regular identifiers (lower precedence to resolve conflicts)
    identifier: $ => token(prec(1, /[a-zA-Z_][a-zA-Z0-9_]*/)),
  }
});