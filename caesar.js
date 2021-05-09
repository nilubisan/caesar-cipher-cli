module.exports = {
    caesarCipher: function (text, shift, action) {
        const LETTERS_NUMBER = 26;
        const UP_LETTER_START_CHAR_CODE = 65;
        const UP_LETTER_END_CHAR_CODE = 90;
        const LOW_LETTER_START_CHAR_CODE = 97;
        const LOW_LETTER_END_CHAR_CODE = 122;
        
        return text
        .split('')
        .map((char) => {
            if(char.match(/[a-zA-Z]/)) {
                let charCode = char.charCodeAt(0);
                let shiftValue = shift % LETTERS_NUMBER;
                let startCharCode = char.match(/[a-z]/) ? LOW_LETTER_START_CHAR_CODE : UP_LETTER_START_CHAR_CODE;
                let endCharCode = char.match(/[a-z]/) ? LOW_LETTER_END_CHAR_CODE : UP_LETTER_END_CHAR_CODE
                if(action === 'encode') {
                    return charCode + shiftValue > endCharCode ?
                    String.fromCharCode(startCharCode + (charCode + shiftValue - endCharCode) - 1) :
                    String.fromCharCode(charCode + shiftValue)
                } else if(action === 'decode') {
                    return charCode - shiftValue < startCharCode ?
                    String.fromCharCode(endCharCode - (startCharCode - (charCode - shiftValue)) + 1) :
                    String.fromCharCode(charCode - shiftValue)
                }

            } 
            else return char
        }
        )
        .join('');
    }
}