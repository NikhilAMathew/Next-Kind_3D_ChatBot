import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
	try {
		const { userText } = await request.json();

		const chatCompletion = await groq.chat.completions.create({
			"messages": [
				{ role: "user", content: userText }
			],
			"model": "llama-3.1-8b-instant",
			"temperature": 1,
			"max_tokens": 1024,
			"top_p": 1,
			"stream": true,
			"stop": null
		});

        let aiResponse = "";

        for await (const chunk of chatCompletion) {
            aiResponse += chunk.choices[0]?.delta?.content || "";
        }

        console.log("Request successful:", userText, "->", aiResponse);

        return NextResponse.json({ message: aiResponse }, { status: 200 });
	} catch (error: any) {
		console.error("Error in POST handler:", {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status,
		});

		return NextResponse.json(
			{ error: "Failed to fetch AI response" },
			{ status: 500 }
		);
	}
}
