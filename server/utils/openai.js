require('dotenv').config();
const OpenAI = require('openai');
const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey: apiKey
});

async function createCompletion(messages) {
    const maxRetries = 3;
    let retries = 0;
    let completion;
  
    while (retries < maxRetries) {
      try {
        completion = await openai.chat.completions.create({
          messages: messages,
          model: 'gpt-3.5-turbo',
          temperature: 0.8,
          max_tokens: 225,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
        });
        break;
      } catch (error) {
        retries++;
        console.log(error);
        console.log(`Error fetching data, retrying (${retries}/${maxRetries})...`);
      }
    }
  
    return completion;
}
  
module.exports = { createCompletion };