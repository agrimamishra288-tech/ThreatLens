import { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCcw, Award } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Which of the following is the best way to protect against ransomware?",
    options: [
      "Paying the ransom quickly",
      "Ignoring the message",
      "Maintaining regular offline backups",
      "Uninstalling your antivirus"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "What is the primary goal of a phishing attack?",
    options: [
      "To infect the computer with a virus",
      "To steal sensitive information like passwords",
      "To cause physical damage to hardware",
      "To speed up internet connection"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which password is the most secure?",
    options: [
      "password123",
      "MyDogName12",
      "12345678",
      "P@ssw0rd_K33p$!"
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "What does 'MFA' stand for in cybersecurity?",
    options: [
      "Multi-Function Application",
      "Multi-Factor Authentication",
      "Main Firewall Access",
      "Malware Finding Agent"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is a 'Zero-Day' vulnerability?",
    options: [
      "A flaw that takes zero days to fix",
      "A bug that only occurs at midnight",
      "A vulnerability unknown to the software vendor",
      "A virus that deletes itself instantly"
    ],
    correctAnswer: 2
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-in zoom-in-95 duration-300">
        <div className="glass rounded-2xl p-10 text-center space-y-6">
          <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto text-brand-500">
            <Award className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Quiz Completed!</h2>
          <div className="text-6xl font-black text-brand-500 py-4">
            {score} <span className="text-2xl text-slate-400">/ {questions.length}</span>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {percentage === 100 ? "Perfect! You're a cybersecurity expert." :
             percentage >= 60 ? "Great job! You have a solid understanding." :
             "Good try! Keep learning to improve your security awareness."}
          </p>
          <button
            onClick={restartQuiz}
            className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors"
          >
            <RefreshCcw className="w-5 h-5" /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-center text-sm font-medium text-slate-500 dark:text-slate-400">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 mb-10">
        <div 
          className="bg-brand-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="glass rounded-2xl p-8 space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{q.question}</h2>
        
        <div className="space-y-3">
          {q.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = q.correctAnswer === index;
            const showCorrectness = isAnswered;
            
            let buttonClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500';
            let icon = null;

            if (showCorrectness) {
              if (isCorrect) {
                buttonClass = 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400';
                icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
              } else if (isSelected && !isCorrect) {
                buttonClass = 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400';
                icon = <XCircle className="w-5 h-5 text-red-500" />;
              } else {
                buttonClass = 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50';
              }
            } else if (isSelected) {
              buttonClass = 'bg-brand-50 border-brand-500 text-brand-700';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all flex justify-between items-center ${buttonClass} ${!isAnswered ? 'hover:shadow-md' : ''}`}
              >
                <span className="font-medium">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="pt-6 animate-in slide-in-from-bottom-4">
            <button
              onClick={handleNext}
              className="w-full px-6 py-4 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
