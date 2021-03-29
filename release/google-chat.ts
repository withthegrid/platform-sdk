import axios from 'axios';

async function notifyOnGoogleChat(
  googleChatUrl: string,
  text: string,
): Promise<void> {
  // max length of text is 4096 characters.
  const croppedText = text.length > 4096 ? `${text.substring(0, 4000)}\n\n_...cut off due to message size limit_` : text;

  const body = {
    text: croppedText,
  };

  await axios.post(googleChatUrl, body);
}

export default notifyOnGoogleChat;
