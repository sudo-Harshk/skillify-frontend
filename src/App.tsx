import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import gifPath from './assets/done.webp';

// Add the loader CSS (converted from SCSS) to your project and import it
import './loader.css'; // This is where the SCSS converted to CSS should be saved

const subjects = ['Math', 'Physics', 'Chemistry'];

// Define the types for Question with an additional 'selectedAnswer'
type Question = {
  question: string;
  options: { label: string; option: string }[];
  correctAnswers: string[];
  explanation: string;
  selectedAnswer?: string | null;
};

export default function Component() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapters, setChapters] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // To reset the timer
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [timerStart, setTimerStart] = useState<number | null>(null);

  // Fetch chapters when a subject is selected
  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedSubject) {
        setLoading(true);
        try {
          const response = await axios.get(`https://skillify-backend.vercel.app/subjects/${selectedSubject}/chapters`);
          setChapters(response.data);
        } catch (error) {
          console.error('Error fetching chapters:', error);
          alert('There was an error fetching chapters. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchChapters();
  }, [selectedSubject]);

  // Handle subject selection
  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedChapter(null);
    setChapters([]);
    setQuestions([]);
    setShowTimer(false);
    setCorrectCount(0);
    setWrongCount(0);
    setTimerStart(null);
  };

  // Handle chapter selection
  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter);
    setQuestions([]);
    setShowTimer(false);
    setCorrectCount(0);
    setWrongCount(0);
    setTimerStart(null);
  };

  // Handle question generation
  const handleGenerateQuestions = async () => {
    if (selectedSubject && selectedChapter) {
      setQuestions([]);
      setLoading(true);
      try {
        const response = await axios.post('https://skillify-backend.vercel.app/questions/generate', {
          subject: selectedSubject,
          chapter: selectedChapter,
        });

        console.log('Questions fetched:', response.data);

        const questionsArray = response.data.questions;

        if (!questionsArray || questionsArray.length === 0) {
          console.error('No questions returned from the API');
          alert('Unable to generate questions at this time. Please try again.');
          setShowTimer(false);
          return;
        }

        const formattedQuestions = questionsArray.map((question: any) => ({
          question: question.question.replace(/^\*?\d+[:.]?\s*/, '').replace(/Question:\s*/, '').replace(/\*\*/g, ''),
          options: question.options,
          correctAnswers: question.correctAnswers,
          explanation: question.explanation.replace(/\*\*/g, '').replace(/^Explanation:\s*/, ''),
        }));

        setQuestions(formattedQuestions);
        setShowTimer(true);
        if (!timerStart) {
          setTimerStart(Date.now()); // Start the timer only once
          setTimerKey((prevKey) => prevKey + 1); // Reset the timer
        }
      } catch (error) {
        console.error('Error generating questions:', error);
        alert('There was an error generating questions. Please try again later.');
        setShowTimer(false);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle back button navigation
  const handleBack = () => {
    if (questions.length > 0) {
      setQuestions([]);
    } else if (selectedChapter) {
      setSelectedChapter(null);
    } else if (selectedSubject) {
      setSelectedSubject(null);
    }
    setShowTimer(false);
    setTimerStart(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-2 pb-4 bg-blue-600 text-white flex items-center justify-center relative">
          {(selectedSubject || selectedChapter || questions.length > 0) && (
            <button onClick={handleBack} className="absolute left-4" aria-label="Go back">
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-xl font-bold">Skillify</h1>
        </div>
        <div className="p-4">
          {showTimer && timerStart && questions.length > 0 && (
            <div className="mt-2 mb-4 flex justify-center items-center">
              <FlipClockCountdown
                key={timerKey} // Reset the timer
                to={timerStart + 10 * 60 * 1000}
                className="flip-timer"
                renderMap={[false, false, true, true]}
                duration={0.5}
                style={{ margin: '0 auto', transform: 'scale(1.2)' }}
              />
            </div>
          )}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader">
                <svg viewBox="0 0 80 80">
                  <circle id="test" cx="40" cy="40" r="32"></circle>
                </svg>
              </div>

              <div className="loader triangle">
                <svg viewBox="0 0 86 80">
                  <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
              </div>

              <div className="loader">
                <svg viewBox="0 0 80 80">
                  <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
              </div>
            </div>
          ) : (
            <>
              {!selectedSubject && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Select a Subject</h2>
                  <div className="grid grid-cols-1 gap-2">
                    {subjects.map((subject) => (
                      <button
                        key={subject}
                        onClick={() => handleSubjectSelect(subject)}
                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {selectedSubject && !selectedChapter && chapters.length > 0 && (
                <ChapterSelector
                  subject={selectedSubject}
                  chapters={chapters}
                  onSelect={handleChapterSelect}
                />
              )}
              {selectedSubject && selectedChapter && questions.length === 0 && correctCount + wrongCount === 0 && (
                <div className="text-center">
                  <button
                    onClick={handleGenerateQuestions}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mt-4"
                  >
                    Generate Questions
                  </button>
                </div>
              )}
              {questions.length > 0 && (
                <QuestionDisplay
                  questions={questions}
                  setQuestions={setQuestions}
                  setCorrectCount={setCorrectCount}
                  setWrongCount={setWrongCount}
                  correctCount={correctCount}
                  wrongCount={wrongCount}
                  setShowTimer={setShowTimer}
                />
              )}
              {correctCount + wrongCount > 0 && questions.length === 0 && (
                <div className="text-center mt-8">
                  <div className="flex flex-col items-center">
                    <img
                      src={gifPath}
                      alt="Done And Done GIF"
                      className="w-full h-full mb-4 rounded-lg object-cover"
                    />
                    <div className="max-w-md  p-4 w-full">
                    <h2 className="text-lg font-semibold">
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:bg-current after:w-full after:h-[2px] after:scale-x-0 after:origin-left after:animate-underlineExpand">
                      Final Report</span>
                      </h2>
                      <div className="flex justify-around items-center mt-2">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                          <p>Correct: {correctCount}</p>
                        </div>
                        <div className="flex items-center">
                          <XCircle className="text-red-500 w-5 h-5 mr-2" />
                          <p>Wrong: {wrongCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ChapterSelector({ subject, chapters, onSelect }: { subject: string, chapters: string[], onSelect: (chapter: string) => void }) {
  const getChapterColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Physics':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'Chemistry':
        return 'bg-[#FAD5A5] text-yellow-800 hover:bg-[#F8C471]';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Select a Chapter</h2>
      <div className="grid grid-cols-1 gap-2">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => onSelect(chapter)}
            className={`px-4 py-2 rounded-md transition-colors ${getChapterColor(subject)}`}
          >
            {chapter}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuestionDisplay({
  questions,
  setQuestions,
  setCorrectCount,
  setWrongCount,
  correctCount,
  wrongCount,
  setShowTimer,
}: {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setCorrectCount: (count: number) => void;
  setWrongCount: (count: number) => void;
  correctCount: number;
  wrongCount: number;
  setShowTimer: (show: boolean) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleAnswerSelect = (label: string, index: number) => {
    setSelectedAnswer(label);
    setShowExplanation(true);

    // Update the current question with the selected answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = label;
    setQuestions(updatedQuestions);

    if (currentQuestion.correctAnswers.includes(label)) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
      // Add shake effect to the button
      if (buttonRefs.current[index]) {
        buttonRefs.current[index]?.classList.add('shake');
        setTimeout(() => {
          buttonRefs.current[index]?.classList.remove('shake');
        }, 400);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      // Display final report immediately after answering the last question
      setShowExplanation(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to a state beyond the last question
      setQuestions([]); // Clear questions to trigger the final report
      setShowTimer(false); // Hide timer after finishing the quiz
    }
  };

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <>
          <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
          <p className="mb-4">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 gap-2 mb-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.label}
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={() => handleAnswerSelect(option.label, index)}
                className={`w-full px-4 py-3 rounded-md transition-colors text-left ${
                  selectedAnswer === option.label
                    ? currentQuestion.correctAnswers.includes(option.label)
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                disabled={showExplanation}
              >
                {option.label}. {option.option}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className="mb-4">
              <h3 className="font-semibold">Explanation:</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}
