import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const getOpenAIResponse = async (messages: { role: string; content: string }[]) => {
  try {
    console.log('API Key:', process.env.OPENAI_API_KEY);
    const response = await axios.post(OPENAI_API_URL, {
      model: 'gpt-3.5-turbo',
      messages: messages,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
