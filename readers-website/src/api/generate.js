import { OpenAI } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { topic } = req.body;
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are creating a dramatic conversation between two people for a daily podcast. 
          The conversation should be engaging, with each person having a distinct personality. 
          Format the response as a JSON object with "host" and "guest" properties containing their dialogue.`
        },
        {
          role: "user",
          content: `Generate a 10-exchange dramatic conversation about ${topic} with clear host and guest roles.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    return res.status(200).json(JSON.parse(content));
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ error: 'Error generating conversation' });
  }
}
