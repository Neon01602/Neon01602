import React, { useState } from 'react';
import { Image, Download, Palette, Loader, Copy } from 'lucide-react';
import { generateContent } from '../services/geminiService';

export const VisualAids = () => {
  const [description, setDescription] = useState('');
  const [aidType, setAidType] = useState('diagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAid, setGeneratedAid] = useState('');

  const aidTypes = [
    { value: 'diagram', label: 'Diagram / आरेख', example: 'Water cycle diagram' },
    { value: 'chart', label: 'Chart / चार्ट', example: 'Multiplication table' },
    { value: 'map', label: 'Map / मानचित्र', example: 'India states map' },
    { value: 'timeline', label: 'Timeline / समयरेखा', example: 'History timeline' },
    { value: 'flowchart', label: 'Flowchart / प्रवाह चार्ट', example: 'Life cycle of butterfly' },
    { value: 'graph', label: 'Graph / ग्राफ', example: 'Bar graph for data' },
  ];

  const examples = [
    "Draw the water cycle with clouds, rain, evaporation",
    "Create a multiplication table for 7",
    "Show the parts of a plant with labels",
    "Draw the solar system with planet names",
    "Make a simple map of India with states",
    "Show the life cycle of a butterfly",
  ];

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Create a detailed text-based visual aid description for teachers to draw on a blackboard. 

Type: ${aidType}
Description: ${description}

Please provide:
1. A clear, step-by-step drawing guide
2. Specific measurements and positioning
3. Labels and text to include
4. Color suggestions (if applicable)
5. Simple drawing techniques suitable for blackboard
6. Make it suitable for Indian primary school classrooms

Format the response as clear instructions that a teacher can follow to recreate this visual aid on a blackboard. Include ASCII art where helpful.`;
      
      const content = await generateContent(prompt);
      setGeneratedAid(content);
    } catch (error) {
      console.error('Error generating visual aid:', error);
      alert('Error generating visual aid. Please try again.');
    }
    setIsGenerating(false);
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(generatedAid);
    alert('Instructions copied to clipboard!');
  };

  const downloadInstructions = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedAid], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sahayak-visual-aid-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎨 Design Visual Aids
        </h1>
        <p className="text-gray-600">
          Create educational diagrams and charts for your blackboard
        </p>
      </div>

      {/* Input Form */}
      <div className="sahayak-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Visual Aid / दृश्य सहायता का प्रकार
            </label>
            <select
              value={aidType}
              onChange={(e) => setAidType(e.target.value)}
              className="sahayak-input"
            >
              {aidTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Example: {aidTypes.find(t => t.value === aidType)?.example}
            </label>
            <div className="h-10 flex items-center text-sm text-gray-500">
              Perfect for blackboard drawing
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe what you want to draw / आप क्या बनाना चाहते हैं
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Example: ${aidTypes.find(t => t.value === aidType)?.example}`}
            className="sahayak-input min-h-[100px]"
            rows={4}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!description.trim() || isGenerating}
          className="sahayak-button sahayak-button-primary w-full flex items-center justify-center disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Palette className="w-5 h-5 mr-2" />
          )}
          {isGenerating ? 'Creating Visual Aid...' : 'Create Visual Aid'}
        </button>
      </div>

      {/* Quick Examples */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          💡 Quick Examples to Try
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setDescription(example)}
              className="text-left p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-start">
                <Image className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{example}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generated Visual Aid */}
      {generatedAid && (
        <div className="sahayak-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Drawing Instructions</h3>
            <div className="flex gap-2">
              <button
                onClick={copyInstructions}
                className="sahayak-button sahayak-button-secondary flex items-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </button>
              <button
                onClick={downloadInstructions}
                className="sahayak-button sahayak-button-secondary flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-gray-800">
              {generatedAid}
            </pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Tips for Best Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">What to include in your description:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Be specific about what you want to show</li>
              <li>• Mention labels and text needed</li>
              <li>• Include important details or parts</li>
              <li>• Specify if it's for a particular grade level</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Perfect for:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Science diagrams and processes</li>
              <li>• Math charts and graphs</li>
              <li>• Geography maps and features</li>
              <li>• History timelines and events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};