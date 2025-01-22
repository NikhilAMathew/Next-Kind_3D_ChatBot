"use client";
import * as THREE from "three";
import { AppContext } from "../app/context/IsPlayingContext";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useContext, useEffect, useRef, useState } from "react";

const Avatar = ({ textToSpeak }: { textToSpeak: string }) => {
    const { isPlaying, setIsPlaying } = useContext(AppContext);
    const model = useGLTF("/male.glb"); // Use female.glb for a female model
    const animations = useAnimations(model.animations, model.scene);

    const idleAction = animations.actions?.Idle;
    const gestureAction = animations.actions?.Gesture;
    const lipSyncRef = useRef<THREE.SkinnedMesh | null>(null);
    const headBoneRef = useRef<THREE.Object3D | null>(null);
    const leftEyeRef = useRef<THREE.Object3D | null>(null);
    const rightEyeRef = useRef<THREE.Object3D | null>(null);
    const chestBoneRef = useRef<THREE.Object3D | null>(null);
    const handBoneRef = useRef<THREE.Object3D | null>(null);

    const [currentEmotion, setCurrentEmotion] = useState<"neutral" | "happy" | "sad" | "surprised">("neutral");

    const expressionMap = {
        neutral: { morphTargetIndex: 2, influence: 0.1 },
        happy: { morphTargetIndex: 3, influence: 1 },
        sad: { morphTargetIndex: 4, influence: 1 },
        surprised: { morphTargetIndex: 5, influence: 1 },
    };

    // Helper: Smoothly animate properties
    const smoothAnimate = (
        target: THREE.Object3D | null,
        property: keyof THREE.Object3D,
        toValue: number,
        duration: number
    ) => {
        if (!target) return;
        const startValue = target[property] as number;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            target[property] = THREE.MathUtils.lerp(startValue, toValue, progress) as any;
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    // Handle Lip-Sync
    useEffect(() => {
        const phonemeMap = {
            a: 0.8,
            e: 0.6,
            o: 0.7,
            i: 0.5,
            u: 0.7,
            default: 0,
        };
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (!textToSpeak || currentIndex >= textToSpeak.length) {
                clearInterval(interval);
                if (lipSyncRef.current?.morphTargetInfluences) {
                    lipSyncRef.current.morphTargetInfluences[0] = 0;
                }
                return;
            }

            const char = textToSpeak[currentIndex].toLowerCase();
            const influence = phonemeMap[char] || phonemeMap.default;

            if (lipSyncRef.current?.morphTargetInfluences) {
                lipSyncRef.current.morphTargetInfluences[0] = influence;
            }

            currentIndex++;
        }, 100);

        return () => clearInterval(interval);
    }, [textToSpeak]);

    // Handle Facial Expressions
    useEffect(() => {
        const emotionInterval = setInterval(() => {
            // Cycle through emotions
            const emotions: Array<"neutral" | "happy" | "sad" | "surprised"> = ["neutral", "happy", "sad", "surprised"];
            const nextEmotion = emotions[(emotions.indexOf(currentEmotion) + 1) % emotions.length];
            setCurrentEmotion(nextEmotion);

            const { morphTargetIndex, influence } = expressionMap[nextEmotion];
            if (lipSyncRef.current?.morphTargetInfluences) {
                lipSyncRef.current.morphTargetInfluences.fill(0); // Reset all
                lipSyncRef.current.morphTargetInfluences[morphTargetIndex] = influence;
            }
        }, 5000); // Change emotion every 5 seconds

        return () => clearInterval(emotionInterval);
    }, [currentEmotion]);

    // Handle Idle Movements (Head, Eyes, Hand)
    useEffect(() => {
        if (isPlaying) {
            idleAction?.play();
            gestureAction?.reset().fadeIn(0.5).play();

            const headMovementInterval = setInterval(() => {
                const randomX = (Math.random() - 0.5) * 0.05;
                const randomY = (Math.random() - 0.5) * 0.05;
                if (headBoneRef.current) {
                    smoothAnimate(headBoneRef.current.rotation, "x", randomX, 500);
                    smoothAnimate(headBoneRef.current.rotation, "y", randomY, 500);
                }
            }, 500);

            const handMovementInterval = setInterval(() => {
                const randomZ = (Math.random() - 0.5) * 0.05;
                if (handBoneRef.current) {
                    smoothAnimate(handBoneRef.current.rotation, "z", randomZ, 500);
                }
            }, 600);

            const eyeMovementInterval = setInterval(() => {
                const randomX = (Math.random() - 0.5) * 0.01;
                const randomY = (Math.random() - 0.5) * 0.01;
                if (leftEyeRef.current) {
                    smoothAnimate(leftEyeRef.current.rotation, "x", randomX, 500);
                    smoothAnimate(leftEyeRef.current.rotation, "y", randomY, 500);
                }
                if (rightEyeRef.current) {
                    smoothAnimate(rightEyeRef.current.rotation, "x", randomX, 500);
                    smoothAnimate(rightEyeRef.current.rotation, "y", randomY, 500);
                }
            }, 500);

            const breathingInterval = setInterval(() => {
                const randomScale = 1 + Math.sin(performance.now() / 1000) * 0.02;
                if (chestBoneRef.current) {
                    smoothAnimate(chestBoneRef.current.scale, "x", randomScale, 1000);
                    smoothAnimate(chestBoneRef.current.scale, "y", randomScale, 1000);
                    smoothAnimate(chestBoneRef.current.scale, "z", randomScale, 1000);
                }
            }, 1000);

            return () => {
                clearInterval(headMovementInterval);
                clearInterval(handMovementInterval);
                clearInterval(eyeMovementInterval);
                clearInterval(breathingInterval);
            };
        } else {
            idleAction?.fadeOut(0.5);
            gestureAction?.fadeOut(0.5);
            setTimeout(() => {
                idleAction?.stop();
                gestureAction?.stop();
            }, 500);
        }
    }, [isPlaying, idleAction, gestureAction]);

    // Setup Bone References
    useEffect(() => {
        model.scene.traverse((child) => {
            if (child instanceof THREE.SkinnedMesh && child.name === "Wolf3D_Avatar") {
                lipSyncRef.current = child;
            }
            if (child.name === "Head") {
                headBoneRef.current = child;
            }
            if (child.name === "LeftEye") {
                leftEyeRef.current = child;
            }
            if (child.name === "RightEye") {
                rightEyeRef.current = child;
            }
            if (child.name === "Spine") {
                chestBoneRef.current = child;
            }
            if (child.name === "RightHand") {
                handBoneRef.current = child;
            }
        });
    }, [model]);

    return (
        <primitive
            object={model.scene}
            scale={9.5}
            position={[0, -14.5, 0]}
        />
    );
};

export default Avatar;
