import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a professional customer support chatbot for All Fire Services Australia. Your primary goal is to assist customers with inquiries related to fire safety, fire protection equipment, maintenance, compliance, and our services. Maintain a polite, professional, and helpful tone at all times. STRICT INSTRUCTION: You must ONLY answer questions related to our business and fire safety. If a user asks a question that is entirely unrelated to fire safety or our business, you must politely decline to answer and offer to help them with a fire safety related question instead."
    });

    const formattedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chatInstance = model.startChat({
      history: formattedHistory,
    });
    
    const lastMessage = messages[messages.length - 1].content;
    const result = await chatInstance.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
