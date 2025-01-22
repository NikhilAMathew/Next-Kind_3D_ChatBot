import { Header } from "@/components/Header";
import { TextToSpeech } from "@/components/TextToSpeech";
import { IsPlayingProvider } from "./context/IsPlayingContext";
import { ChatBotCanvas } from "@/components/ChatBotCanvas";

export default function Home() {
	return (
		<>
		<Header />
		  <main className="chatbot-canvas">
			<IsPlayingProvider>
			  <TextToSpeech />
			  <ChatBotCanvas textToSpeak="" />
			</IsPlayingProvider>
		  </main>
		</>
	);
}
