import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ContentGenerator } from './components/ContentGenerator';
import { WorksheetCreator } from './components/WorksheetCreator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { VisualAids } from './components/VisualAids';
import { AudioAssessment } from './components/AudioAssessment';
import { LessonPlanner } from './components/LessonPlanner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content-generator" element={<ContentGenerator />} />
            <Route path="/worksheet-creator" element={<WorksheetCreator />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/visual-aids" element={<VisualAids />} />
            <Route path="/audio-assessment" element={<AudioAssessment />} />
            <Route path="/lesson-planner" element={<LessonPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
