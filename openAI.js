import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANISATION,
});

export async function getCompanyInfo(scrapedText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", //engine
      messages: [
        {
          role: "user",
          //prompt
          content: `From the following text, identify the name of the company, its founders and service or produce the company behind this website. Give answere in the form of a dictionary with keys: companyName, founders, service/produce. Make founders a list of strings. If the founder name is not found keep the list empty. Here is the text: ${scrapedText}`,
        },
      ],
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
  }
}
