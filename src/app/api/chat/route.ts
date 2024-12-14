// TODO: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
// Refer to the Next.js Docs on how to read the Request body: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// Refer to the Groq SDK here on how to use an LLM: https://www.npmjs.com/package/groq-sdk
// Refer to the Cheerio docs here on how to parse HTML: https://cheerio.js.org/docs/basics/loading
// Refer to Puppeteer docs here: https://pptr.dev/guides/what-is-puppeteer

import { NextResponse } from "next/server";
import { getGroqResponse } from "@/app/utils/groqClient";
import { scrapeUrl, urlPattern } from "@/app/utils/scraper";

export async function POST(req: Request) {
  try {
    const { message, messages } = await req.json();

    console.log("message received:", message);

    const url = message.match(urlPattern);

    let scrapedContent = "";
    if (url) {
      console.log("Url found", url);
      const scraperResponse = await scrapeUrl(url[0]); // Use url[0] as the match result is an array
      if (scraperResponse) {
        scrapedContent = scraperResponse.content;
      }
      console.log("Scraped content", scrapedContent);
    }

    const userQuery = message.replace(url ? url[0] : "", "").trim();

    const userPrompt = url
      ? `
    The user has provided a URL to scrape: "${url[0]}".
    Scrape the content from the URL and answer their question based on the content.

    User's question: "${userQuery}"

    Based on the scraped content:
    <content>
      ${scrapedContent || "No content could be scraped from the provided URL."}
    </content>

    Respond in a structured format with:
    1. Scraped URL: Mention the URL that was scraped.
    2. Scraping Details: Indicate whether scraping was successful or not, and provide a summary of the scraped content.
    3. Answer: Provide a response to the user's question in a structured format with:
       - Headings for major themes or sections.
       - Bullet points or numbered lists for detailed explanations under each heading.
       - Clear and concise language for readability.
  `
      : `
    The user has asked a question: "${userQuery}".
    Answer the question based on any relevant knowledge or context available.

    Respond in a structured format with:
    1. Question Asked: Repeat the user's question.
    2. Answer: Provide a response in a structured format with:
       - Headings for major themes or sections.
       - Bullet points or numbered lists for detailed explanations under each heading.
       - Clear and concise language for readability.
  `;
    const llmMessages = [
      ...messages,
      {
        role: "user",
        content: userPrompt.trim(),
      },
    ];

    const response = await getGroqResponse(llmMessages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Error" });
  }
}
