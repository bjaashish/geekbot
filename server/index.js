import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const geeksforgeeksPrompts = [
  "geeksforgeeks",
  "geeks for geeks",
  "geeks",
  "gfg",
  "gfg geek olympics",
  "geek olympics",
  // Add more relevant prompts if necessary
];

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'All Good and working fine as we thought',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt.toLowerCase();
    let responseText = "Sorry, as a GeeksBot, I cannot assist you with this.";

    // Check if the prompt is related to GeeksForGeeks
    const isGeeksForGeeksRelated = geeksforgeeksPrompts.some((geeksPrompt) =>
      prompt.includes(geeksPrompt)
    );

    if (isGeeksForGeeksRelated) {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      responseText = response.data.choices[0].text;
    }

    res.status(200).send({
      bot: responseText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('server started on http://localhost:5000'));
