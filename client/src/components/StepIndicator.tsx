interface Step {
  label: string;
  step: number;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex justify-between mb-6 px-1 text-xs text-gray-500">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className={`w-6 h-6 flex items-center justify-center rounded-full ${
              currentStep >= step.step 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          <span className="mt-1">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
