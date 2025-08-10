// Test SuperCollider code
SynthDef(\sine, {
    var freq, amp, sig, env;
    freq = \freq.kr(440);
    amp = \amp.kr(0.1);
    env = EnvGen.kr(Env.perc, doneAction: 2);
    sig = SinOsc.ar(freq) * amp * env;
    Out.ar(0, sig!2);
}).add;

Pbind(
    \instrument, \sine,
    \freq, 440,
    \dur, 0.5
).play;