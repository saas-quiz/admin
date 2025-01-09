import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html) {
      return new Response(JSON.stringify({ error: "HTML content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Important for server environments like Vercel
    });
    const page = await browser.newPage();

    // Set the content for Puppeteer
    await page.setContent(html);

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "10px",
        right: "10px",
      },
    });

    // Close the browser
    await browser.close();

    // Create a custom response with the PDF
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);

    // Return an error response
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
