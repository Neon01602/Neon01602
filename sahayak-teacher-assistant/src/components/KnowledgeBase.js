import React, { useState } from 'react';
import { Search, BookOpen, Lightbulb, Volume2, Copy, Clock, Mic, MicOff } from 'lucide-react';
import { generateContent } from '../services/geminiService';

export const KnowledgeBase = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const languages = [
    { code: 'hindi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
  ];

  const quickQuestions = [
    "Why is the sky blue?",
    "How does rain form?",
    "What makes plants green?",
    "Why do we need oxygen?",
    "How do birds fly?",
    "What causes earthquakes?",
    "Why do we have seasons?",
    "How does the moon change shape?",
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
        setQuery(transcript);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setExplanation('');

    try {
      const prompt = `Explain the following question in simple, easy-to-understand language suitable for primary school teachers and students. Use analogies and examples that children can relate to, especially from Indian context.

Question: ${query}

Please:
1. Start with a simple, one-sentence answer
2. Explain in detail using analogies and examples familiar to Indian children
3. Use local examples (like roti, curry, monsoon, festivals, etc.)
4. Keep the language appropriate for children aged 6-11
5. Include interesting facts or "did you know" sections
6. If applicable, suggest simple activities or demonstrations
7. Respond in ${language} language with English translation if needed

Make it engaging and educational!`;

      const result = await generateContent(prompt);
      setExplanation(result);
      
      // Add to search history
      const historyItem = {
        question: query,
        timestamp: new Date().toLocaleString(),
        language: language
      };
      setSearchHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 searches
      
    } catch (error) {
      console.error('Error generating explanation:', error);
      alert('Error generating explanation. Please try again.');
    }

    setIsLoading(false);
  };

  const speakExplanation = () => {
    if ('speechSynthesis' in window && explanation) {
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 
                      language === 'marathi' ? 'mr-IN' :
                      language === 'tamil' ? 'ta-IN' :
                      language === 'gujarati' ? 'gu-IN' :
                      language === 'bengali' ? 'bn-IN' : 'en-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const copyExplanation = () => {
    navigator.clipboard.writeText(explanation);
    alert('Explanation copied to clipboard!');
  };

  const useQuickQuestion = (question) => {
    setQuery(question);
  };

  const useHistoryItem = (item) => {
    setQuery(item.question);
    setLanguage(item.language);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          💡 Instant Knowledge Base
        </h1>
        <p className="text-gray-600">
          Get simple, clear explanations for any question in your language
        </p>
      </div>

      {/* Search Form */}
      <div className="sahayak-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ask any question / कोई भी प्रश्न पूछें
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: Why is the sky blue? / आसमान नीला क्यों है?"
                className="sahayak-input flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={startListening}
                className={`sahayak-button p-3 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            {isListening && (
              <p className="text-sm text-red-600 mt-1">
                🎤 Listening... Ask your question in {language}
              </p>
            )}
          </div>

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
        </div>

        <button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="sahayak-button sahayak-button-primary w-full flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <BookOpen className="w-5 h-5 mr-2 animate-pulse" />
              Searching for answer...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Get Explanation
            </>
          )}
        </button>
      </div>

      {/* Quick Questions */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🚀 Quick Questions to Try
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => useQuickQuestion(question)}
              className="text-left p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-start">
                <Lightbulb className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{question}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation Result */}
      {explanation && (
        <div className="sahayak-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Explanation / व्याख्या
            </h3>
            <div className="flex gap-2">
              <button
                onClick={speakExplanation}
                className="sahayak-button sahayak-button-secondary flex items-center"
                title="Read Aloud"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Listen
              </button>
              <button
                onClick={copyExplanation}
                className="sahayak-button sahayak-button-secondary flex items-center"
                title="Copy"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <pre className="whitespace-pre-wrap text-gray-800 font-hindi leading-relaxed">
              {explanation}
            </pre>
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="sahayak-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📚 Recent Questions
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => useHistoryItem(item)}
              >
                <div className="flex items-center flex-1">
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">
                      {item.question}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.timestamp} • {languages.find(l => l.code === item.language)?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    useHistoryItem(item);
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Ask Again
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Ask Questions</h4>
            <p className="text-sm text-gray-600">
              Type or speak your question in any language
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">AI Analysis</h4>
            <p className="text-sm text-gray-600">
              AI creates simple explanations with local examples
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Clear Answers</h4>
            <p className="text-sm text-gray-600">
              Get explanations with analogies kids understand
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};