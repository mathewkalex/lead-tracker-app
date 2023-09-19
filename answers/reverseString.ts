function reverseWords(sentence: string): string {
    const words = sentence.split(' ');
    const reversedWords = words.map(word => reverseWord(word));
    return reversedWords.join(' ');
}

function reverseWord(word: string): string {
    return word.split('').reverse().join('');
}

// Example usage
const input = "Welcome to this Javascript Guide!";
const reversedSentence = reverseWords(input);
console.log(reversedSentence);