import React, { useState } from 'react';
import { Brain, Mic, MicOff, Volume2, Copy, Download, Loader } from 'lucide-react';
import { generateContent } from '../services/geminiService';

export const ContentGenerator = () => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [contentType, setContentType] = useState('story');
  const [grade, setGrade] = useState('1');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const languages = [
    { code: 'hindi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
  ];

  const contentTypes = [
    { value: 'story', label: 'Story / कहानी', example: 'A story about local farmers' },
    { value: 'poem', label: 'Poem / कविता', example: 'A poem about monsoon season' },
    { value: 'explanation', label: 'Explanation / व्याख्या', example: 'Explain photosynthesis simply' },
    { value: 'activity', label: 'Activity / गतिविधि', example: 'Math activities with local examples' },
    { value: 'worksheet', label: 'Worksheet / कार्यपत्रक', example: 'Practice questions on fractions' },
  ];

  const grades = [
    { value: '1', label: 'Class 1 (Age 6-7)' },
    { value: '2', label: 'Class 2 (Age 7-8)' },
    { value: '3', label: 'Class 3 (Age 8-9)' },
    { value: '4', label: 'Class 4 (Age 9-10)' },
    { value: '5', label: 'Class 5 (Age 10-11)' },
  ];

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hindi' ? 'hi-IN' : 
                        language === 'marathi' ? 'mr-IN' :
                        language === 'tamil' ? 'ta-IN' :
                        language === 'gujarati' ? 'gu-IN' :
                        language === 'bengali' ? 'bn-IN' : 'en-IN';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(input + ' ' + transcript);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Create a ${contentType} for Class ${grade} students in ${language} language. 
      The topic is: ${input}
      
      Requirements:
      - Use culturally relevant examples from Indian context
      - Use simple, age-appropriate language
      - Include local references (Indian festivals, food, places, etc.)
      - Make it engaging and educational
      - If creating a story, include moral values
      - Format it nicely with proper structure
      
      Please respond in ${language} language with English translation if needed.`;
      
      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Error generating content. Please try again.');
    }
    setIsGenerating(false);
  };

  const speakContent = () => {
    if ('speechSynthesis' in window && generatedContent) {
      const utterance = new SpeechSynthesisUtterance(generatedContent);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 
                      language === 'marathi' ? 'mr-IN' :
                      language === 'tamil' ? 'ta-IN' :
                      language === 'gujarati' ? 'gu-IN' :
                      language === 'bengali' ? 'bn-IN' : 'en-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied to clipboard!');
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sahayak-content-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📚 Generate Hyper-Local Content
        </h1>
        <p className="text-gray-600">
          Create culturally relevant educational content in your local language using AI
        </p>
      </div>

      {/* Input Form */}
      <div className="sahayak-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language / भाषा
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="sahayak-input"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type / सामग्री प्रकार
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="sahayak-input"
            >
              {contentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade / कक्षा
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="sahayak-input"
            >
              {grades.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Topic Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic / विषय
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Example: ${contentTypes.find(t => t.value === contentType)?.example || 'Enter your topic here'}`}
              className="sahayak-input flex-1"
            />
            <button
              onClick={startListening}
              className={`sahayak-button p-2 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          {isListening && (
            <p className="text-sm text-red-600 mt-1">
              🎤 Listening... Speak now in {language}
            </p>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!input.trim() || isGenerating}
          className="sahayak-button sahayak-button-primary w-full flex items-center justify-center disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Brain className="w-5 h-5 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </button>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="sahayak-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Generated Content</h3>
            <div className="flex gap-2">
              <button
                onClick={speakContent}
                className="sahayak-button sahayak-button-secondary flex items-center"
                title="Read Aloud"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Read
              </button>
              <button
                onClick={copyContent}
                className="sahayak-button sahayak-button-secondary flex items-center"
                title="Copy"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </button>
              <button
                onClick={downloadContent}
                className="sahayak-button sahayak-button-secondary flex items-center"
                title="Download"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-gray-800 font-hindi">
              {generatedContent}
            </pre>
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Example Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Story Examples</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Create a Marathi story about farmers to teach soil types</li>
              <li>• Write a Hindi story about friendship using local festivals</li>
              <li>• Tamil story about a village child learning about stars</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Educational Examples</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Explain the water cycle using monsoon examples</li>
              <li>• Teach fractions using roti and curry portions</li>
              <li>• Describe animals using local wildlife examples</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};