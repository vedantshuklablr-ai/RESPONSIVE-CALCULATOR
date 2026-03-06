# 🧮 Responsive Calculator & Productivity Suite

A modern, feature-rich web application that combines a powerful calculator with multiple productivity tools, built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🧮 Calculator
- **Advanced Operations**: Basic arithmetic, scientific functions, and memory operations
- **History Tracking**: View and reuse previous calculations
- **Keyboard Support**: Full keyboard navigation and shortcuts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### ⏰ Productivity Tools
- **Timer**: Countdown timer with customizable presets
- **Pomodoro Timer**: Focus sessions with break intervals
- **Todo List**: Manage tasks with priority levels and completion tracking
- **Notes**: Quick note-taking with auto-save functionality
- **Weather**: Real-time weather information for any location
- **Unit Converter**: Convert between various units (length, weight, temperature, etc.)

### 🎨 UI/UX Features
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Sidebar**: Collapsible navigation for better screen utilization
- **Search Modal**: Quick access to any tool or feature
- **Modern Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Hooks + Context API
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/vedantshuklablr-ai/RESPONSIVE-CALCULATOR.git

# Navigate to the project directory
cd RESPONSIVE-CALCULATOR

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Sidebar.tsx      # Main navigation sidebar
│   └── SearchModal.tsx  # Global search functionality
├── pages/               # Feature pages
│   ├── CalculatorPage.tsx
│   ├── TimerPage.tsx
│   ├── PomodoroPage.tsx
│   ├── TodoPage.tsx
│   ├── NotesPage.tsx
│   ├── WeatherPage.tsx
│   ├── UnitConverterPage.tsx
│   ├── Dashboard.tsx
│   └── SettingsPage.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── styles/              # Global styles and configurations
```

## 🎯 Key Features Explained

### Calculator
- Supports basic operations: addition, subtraction, multiplication, division
- Advanced functions: square root, percentage, memory operations
- Real-time calculation display
- History panel with the ability to reuse previous results

### Pomodoro Timer
- Customizable work session duration (default: 25 minutes)
- Short and long break intervals
- Session tracking and statistics
- Audio notifications for session completion

### Todo List
- Create, edit, and delete tasks
- Set priority levels (High, Medium, Low)
- Mark tasks as complete
- Filter by status or priority

### Weather Widget
- Search for any city worldwide
- Display current temperature, humidity, and conditions
- 5-day weather forecast
- Automatic location detection

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the amazing icon set
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or feedback, feel free to:
- Open an issue on GitHub
- Reach out via the project discussions

---

**Built with ❤️ by [Vedant Shukla](https://github.com/vedantshuklablr-ai)**
