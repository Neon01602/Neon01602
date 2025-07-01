import React, { useState } from 'react';
import { Calendar, Download, Users, Clock, BookOpen, Loader } from 'lucide-react';
import { generateContent } from '../services/geminiService';

export const LessonPlanner = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grades, setGrades] = useState(['1', '2', '3']);
  const [duration, setDuration] = useState('week');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonPlan, setLessonPlan] = useState('');

  const subjects = [
    'Mathematics / गणित',
    'Science / विज्ञान', 
    'Hindi / हिंदी',
    'English / अंग्रेजी',
    'Social Studies / सामाजिक अध्ययन',
    'Environmental Studies / पर्यावरण अध्ययन'
  ];

  const gradeOptions = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' },
  ];

  const handleGradeToggle = (grade) => {
    setGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const generateLessonPlan = async () => {
    if (!subject || !topic || grades.length === 0) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Create a comprehensive lesson plan for multi-grade teaching in Indian rural schools.

Subject: ${subject}
Topic: ${topic}
Duration: ${duration === 'week' ? 'One week (5 days)' : duration === 'day' ? 'One day' : 'One month (4 weeks)'}
Grades: ${grades.join(', ')}

Please provide:
1. Learning objectives for each grade level
2. Daily breakdown of activities
3. Differentiated teaching strategies for multi-grade classroom
4. Materials needed (simple, locally available)
5. Assessment methods
6. Activities and exercises for each grade
7. Homework assignments
8. Cultural relevance and local examples
9. Interactive group activities
10. Progress tracking methods

Format it professionally with clear sections and make it practical for teachers with limited resources.`;
      
      const plan = await generateContent(prompt);
      setLessonPlan(plan);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      alert('Error generating lesson plan. Please try again.');
    }
    setIsGenerating(false);
  };

  const downloadPlan = () => {
    const element = document.createElement('a');
    const file = new Blob([lessonPlan], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sahayak-lesson-plan-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📅 Auto Lesson Planning
        </h1>
        <p className="text-gray-600">
          AI helps plan weekly lessons with activities and worksheets
        </p>
      </div>

      {/* Planning Form */}
      <div className="sahayak-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject / विषय
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="sahayak-input"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration / अवधि
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="sahayak-input"
            >
              <option value="day">One Day</option>
              <option value="week">One Week</option>
              <option value="month">One Month</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic / विषय
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Fractions, Water Cycle, Indian Freedom Struggle"
            className="sahayak-input"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Grades / कक्षा चुनें
          </label>
          <div className="grid grid-cols-5 gap-3">
            {gradeOptions.map((grade) => (
              <label
                key={grade.value}
                className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all ${
                  grades.includes(grade.value)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={grades.includes(grade.value)}
                  onChange={() => handleGradeToggle(grade.value)}
                  className="sr-only"
                />
                <div className="font-medium">{grade.label}</div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={generateLessonPlan}
          disabled={!subject || !topic || grades.length === 0 || isGenerating}
          className="sahayak-button sahayak-button-primary w-full flex items-center justify-center disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Calendar className="w-5 h-5 mr-2" />
          )}
          {isGenerating ? 'Creating Lesson Plan...' : 'Generate Lesson Plan'}
        </button>
      </div>

      {/* Generated Lesson Plan */}
      {lessonPlan && (
        <div className="sahayak-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Generated Lesson Plan</h3>
            <button
              onClick={downloadPlan}
              className="sahayak-button sahayak-button-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-gray-800">
              {lessonPlan}
            </pre>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="sahayak-card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Multi-Grade Teaching</h4>
            <p className="text-sm text-gray-600">
              Differentiated activities for each grade level
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Time Management</h4>
            <p className="text-sm text-gray-600">
              Daily breakdown with time allocation
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Complete Resources</h4>
            <p className="text-sm text-gray-600">
              Activities, assessments, and materials list
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};