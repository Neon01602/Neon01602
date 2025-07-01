import React, { useState } from 'react';
import { Upload, Users, Download, Loader, Image, FileText, Eye } from 'lucide-react';
import { generateContentWithImage } from '../services/geminiService';

export const WorksheetCreator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [worksheets, setWorksheets] = useState({});
  const [selectedGrades, setSelectedGrades] = useState(['1', '2', '3']);

  const grades = [
    { value: '1', label: 'Class 1 (Age 6-7)', color: 'bg-green-100 text-green-800' },
    { value: '2', label: 'Class 2 (Age 7-8)', color: 'bg-blue-100 text-blue-800' },
    { value: '3', label: 'Class 3 (Age 8-9)', color: 'bg-purple-100 text-purple-800' },
    { value: '4', label: 'Class 4 (Age 9-10)', color: 'bg-orange-100 text-orange-800' },
    { value: '5', label: 'Class 5 (Age 10-11)', color: 'bg-red-100 text-red-800' },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGradeToggle = (grade) => {
    setSelectedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const generateWorksheets = async () => {
    if (!selectedImage || selectedGrades.length === 0) return;

    setIsAnalyzing(true);
    setWorksheets({});

    try {
      for (const grade of selectedGrades) {
        const prompt = `Analyze this textbook image and create an appropriate worksheet for Class ${grade} students. 

        Please:
        1. First, identify what topic/content is shown in the image
        2. Create age-appropriate activities for Class ${grade} students
        3. Include different types of questions (multiple choice, fill in blanks, short answers, drawing activities)
        4. Use simple language suitable for the grade level
        5. Include Indian cultural context and examples
        6. Format the worksheet professionally with clear instructions

        Make it engaging and educational for ${grade === '1' ? 'very young children (6-7 years)' : 
                                             grade === '2' ? 'young children (7-8 years)' : 
                                             grade === '3' ? 'children (8-9 years)' :
                                             grade === '4' ? 'older children (9-10 years)' : 'pre-teens (10-11 years)'}.`;

        const worksheet = await generateContentWithImage(prompt, selectedImage);
        setWorksheets(prev => ({
          ...prev,
          [grade]: worksheet
        }));
      }
    } catch (error) {
      console.error('Error generating worksheets:', error);
      alert('Error generating worksheets. Please try again.');
    }

    setIsAnalyzing(false);
  };

  const downloadWorksheet = (grade) => {
    const worksheet = worksheets[grade];
    if (!worksheet) return;

    const element = document.createElement('a');
    const file = new Blob([worksheet], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sahayak-worksheet-class-${grade}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAllWorksheets = () => {
    const allWorksheets = Object.entries(worksheets)
      .map(([grade, content]) => `
===========================================
CLASS ${grade} WORKSHEET
===========================================

${content}

`)
      .join('\n');

    const element = document.createElement('a');
    const file = new Blob([allWorksheets], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sahayak-all-worksheets-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📸 Create Differentiated Worksheets
        </h1>
        <p className="text-gray-600">
          Upload a textbook photo and generate grade-appropriate worksheets using AI
        </p>
      </div>

      {/* Upload Section */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Step 1: Upload Textbook Image
        </h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center space-y-4"
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <span className="text-lg font-medium text-gray-700">
                Click to upload textbook image
              </span>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
          </label>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Preview:</h4>
              <span className="text-sm text-gray-500">Image uploaded successfully</span>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Textbook preview"
                className="w-full h-64 object-contain bg-gray-50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Grade Selection */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Step 2: Select Target Grades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {grades.map((grade) => (
            <label
              key={grade.value}
              className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                selectedGrades.includes(grade.value)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedGrades.includes(grade.value)}
                onChange={() => handleGradeToggle(grade.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className={`inline-block px-2 py-1 rounded text-sm font-medium mb-2 ${grade.color}`}>
                  Class {grade.value}
                </div>
                <div className="text-xs text-gray-600">
                  Age {grade.value === '1' ? '6-7' : 
                      grade.value === '2' ? '7-8' :
                      grade.value === '3' ? '8-9' :
                      grade.value === '4' ? '9-10' : '10-11'}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={generateWorksheets}
          disabled={!selectedImage || selectedGrades.length === 0 || isAnalyzing}
          className="sahayak-button sahayak-button-primary text-lg px-8 py-3 inline-flex items-center disabled:opacity-50"
        >
          {isAnalyzing ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Users className="w-5 h-5 mr-2" />
          )}
          {isAnalyzing ? 'Analyzing & Creating...' : 'Generate Worksheets'}
        </button>
      </div>

      {/* Results */}
      {Object.keys(worksheets).length > 0 && (
        <div className="sahayak-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Generated Worksheets
            </h3>
            <button
              onClick={downloadAllWorksheets}
              className="sahayak-button sahayak-button-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedGrades.map((grade) => {
              const gradeInfo = grades.find(g => g.value === grade);
              const worksheet = worksheets[grade];
              
              return (
                <div key={grade} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${gradeInfo.color}`}>
                        Class {grade}
                      </span>
                      <span className="text-sm text-gray-600">
                        Age {grade === '1' ? '6-7' : 
                            grade === '2' ? '7-8' :
                            grade === '3' ? '8-9' :
                            grade === '4' ? '9-10' : '10-11'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {worksheet ? (
                        <button
                          onClick={() => downloadWorksheet(grade)}
                          className="text-primary-600 hover:text-primary-700 flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      ) : isAnalyzing ? (
                        <div className="flex items-center text-gray-500">
                          <Loader className="w-4 h-4 mr-1 animate-spin" />
                          Creating...
                        </div>
                      ) : null}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {worksheet ? (
                      <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800">
                          {worksheet}
                        </pre>
                      </div>
                    ) : isAnalyzing ? (
                      <div className="flex items-center justify-center h-32 text-gray-500">
                        <Loader className="w-6 h-6 animate-spin mr-2" />
                        Analyzing image and creating worksheet...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 text-gray-400">
                        <FileText className="w-8 h-8 mr-2" />
                        Worksheet will appear here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Features & Tips */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Features & Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">What this tool does:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <Eye className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
                Analyzes textbook images using AI vision
              </li>
              <li className="flex items-start">
                <Users className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
                Creates grade-appropriate content automatically
              </li>
              <li className="flex items-start">
                <FileText className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
                Generates different worksheet formats
              </li>
              <li className="flex items-start">
                <Download className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
                Downloads ready-to-print worksheets
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Tips for best results:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Upload clear, well-lit images</li>
              <li>• Ensure text is readable in the image</li>
              <li>• Include the full page or section</li>
              <li>• Works with Hindi, English, and regional languages</li>
              <li>• Perfect for multi-grade classrooms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};