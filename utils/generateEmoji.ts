import OpenAI from 'openai';

const openai = new OpenAI();

async function generateEmojiForItem(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a emoji generator assistant. Always answer with just one emoji.',
        },
        {
          role: 'user',
          content: `Generate a suitable emoji for the following todo item: "${text}"`,
        },
      ],
      model: 'gpt-4o-mini',
    });

    const emoji = completion.choices[0]?.message?.content?.trim() || '❓';
    console.log('Generated emoji:', emoji);
    return emoji;
  } catch (error) {
    console.error('Error generating emoji:', error);
    return '❓'; // Return a default emoji if there's an error
  }
}

export default generateEmojiForItem;
