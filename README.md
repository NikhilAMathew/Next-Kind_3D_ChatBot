
# **Next-Gen 3D ChatBot**
![alt text](<Avatar.png>)

An interactive AI chatbot that provides text-to-speech responses synchronized with facial expressions, using advanced 3D avatars generated with **Ready Player Me**. Built with **Next.js**, **TypeScript**, **Three.js**, and **GROQ API**, the chatbot offers a rich user experience that combines dynamic animations, expressive avatars, and advanced AI capabilities.

---

## **Features**

### **1. Dynamic 3D Avatars**
- **Avatar Customization**: Avatars are created using **Ready Player Me**, allowing users to generate lifelike 3D avatars from photos or customize them through an interactive UI.
- **GLTF Support**: Easily import and render 3D avatar models (GLTF format) for seamless integration.

### **2. Facial Expressions and Animations**
- Real-time facial animations synchronized with the chatbot’s speech.
- Expressions change dynamically based on context (e.g., happy, surprised, or neutral).

### **3. AI Text-to-Speech**
- **Speech Synchronization**: Uses the browser's SpeechSynthesis API to deliver human-like responses.
- **Typewriter Effect**: Displays text responses word by word, synced with speech output.

### **4. Powered by GROQ API**
- Fetches conversational data and responses efficiently with the GROQ API.
- Ensures fast, scalable, and reliable backend integration.

### **5. Built with Modern Web Technologies**
- **Next.js**: A powerful React-based framework for building server-rendered and static web applications.
- **Three.js**: A versatile library for rendering 3D avatars and animations.
- **TypeScript**: Adds type safety to ensure a robust and maintainable codebase.

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:
- Node.js >= 16.x
- npm or yarn

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-chatbot.git
   cd ai-chatbot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Add API keys for GROQ API in a `.env` file.


### **Run the Project**
Start the development server:
```bash
npm run dev
```
Access the chatbot at `http://localhost:3001`.

---

## **Usage**
1. Customize your avatar via the [Ready Player Me](https://demo.readyplayer.me/de/avatar?quickStart) or import a pre-built GLTF model.
2. Interact with the chatbot by typing a query.
3. Watch the 3D avatar respond with synchronized speech and facial expressions.

---

## **Technologies Used**
- **Ready Player Me**: 3D avatar generation and customization.
- **Three.js**: Rendering and animating 3D models.
- **Next.js**: Web framework for fast server-side rendering.
- **TypeScript**: Static type-checking for JavaScript.
- **GROQ API**: Data querying for seamless backend integration.

---

## **Contributing**
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Acknowledgments**
- **Ready Player Me** for 3D avatars and tools.
- **Three.js** for its powerful rendering library.
- OpenAI or the GROQ community for their APIs and support.
