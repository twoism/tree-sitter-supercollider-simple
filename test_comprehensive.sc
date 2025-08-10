// Comprehensive SuperCollider test
SynthDef(\testSynth, {
    var sig, env, freq, amp, filter;
    
    // Control inputs with symbols
    freq = \freq.kr(440);
    amp = \amp.kr(0.1);
    
    // Oscillator with method call
    sig = SinOsc.ar(freq);
    
    // Envelope
    env = EnvGen.kr(Env.perc(0.01, 1), doneAction: 2);
    
    // Filter chain
    filter = LPF.ar(sig, 2000);
    filter = HPF.ar(filter, 100);
    
    // Mix and output
    Out.ar(0, Mix.ar(filter * env * amp));
}).add;

// Pattern with comprehensive syntax
Pbind(
    \instrument, \testSynth,
    \freq, Prand([440, 550, 660, 880], inf),
    \dur, Pseq([0.25, 0.5, 0.75], inf),
    \amp, Pwhite(0.05, 0.2)
).play;

// Routine with control structures
Routine({
    var counter = 0;
    while (counter < 10) {
        if (counter % 2 == 0) {
            "Even: ".post; counter.postln;
        } else {
            "Odd: ".post; counter.postln;
        };
        counter = counter + 1;
        0.5.wait;
    }
}).play;