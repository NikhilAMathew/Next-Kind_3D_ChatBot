"use client";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { AppContext } from "../app/context/IsPlayingContext";
import { sendTextToOpenAi } from "@/utils/sendTextToOpenai";
import { ChatBotCanvas } from "./ChatBotCanvas";

export const TextToSpeech = () => {
    const [userText, setUserText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isPlaying, setIsPlaying } = useContext(AppContext);
    const subtitleContainerRef = useRef<HTMLDivElement>(null);
    const [typewriterText, setTypewriterText] = useState<string>("");
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [aiResponseLines, setAiResponseLines] = useState<string[]>([]);

    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    const voices = synth?.getVoices();
    const selectedVoice = voices?.find((voice) => voice.name === "Albert");

    const speakAndTypewriter = (text: string) => {
        const words = text.split(" ");
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice!;
        utterance.rate = 0.8;

        // Sync typewriter effect with speech
        let currentWord = 0;
        utterance.onboundary = (event) => {
            if (event.name === "word") {
                setCurrentWordIndex(currentWord);
                setTypewriterText(words.slice(0, currentWord + 1).join(" "));
                currentWord++;

                // Auto-scroll to the latest word
                if (subtitleContainerRef.current) {
                    subtitleContainerRef.current.scrollTop =
                        subtitleContainerRef.current.scrollHeight;
                }
            }
        };

        utterance.onstart = () => {
            setIsPlaying(true);
            setTypewriterText(""); // Reset typewriter text at the start
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setTypewriterText(text); // Ensure full text is displayed at the end
            setCurrentWordIndex(-1); // Reset word highlighting
        };

        synth?.speak(utterance);
    };

    const displayLineByLine = (response: string) => {
        const lines = response.split(". "); // Split response into sentences
        setAiResponseLines([]);
        lines.forEach((line, index) => {
            setTimeout(() => {
                const formattedLine = line.trim() + ".";
                setAiResponseLines((prevLines) => [...prevLines, formattedLine]);
                speakAndTypewriter(formattedLine); // Speak and typewriter each line
            }, index * 3000); // Delay each line by 3 seconds
        });
    };

    async function handleUserText(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!userText) return alert("Please enter text");
        setIsLoading(true);
        try {
            const message = await sendTextToOpenAi(userText);
            displayLineByLine(message); // Display response line by line with speech
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setUserText("");
        }
    }

    return (
        <div>
            <ChatBotCanvas textToSpeak={typewriterText} />
            <div className="subtitle-container" ref={subtitleContainerRef}>
                <div className="subtitle-line">
                    {typewriterText.split(" ").map((word, index) => (
                        <span
                            key={index}
                            style={{
                                opacity: index === currentWordIndex ? 1 : 0.8,
                                fontWeight: index === currentWordIndex ? "bold" : "normal",
                            }}
                        >
                            {word}{" "}
                        </span>
                    ))}
                </div>
            </div>
            <div className="chat">
                <form onSubmit={handleUserText} className="chat-form">
                    <input
                        type="text"
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        placeholder="What do you want to know?"
                        className="chat-input"
                    />
                    <button disabled={isLoading} className="chat-button">
                        {isLoading ? "Thinking..." : "Ask"}
                    </button>
                </form>
            </div>
        </div>
    );
};
