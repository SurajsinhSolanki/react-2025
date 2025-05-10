import messages_en from "./messages/messages_en";
import messages_hi from "./messages/messages_hi";

const allMessages = {
    en: messages_en,
    hi: messages_hi,
    // Add other languages here: franc, es, etc.
};

const showMessage = ({ message, language = "en" }) => {
    const messages = allMessages[language] || allMessages["en"];
    return messages?.[message] || "Unknown message";
};

export default showMessage;