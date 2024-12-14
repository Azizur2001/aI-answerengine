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
    The user provided a URL: "${url[0]}".
    Scrape the content from the URL and answer the user's question.

    User's question: "${userQuery}"

    If scraping was successful, use the following content:
    <content>
      ${scrapedContent || "No content could be scraped from the provided URL."}
    </content>

    Respond in this format:
    - Scraped URL: Mention the URL that was scraped.
    - Scraping Details: Briefly describe whether scraping succeeded or failed and summarize the content if available.
    - Answer: Provide a clear and concise response to the user's question, structured with:
      - Headings for key topics or sections.
      - Bullet points or paragraphs for details.
  `
      : `
    The user asked a question: "${userQuery}".
    Provide a detailed answer based on available knowledge.

    Respond in this format:
    - Question Asked: Restate the user's question.
    - Answer: Deliver a structured and concise response with:
      - Headings for key topics or sections.
      - Bullet points or paragraphs for details.
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
