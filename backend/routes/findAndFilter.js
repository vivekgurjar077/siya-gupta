const words = require("./words.json");

const findAndFilter = (
    sentence,
    placeholder,
    languages,
    allowed_words,
    myList
) => {
    try {
        let found = [];

        // Create regex patterns for each bad word
        const badWordPatterns = [];
        for (let i = 0; i < languages.length; i++) {
            let language = languages[i];
            words[language].forEach(word => {
                badWordPatterns.push(new RegExp(`\\b${word}\\b`, "gi"));
            });
            myList.forEach(word => {
                badWordPatterns.push(new RegExp(`\\b${word}\\b`, "gi"));
            });
        }

        // Replace bad words with placeholders
        let filtered_sentence = sentence;
        badWordPatterns.forEach(pattern => {
            filtered_sentence = filtered_sentence.replace(pattern, match => {
                if (!allowed_words.includes(match.toLowerCase())) {
                    return match.replace(/./g, placeholder);
                } else {
                    return match;
                }
            });
        });

        // Check if any bad words were found
        const badWordsFound = badWordPatterns.some(pattern =>
            pattern.test(sentence)
        );

        return {
            found: badWordsFound,
            filtered_sentence: filtered_sentence,
            selected_languages: languages,
            bad_words: found,
            allowed_words: allowed_words,
        };

    } catch (error) {
        console.log("error in findAndFilter", error);
        return {
            found: false,
            filtered_sentence: sentence,
        };
    }
};

module.exports = {
    findAndFilter,
};
