import { ChevronRight } from "lucide-react";

interface Option {
  id: string;
  label: string;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  onAnswer: (optionId: string) => void;
}

const QuestionCard = ({ question, options, onAnswer }: QuestionCardProps) => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md mb-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-green-800 mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className="w-full py-3 px-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-left transition duration-150 flex items-center group"
          >
            <span className="flex-grow">{option.label}</span>
            <ChevronRight className="h-5 w-5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
