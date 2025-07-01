import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, CheckCircle, XCircle, Volume2 } from 'lucide-react';

export const AudioAssessment = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [language, setLanguage] = useState('hindi');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  const languages = [
    { code: 'hindi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'marathi', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  ];

  const sampleTexts = {
    hindi: [
      "बच्चे बगीचे में खेल रहे हैं।",
      "सूरज पूर्व दिशा में उगता है।",
      "गाय हमें दूध देती है।",
      "पेड़ हमें छाया देते हैं।",
    ],
    english: [
      "The sun rises in the east.",
      "Birds fly in the sky.",
      "Water is essential for life.",
      "Trees give us oxygen.",
    ],
    marathi: [
      "मुले बागेत खेळत आहेत।",
      "सूर्य पूर्वेला उगवतो।",
      "गाय आम्हाला दूध देते।",
    ],
    tamil: [
      "சூரியன் கிழக்கில் உதிக்கிறது.",
      "பறவைகள் வானில் பறக்கின்றன.",
      "தண்ணீர் வாழ்க்கைக்கு அவசியம்.",
    ]
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
        // Start speech recognition
        startSpeechRecognition();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use this feature.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hindi' ? 'hi-IN' : 
                        language === 'marathi' ? 'mr-IN' :
                        language === 'tamil' ? 'ta-IN' : 'en-IN';
      
      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        assessPronunciation(spokenText);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setTranscript('Could not recognize speech. Please try again.');
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const assessPronunciation = (spokenText) => {
    // Simple assessment logic (in real app, this would use advanced AI)
    const similarity = calculateSimilarity(selectedText.toLowerCase(), spokenText.toLowerCase());
    
    let score, feedback;
    if (similarity > 0.8) {
      score = 'Excellent';
      feedback = 'Perfect pronunciation! 🌟';
    } else if (similarity > 0.6) {
      score = 'Good';
      feedback = 'Good pronunciation with minor errors. 👍';
    } else if (similarity > 0.4) {
      score = 'Fair';
      feedback = 'Needs improvement. Try again! 📚';
    } else {
      score = 'Needs Work';
      feedback = 'Practice more for better pronunciation. 💪';
    }

    setAssessment({
      score,
      feedback,
      similarity: Math.round(similarity * 100),
      expected: selectedText,
      spoken: spokenText
    });
  };

  const calculateSimilarity = (str1, str2) => {
    // Simple Levenshtein distance-based similarity
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  const playRecording = () => {
    if (recordedAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetAssessment = () => {
    setRecordedAudio(null);
    setTranscript('');
    setAssessment(null);
    setIsPlaying(false);
  };

  const speakText = () => {
    if ('speechSynthesis' in window && selectedText) {
      const utterance = new SpeechSynthesisUtterance(selectedText);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 
                      language === 'marathi' ? 'mr-IN' :
                      language === 'tamil' ? 'ta-IN' : 'en-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎤 Audio Reading Assessment
        </h1>
        <p className="text-gray-600">
          AI-powered pronunciation checking and reading evaluation
        </p>
      </div>

      {/* Language and Text Selection */}
      <div className="sahayak-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Texts / नमूना पाठ
            </label>
            <select
              value={selectedText}
              onChange={(e) => setSelectedText(e.target.value)}
              className="sahayak-input"
            >
              <option value="">Select a text to read</option>
              {sampleTexts[language]?.map((text, index) => (
                <option key={index} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter custom text / या अपना पाठ दर्ज करें
          </label>
          <textarea
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            placeholder="Enter text for students to read..."
            className="sahayak-input min-h-[100px]"
            rows={3}
          />
        </div>

        {selectedText && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-blue-800">Text to Read:</h4>
              <button
                onClick={speakText}
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
              >
                <Volume2 className="w-4 h-4 mr-1" />
                Listen
              </button>
            </div>
            <p className="text-blue-900 font-hindi text-lg leading-relaxed">
              {selectedText}
            </p>
          </div>
        )}
      </div>

      {/* Recording Controls */}
      {selectedText && (
        <div className="sahayak-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Step 2: Record Reading
          </h3>
          
          <div className="flex justify-center space-x-4 mb-6">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="sahayak-button sahayak-button-primary flex items-center text-lg px-6 py-3"
              >
                <Mic className="w-6 h-6 mr-2" />
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="sahayak-button bg-red-500 hover:bg-red-600 text-white flex items-center text-lg px-6 py-3"
              >
                <MicOff className="w-6 h-6 mr-2" />
                Stop Recording
              </button>
            )}

            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <button
                    onClick={playRecording}
                    className="sahayak-button sahayak-button-secondary flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Play
                  </button>
                ) : (
                  <button
                    onClick={pauseRecording}
                    className="sahayak-button sahayak-button-secondary flex items-center"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </button>
                )}
                
                <button
                  onClick={resetAssessment}
                  className="sahayak-button sahayak-button-secondary flex items-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </button>
              </>
            )}
          </div>

          {isRecording && (
            <div className="text-center">
              <div className="inline-flex items-center text-red-600 text-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                Recording... Speak clearly into the microphone
              </div>
            </div>
          )}

          {recordedAudio && (
            <audio
              ref={audioRef}
              src={recordedAudio}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          )}
        </div>
      )}

      {/* Assessment Results */}
      {assessment && (
        <div className="sahayak-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Assessment Results / मूल्यांकन परिणाम
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Overall Score:</span>
                <div className="flex items-center">
                  {assessment.score === 'Excellent' && <CheckCircle className="w-5 h-5 text-green-500 mr-2" />}
                  {assessment.score === 'Good' && <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />}
                  {assessment.score === 'Fair' && <XCircle className="w-5 h-5 text-yellow-500 mr-2" />}
                  {assessment.score === 'Needs Work' && <XCircle className="w-5 h-5 text-red-500 mr-2" />}
                  <span className={`font-bold ${
                    assessment.score === 'Excellent' ? 'text-green-600' :
                    assessment.score === 'Good' ? 'text-blue-600' :
                    assessment.score === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {assessment.score}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="font-medium block mb-2">Accuracy:</span>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      assessment.similarity > 80 ? 'bg-green-500' :
                      assessment.similarity > 60 ? 'bg-blue-500' :
                      assessment.similarity > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${assessment.similarity}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 mt-1">{assessment.similarity}% match</span>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium text-blue-800 block mb-2">Feedback:</span>
                <p className="text-blue-700">{assessment.feedback}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-green-800 block mb-2">Expected Text:</span>
                <p className="text-green-700 font-hindi">{assessment.expected}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <span className="font-medium text-purple-800 block mb-2">What You Said:</span>
                <p className="text-purple-700 font-hindi">{assessment.spoken}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Mic className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Voice Recording</h4>
            <p className="text-sm text-gray-600">
              Record student reading in real-time
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">AI Assessment</h4>
            <p className="text-sm text-gray-600">
              Automatic pronunciation analysis
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Audio Feedback</h4>
            <p className="text-sm text-gray-600">
              Listen to correct pronunciation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};