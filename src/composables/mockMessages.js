import messages from '../assets/json/messages.json';

export const sendMessage = (message) => {
    alert("Message successfully sent to " + message.receiver);
}

export const getMessages = () => {
    return messages;
}