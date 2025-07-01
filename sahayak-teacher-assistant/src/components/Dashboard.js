import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Brain, 
  Image, 
  Mic, 
  Calendar,
  ArrowRight,
  Star,
  Heart,
  Zap
} from 'lucide-react';

export const Dashboard = () => {
  const features = [
    {
      title: 'Generate Hyper-Local Content',
      description: 'Create culturally relevant educational content in your local language using AI.',
      icon: Brain,
      href: '/content-generator',
      color: 'bg-purple-500',
      example: 'Create a Marathi story about farmers to teach soil types'
    },
    {
      title: 'Create Differentiated Worksheets',
      description: 'Upload textbook photos and generate grade-appropriate worksheets.',
      icon: Users,
      href: '/worksheet-creator',
      color: 'bg-blue-500',
      example: 'Turn Class 3 content into Class 1 and Class 2 versions'
    },
    {
      title: 'Instant Knowledge Base',
      description: 'Get simple, clear explanations for any question in your language.',
      icon: BookOpen,
      href: '/knowledge-base',
      color: 'bg-green-500',
      example: 'Why is the sky blue? Explained with simple analogies'
    },
    {
      title: 'Design Visual Aids',
      description: 'Create educational diagrams and charts for your blackboard.',
      icon: Image,
      href: '/visual-aids',
      color: 'bg-yellow-500',
      example: 'Generate water cycle diagrams and math charts'
    },
    {
      title: 'Audio Reading Assessment',
      description: 'AI-powered pronunciation checking and reading evaluation.',
      icon: Mic,
      href: '/audio-assessment',
      color: 'bg-red-500',
      example: 'Students read aloud, AI checks pronunciation'
    },
    {
      title: 'Auto Lesson Planning',
      description: 'AI helps plan weekly lessons with activities and worksheets.',
      icon: Calendar,
      href: '/lesson-planner',
      color: 'bg-indigo-500',
      example: 'Complete lesson plans for multi-grade classrooms'
    }
  ];

  const stats = [
    { label: 'Teachers Helped', value: '10,000+', icon: Heart },
    { label: 'Students Benefited', value: '50,000+', icon: Star },
    { label: 'Content Generated', value: '1M+', icon: Zap },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">सहायक</span>
        </h1>
        <p className="text-xl md:text-2xl mb-6 opacity-90">
          Your AI-Powered Teaching Assistant for Multi-Grade Classrooms
        </p>
        <p className="text-lg opacity-80 max-w-3xl mx-auto">
          Empowering teachers in under-resourced schools across India with AI tools 
          for content generation, worksheet creation, and personalized learning.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="sahayak-card text-center">
              <Icon className="w-10 h-10 mx-auto mb-3 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          🧠 Features of Sahayak
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.href}
                className="sahayak-card hover:scale-105 transform transition-all duration-200 group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 italic">
                    Example: {feature.example}
                  </p>
                </div>
                <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                  Try it now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">🚨 The Problem</h3>
            <div className="space-y-3 text-gray-700">
              <p>In many under-resourced schools in India, one teacher handles multiple grades in a single classroom.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Don't have enough time</li>
                <li>Lack materials tailored to their students</li>
                <li>Can't always personalize lessons for each student</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">🎯 The Solution</h3>
            <div className="space-y-3 text-gray-700">
              <p>Sahayak provides AI-powered tools that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generate content in local languages</li>
                <li>Create differentiated worksheets automatically</li>
                <li>Provide instant knowledge support</li>
                <li>Design visual aids for blackboard use</li>
                <li>Assess student pronunciation</li>
                <li>Plan complete lessons with activities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          Ready to Transform Your Classroom?
        </h3>
        <p className="text-gray-600 mb-6">
          Start using Sahayak today and see the difference AI can make in your teaching.
        </p>
        <Link
          to="/content-generator"
          className="sahayak-button sahayak-button-primary text-lg px-8 py-3 inline-flex items-center"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};