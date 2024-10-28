import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const getOpenAIResponse = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
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
