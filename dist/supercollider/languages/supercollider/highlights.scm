; Basic regex-based highlighting attempts
; Note: This may not work as Zed expects tree-sitter nodes

; Try literal strings that might be recognized
"SynthDef" @keyword
"Pbind" @keyword
"var" @keyword
"arg" @keyword
"if" @keyword
"else" @keyword
"while" @keyword
"for" @keyword

; Class names (uppercase)
[A-Z][a-zA-Z0-9_]* @type

; Numbers
[0-9]+\.?[0-9]* @number

; Comments (these might work)
//[^\n]* @comment
/\*[\s\S]*?\*/ @comment

; Strings
"[^"]*" @string

; Symbols
\\[a-zA-Z_][a-zA-Z0-9_]* @string.special
