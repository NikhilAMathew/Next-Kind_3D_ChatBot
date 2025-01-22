export const sendTextToOpenAi = async (userText: string): Promise<string> => {
    try {
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ userText }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const { message }: { message: string } = await response.json();
        return message;
    } catch (error) {
        console.error("Error in sendTextToOpenAi:", error);
        return "An error occurred while communicating with OpenAI.";
    }
};
