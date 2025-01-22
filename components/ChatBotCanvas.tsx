"use client";
import { Canvas } from "@react-three/fiber";
import { Html, Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Avatar from "./Avatar";

export const ChatBotCanvas = ({ textToSpeak }: { textToSpeak: string }) => {
	return (
		<Canvas>
			<OrbitControls
				enableZoom={false}
				enableDamping={false}
				enableRotate={false}
				enablePan={false}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={0}
			/>
			<color attach="background" args={["#f9f9f9"]} />
			<ambientLight intensity={2} />
			<Suspense
				fallback={
					<Html>
						<Loader />
					</Html>
				}
			>
				<Avatar textToSpeak={textToSpeak} />
			</Suspense>
		</Canvas>
	);
};
