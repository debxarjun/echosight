# 🔊 EchoSight — See the World Through Sound

### An AI-Powered Vision Assistant for the Blind and Visually Impaired

**EchoSight** is an AI-powered accessibility web application designed to help blind and visually impaired individuals understand their surroundings through intelligent image recognition, text extraction, and voice-based descriptions.

From identifying Indian currency notes to reading medicine labels, food packaging, and street signs, EchoSight aims to make everyday interactions more accessible through the power of Artificial Intelligence.

🌍 **Built for accessibility. Designed for independence. Powered by AI.**

---

## ✨ Features

### 👁️ AI-Powered Scene Description
- Analyze images captured using a device camera.
- Identify everyday objects and describe surrounding scenes.
- Convert visual information into natural-language descriptions.
- Provide spoken feedback to improve accessibility.

### 💵 Indian Currency Recognition
- Identify Indian currency denominations, including ₹10, ₹20, ₹50, ₹100, ₹200, and ₹500.
- Describe visible features of currency notes.
- Communicate uncertainty when a denomination cannot be identified reliably.

### 💊 Medicine Label Reader
- Read visible medicine names and printed strengths.
- Extract expiry dates and other available label information.
- Help users access important information printed on medicine packaging.
- Clearly communicate when text is unclear or uncertain.

### 🍱 Food Package Reader
- Read product names and brand information.
- Extract visible ingredients and nutritional information.
- Identify printed manufacturing and expiry dates.
- Read allergen information and vegetarian/non-vegetarian symbols when visible.

### 🪧 Text and Street Sign Reader
- Extract text from signs, notices, and printed materials.
- Read recognized text aloud.
- Support English, Hindi, and Bengali text where supported by the underlying recognition technology.

### 🗣️ Multilingual Voice Assistant
- English, Hindi, and Bengali language options.
- Text-to-speech for spoken descriptions.
- Repeat, pause, resume, and stop speech.
- Optional voice commands, depending on browser support.

### ♿ Accessibility-First Interface
- Voice-oriented navigation.
- Large, clearly labeled controls.
- Keyboard-accessible interactions.
- Screen-reader-friendly interface.
- High-contrast and larger-text options.
- Responsive design for mobile and desktop devices.

### 📋 Scan History
- Review previous descriptions.
- Replay spoken results.
- Delete individual entries or clear history.
- Store lightweight scan history locally where supported.

### 🧪 Demo Mode
- Explore sample scenarios without configuring an AI API.
- Experience the interface and speech features.
- Clearly distinguish sample responses from actual AI image analysis.

---

## 🎯 Problem Statement

Blind and visually impaired individuals may encounter difficulties when independently identifying everyday objects and accessing visual information.

Examples include:
- Recognizing currency denominations.
- Reading medicine labels.
- Understanding food packaging.
- Reading street signs and printed notices.
- Identifying unfamiliar objects.
- Accessing visual information without assistance.

Existing accessibility tools do not always provide a unified experience tailored to these everyday use cases and local languages.

**EchoSight aims to bridge this gap by transforming visual information into accessible spoken descriptions.**

---

## 💡 Our Solution

EchoSight combines computer vision, AI-powered image understanding, text extraction, and speech technologies into one accessible web application.

The application follows a simple workflow:

1. **Capture:** The user captures an image or uploads a photograph.
2. **Analyze:** A vision-capable AI model analyzes the image.
3. **Understand:** The application generates a description or extracts visible text.
4. **Listen:** Text-to-speech converts the result into spoken feedback.
5. **Interact:** The user can repeat the description or explore additional information.

The goal is to make visual information easier to access without requiring users to depend on a visually complex interface.

---

## ⚙️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js / React | Frontend and application interface |
| TypeScript / JavaScript | Application logic |
| Tailwind CSS | Responsive styling |
| Node.js | Backend runtime |
| Express.js, if used | Backend API and routing |
| OpenAI API | AI-powered image understanding |
| MediaDevices API | Camera access |
| Canvas API | Image capture and processing |
| Web Speech API | Text-to-speech and optional speech recognition |
| Browser Local Storage | User preferences and lightweight scan history |

*The final technology stack depends on the packages and implementation used in the project.*

---

## 🏗️ Application Architecture

```text
                 ┌──────────────────────┐
                 │      User Interface  │
                 │  Camera / Image Input│
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Image Capture     │
                 │  Validation/Resizing │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Backend API       │
                 │ Request Validation   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Vision AI Model   │
                 │ Image Understanding  │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Description / OCR    │
                 │ Structured Results   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Accessible Feedback  │
                 │ Text + Speech Output │
                 └──────────────────────┘
