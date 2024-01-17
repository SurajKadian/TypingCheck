function checkMistakes() {
    var originalText = document.getElementById('originalText').value.trim();
    var typedText = document.getElementById('typedText').value.trim();
    var resultText = findMistakes(originalText, typedText);

    document.getElementById('outputResult').innerHTML = resultText;
}

function findMistakes(original, typed) {
    var originalWords = original.split(' ');
    var typedWords = typed.split(' ');

    var misspelledCount = 0;
    var leftOutCount = 0;
    var resultText = '';

    var j = 0;  // Counter for the typedWords array

    for (var i = 0; i < originalWords.length; i++) {
        // Check for extra spaces in typed text
        while (j < typedWords.length && typedWords[j] === '') {
            j++;
        }

        if (originalWords[i] !== typedWords[j]) {
            var found = false;
            // Check subsequent words for the left-out word
            for (var k = j + 1; k < typedWords.length; k++) {
                if (originalWords[i] === typedWords[k]) {
                    found = true;
                    j = k;  // Update the counter for typedWords
                    break;
                }
            }

            if (!found) {
                resultText += '<span style="color: red;">[#]</span> ';
                leftOutCount++;
            } else {
                resultText += '<span style="color: red;">[' + typedWords[j] + ']</span> ';
                misspelledCount++;
            }
        } else {
            resultText += '<span style="color: green;">' + originalWords[i] + '</span> ';
            j++;  // Update the counter for typedWords
        }
    }

    resultText += '<br>Number of misspelled words: ' + misspelledCount;
    resultText += '<br>Number of words left out: ' + leftOutCount;

    return resultText;
}

function resetTextAreas() {
    document.getElementById('originalText').value = '';
    document.getElementById('typedText').value = '';
    document.getElementById('outputResult').innerHTML = '';
}
