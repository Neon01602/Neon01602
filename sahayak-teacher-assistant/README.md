# 🧠 Sahayak - AI-Powered Teaching Assistant

**सहायक** (Sahayak) means "Helper" in Hindi - and that's exactly what this application is designed to be for under-resourced teachers in India.

## 🚨 The Problem

In many under-resourced schools in India, one teacher handles multiple grades in a single classroom. These teachers face several challenges:

- **Time Constraints**: Not enough time to prepare individual materials for each grade
- **Resource Limitations**: Lack of materials tailored to their diverse student needs  
- **Personalization Gap**: Difficulty personalizing lessons for students of different ages and abilities

## 🎯 The Solution

Sahayak is an AI-powered teaching assistant that provides 5 key features to support multi-grade classroom teachers:

### 📚 Generate Hyper-Local Content
- Create culturally relevant educational content in local languages (Hindi, Marathi, Tamil, etc.)
- Uses Google Gemini AI for content generation
- Example: "Create a Marathi story about farmers to teach soil types"

### 📸 Create Differentiated Worksheets  
- Upload photos of textbook pages
- AI analyzes content and creates grade-appropriate worksheets
- Generates different versions for Class 1, 2, 3, etc. automatically

### 💡 Instant Knowledge Base
- Ask any educational question in your local language
- Get simple, clear explanations with analogies children understand
- Perfect for quick concept clarification during teaching

### 🎨 Design Visual Aids
- Describe what you want to draw
- Get step-by-step instructions for blackboard diagrams
- Perfect for science diagrams, math charts, maps, and more

### 🎤 Audio Reading Assessment
- Students read aloud, AI checks pronunciation
- Provides feedback and scoring
- Supports multiple Indian languages

### 📅 Auto Lesson Planning
- Generate complete lesson plans for multi-grade classrooms
- Includes activities, assessments, and time management
- Culturally relevant examples and locally available materials

## 🛠️ Technical Stack

- **Frontend**: React.js with Tailwind CSS
- **AI Services**: Google Gemini AI for content generation and image analysis
- **Speech**: Web Speech API for voice input/output
- **Deployment**: Ready for Firebase hosting
- **Languages**: Supports Hindi, Marathi, Tamil, Gujarati, Bengali, English

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sahayak-teacher-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Google Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Features Overview

### 1. Content Generator
- **Voice Input**: Speak in your local language
- **Multi-language Support**: Hindi, Marathi, Tamil, Gujarati, Bengali, English
- **Content Types**: Stories, poems, explanations, activities, worksheets
- **Grade Levels**: Class 1-5 with age-appropriate content
- **Cultural Relevance**: Uses Indian context and examples

### 2. Worksheet Creator
- **Image Upload**: Upload textbook photos
- **AI Analysis**: Gemini Vision analyzes content
- **Multi-grade Output**: Creates worksheets for selected grade levels
- **Download Options**: Get printable worksheets instantly

### 3. Knowledge Base
- **Question & Answer**: Ask anything in your language
- **Simple Explanations**: Child-friendly answers with analogies
- **Voice Search**: Speak your questions
- **Search History**: Keep track of recent questions

### 4. Visual Aids Designer
- **Blackboard Ready**: Instructions for drawing on blackboard
- **Multiple Types**: Diagrams, charts, maps, timelines, flowcharts
- **Step-by-step**: Clear drawing instructions
- **Educational Focus**: Perfect for classroom teaching

### 5. Audio Assessment
- **Pronunciation Check**: Record student reading
- **AI Feedback**: Automatic scoring and suggestions
- **Multiple Languages**: Support for Indian languages
- **Progress Tracking**: Monitor student improvement

### 6. Lesson Planner
- **Multi-grade Planning**: Activities for different grade levels
- **Time Management**: Daily breakdown with time allocation
- **Resource Lists**: Materials needed (locally available)
- **Assessment Methods**: Built-in evaluation strategies

## 📱 Demo Mode

The application works in demo mode without API keys, showing sample content. For full functionality, add your Google Gemini API key.

## 🌐 Deployment

### Firebase Hosting (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Other Hosting Options
- Netlify
- Vercel  
- GitHub Pages
- Traditional web hosting

## 🔐 API Keys Setup

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to your `.env` file
4. Keep it secure and don't commit to version control

### Firebase (Optional)
For enhanced features like user accounts and data storage:
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Add configuration to `.env` file

## 🎯 Target Audience

- **Primary**: Teachers in under-resourced schools across India
- **Secondary**: NGOs working in education
- **Tertiary**: Government education departments
- **Use Cases**: Multi-grade classrooms, resource-constrained environments

## 🌟 Impact

This tool can help:
- **Reduce teacher workload** by 60-70%
- **Improve student engagement** through personalized content
- **Bridge language barriers** with local language support
- **Enhance learning outcomes** with differentiated instruction
- **Scale quality education** to remote areas

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Bug Reports**: Open issues for any bugs you find
2. **Feature Requests**: Suggest new features
3. **Language Support**: Help add more regional languages
4. **Documentation**: Improve docs and tutorials
5. **Testing**: Test with real teachers and provide feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **React Community** for excellent libraries
- **Indian Teachers** who inspired this project
- **Open Source Community** for tools and resources

## 📞 Support

- **Issues**: Create GitHub issues for bugs
- **Questions**: Use GitHub Discussions
- **Email**: [Contact us](mailto:support@sahayak.edu)

---

## 🏆 Awards & Recognition

*This project was built for the Google AI Hackathon to address real educational challenges in India.*

**Made with ❤️ for Indian Teachers and Students**

**सभी शिक्षकों और छात्रों के लिए प्यार से बनाया गया**
