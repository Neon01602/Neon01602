import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'demo-key';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateContent = async (prompt) => {
  try {
    // For demo purposes, if no API key is provided, return sample content
    if (API_KEY === 'demo-key') {
      return getDemoContent(prompt);
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. Please check your API key and try again.');
  }
};

export const generateContentWithImage = async (prompt, imageFile) => {
  try {
    if (API_KEY === 'demo-key') {
      return getDemoImageContent(prompt);
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    // Convert image file to base64
    const base64Image = await fileToBase64(imageFile);
    
    const imageParts = [
      {
        inlineData: {
          data: base64Image.split(',')[1], // Remove data:image/... prefix
          mimeType: imageFile.type
        }
      }
    ];
    
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content with image:', error);
    throw new Error('Failed to analyze image and generate content.');
  }
};

// Helper function to convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Demo content for when API key is not available
const getDemoContent = (prompt) => {
  const demoContents = {
    story: `
🌾 किसान राजू की कहानी (Farmer Raju's Story)
===============================

एक छोटे से गाँव में राजू नाम का एक किसान रहता था। वह बहुत मेहनती था और अपने खेत की बहुत देखभाल करता था।

राजू जानता था कि अलग-अलग मिट्टी में अलग-अलग फसलें उगती हैं:
• काली मिट्टी - कपास के लिए सबसे अच्छी
• लाल मिट्टी - मूंगफली के लिए अच्छी  
• दोमट मिट्टी - गेहूं और चावल के लिए बेहतरीन

एक दिन राजू ने अपने बेटे को समझाया: "बेटा, मिट्टी हमारी माँ के समान है। जैसे माँ अलग-अलग खाना बनाती है, वैसे ही अलग-अलग मिट्टी में अलग-अलग फसलें उगती हैं।"

शिक्षा: प्रकृति के नियमों को समझना और उनका सम्मान करना जरूरी है।

English Translation: This is a story about Farmer Raju who teaches about different types of soil through his farming experience.
    `,
    poem: `
🌧️ बारिश का गीत (Song of Rain)
========================

आया आया मेघ राजा,
काले बादल लेके आया।
पानी बरसे छम छम छम,
खुशी मनाते हम हम हम।

धरती माता प्यासी थी,
फसलें सारी उदासी थी।
बारिश आई झम झम झम,
हरियाली आई धम धम धम।

English: A joyful poem about the monsoon season and how rain brings happiness to farmers and nature.
    `,
    explanation: `
🌱 पेड़-पौधे कैसे खाना बनाते हैं? (How do plants make food?)
================================================

पेड़-पौधे बहुत होशियार हैं! वे अपना खाना खुद बनाते हैं।

यह कैसे होता है:
1. 🍃 पत्तियां सूरज की रोशनी लेती हैं
2. 💧 जड़ें पानी सोखती हैं  
3. 🌬️ पत्तियां हवा से CO2 लेती हैं
4. ✨ सब मिलकर खाना (ग्लूकोज) बनता है

यह रसोई के समान है:
• सूरज = चूल्हा (आग)
• पानी = पानी
• हवा = मसाला
• पत्तियां = रसोइया

इसे प्रकाश संश्लेषण कहते हैं।

English: Simple explanation of photosynthesis using familiar examples like cooking.
    `
  };

  // Determine content type from prompt
  if (prompt.toLowerCase().includes('story') || prompt.toLowerCase().includes('कहानी')) {
    return demoContents.story;
  } else if (prompt.toLowerCase().includes('poem') || prompt.toLowerCase().includes('कविता')) {
    return demoContents.poem;
  } else {
    return demoContents.explanation;
  }
};

const getDemoImageContent = (prompt) => {
  return `
📸 Image Analysis Result
=======================

Based on the uploaded image, here's what I can see:

This appears to be a textbook page with educational content. I can help you create differentiated worksheets for different grade levels:

**For Class 1 (Age 6-7):**
• Simple matching exercises
• Color and identify activities
• Basic counting or letter recognition

**For Class 2 (Age 7-8):**
• Fill in the blanks with simple words
• True/False questions
• Basic problem solving

**For Class 3 (Age 8-9):**
• Short answer questions
• Simple explanations
• Drawing and labeling exercises

Note: To get actual image analysis, please add your Google Gemini API key to the environment variables.
  `;
};

export default {
  generateContent,
  generateContentWithImage
};