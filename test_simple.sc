// Test
SynthDef(	est, {
    var freq = 440;
    Out.ar(0, SinOsc.ar(freq));
}).add;

Pbind(req, 440).play;
