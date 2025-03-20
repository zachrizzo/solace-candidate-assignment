import { NextResponse } from "next/server";
import { type Advocate } from "@/features/advocates/types/advocate.types";
import OpenAI from "openai";
import { vectorSearch, initVectorDB } from "@/lib/vector-search";
import { formatPhoneNumber } from "@/shared/utils";
import { getEnv } from "@/config/environment";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: getEnv("OPENAI_API_KEY"),
});

// Initialize vector database on first load
initVectorDB().catch((error) => {
  console.error("Failed to initialize vector database:", error);
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // First, use OpenAI to determine if the message is asking for an advocate
    const shouldSearchAdvocates = await determineIfSearchNeeded(message);

    if (shouldSearchAdvocates) {
      // Perform vector search for advocates
      const relevantAdvocates = await vectorSearch(message, 3);

      // Generate formatted HTML response with advocate results
      const formattedResponse = generateFormattedResponse(
        relevantAdvocates,
        message
      );

      return NextResponse.json({
        response: formattedResponse,
        isHtml: true,
      });
    } else {
      // User is not asking for an advocate, use OpenAI to generate a conversational response
      const conversationalResponse = await generateConversationalResponse(
        message
      );

      return NextResponse.json({
        response: conversationalResponse,
        isHtml: true,
      });
    }
  } catch (error) {
    console.error("Error in chat API:", error);

    // Return a user-friendly error message
    const errorResponse = `
      <div class="advocate-response">
        <p>I'm having trouble processing your request right now. Please try again in a moment or contact support if the issue persists.</p>
      </div>
    `;

    return NextResponse.json(
      {
        response: errorResponse,
        isHtml: true,
      },
      { status: 500 }
    );
  }
}

/**
 * Determine if user's message is asking for an advocate
 */
async function determineIfSearchNeeded(message: string): Promise<boolean> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that determines if a user's message is asking about finding a doctor,
          healthcare advocate, medical professional, or health-related assistance. Return "true" if they appear
          to be asking about a health concern, looking for a doctor, or seeking medical advice. Otherwise return "false".
          Return only the boolean result, nothing else.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.1, // Low temperature for more deterministic results
      max_tokens: 5,
    });

    const result = response.choices[0].message.content?.trim().toLowerCase();
    return result === "true";
  } catch (error) {
    console.error("Error determining if search is needed:", error);
    // Default to searching if there's an error (better to show results than miss them)
    return true;
  }
}

/**
 * Generate a conversational response using OpenAI
 */
async function generateConversationalResponse(
  message: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a friendly assistant for a patient advocacy platform called Solace.
          Your primary purpose is to help users find healthcare advocates. If the user isn't asking
          specifically about healthcare or advocates, respond briefly and helpfully, but encourage
          them to share any health concerns so you can match them with the right advocate.
          Keep responses brief and helpful. Format your response as simple HTML paragraphs.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const chatResponse =
      response.choices[0].message.content ||
      "I'm sorry, I'm having trouble responding. Please try asking about your healthcare needs.";

    // Wrap the response in our standard styled div
    return `
      <div class="advocate-response">
        ${chatResponse}
      </div>
      <style>
        .advocate-response {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #374151;
        }
      </style>
    `;
  } catch (error) {
    console.error("Error generating conversational response:", error);
    return `
      <div class="advocate-response">
        <p>I'm here to help you find the right healthcare advocate. Could you tell me more about your health concerns or what kind of assistance you're looking for?</p>
      </div>
    `;
  }
}

// Generate a nicely formatted HTML response
function generateFormattedResponse(
  advocates: Advocate[],
  userQuery: string
): string {
  // If no advocates found, return a helpful message
  if (!advocates || advocates.length === 0) {
    return `
      <div class="advocate-response">
        <p>I couldn't find any advocates in our database that match your needs for "${userQuery}". This might be because:</p>
        <ul style="margin-top: 8px; margin-left: 20px; list-style-type: disc;">
          <li>We don't have advocates with that specific expertise in our system yet</li>
          <li>Your query might need to be more specific about your health needs</li>
        </ul>
        <p style="margin-top: 8px;">You can try describing your health concern differently, or contact our support team for personalized assistance.</p>
      </div>
    `;
  }

  // Create beautiful HTML for the response
  return `
    <div class="advocate-response">
      <p>Based on your inquiry about "${userQuery}", I've found these advocates who can help:</p>

      <div class="advocates-grid">
        ${advocates
          .map(
            (advocate) => `
          <div class="advocate-card">
            <div class="advocate-header">
              <h3 class="advocate-name">${advocate.firstName} ${
              advocate.lastName
            }</h3>
              <div class="advocate-experience">${
                advocate.yearsOfExperience
              } years of experience</div>
            </div>
            <div class="advocate-details">
              <div class="advocate-education">${advocate.degree}</div>
              <div class="advocate-location">${advocate.city}</div>
              <div class="advocate-specialties">
                ${advocate.specialties
                  .map(
                    (specialty) =>
                      `<span class="specialty-tag">${specialty}</span>`
                  )
                  .join("")}
              </div>
              <div class="advocate-contact">
                <a href="tel:${advocate.phoneNumber.replace(
                  /\D/g,
                  ""
                )}" class="contact-button">Contact (${formatPhoneNumber(
              advocate.phoneNumber
            )})</a>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <style>
        .advocate-response {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #374151;
        }
        .advocates-grid {
          display: grid;
          grid-gap: 12px;
          margin-top: 12px;
        }
        .advocate-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
          background-color: white;
        }
        .advocate-header {
          padding: 12px;
          border-bottom: 1px solid #f3f4f6;
          background-color: #f9fafb;
        }
        .advocate-name {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #4f46e5;
        }
        .advocate-experience {
          font-size: 12px;
          color: #6b7280;
        }
        .advocate-details {
          padding: 12px;
        }
        .advocate-education {
          font-size: 13px;
          margin-bottom: 4px;
        }
        .advocate-location {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .advocate-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 12px;
        }
        .specialty-tag {
          background-color: #ede9fe;
          color: #6d28d9;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 9999px;
          white-space: nowrap;
        }
        .advocate-contact {
          display: flex;
          justify-content: flex-end;
        }
        .contact-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 13px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .contact-button:hover {
          background-color: #4338ca;
        }
      </style>
    </div>
  `;
}
