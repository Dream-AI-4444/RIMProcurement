import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ProgressBar from "@/components/ProgressBar";
import StepIndicator from "@/components/StepIndicator";
import QuestionCard from "@/components/QuestionCard";
import ContactForm from "@/components/ContactForm";
import ResultsPage from "@/components/ResultsPage";

// Kratom data from user-provided information
const kratomData = {
  strains: [
    {
      id: 'white',
      name: 'Thai White Vein',
      alkaloid: '~1.5–1.7%',
      effects: 'Often marketed for energy and focus',
      price: {
        thailand: '18–25',
        usWholesale: '30–45',
        directSource: '9.00'
      }
    },
    {
      id: 'green',
      name: 'Thai Green Vein',
      alkaloid: '~1.5–1.8%',
      effects: 'Balanced alkaloid profile with versatile effects',
      price: {
        thailand: '20–28',
        usWholesale: '35–50',
        directSource: '9.00'
      }
    },
    {
      id: 'red',
      name: 'Thai Red Vein',
      alkaloid: '~1.4–1.7%',
      effects: 'Often marketed for relaxation',
      price: {
        thailand: '18–25',
        usWholesale: '30–45',
        directSource: '9.00'
      }
    },
    {
      id: 'maengda',
      name: 'Maeng Da (Thai)',
      alkaloid: '~1.7–2.0%',
      effects: 'Premium variant with higher potency',
      price: {
        thailand: '22–30',
        usWholesale: '40–55',
        directSource: '9.00'
      }
    }
  ],
  forms: [
    {
      id: 'leaf',
      name: 'Premium Leaf',
      description: 'Minimally processed whole or crushed leaves',
      alkaloid: '~1.2–1.7%',
      price: {
        thailand: '12–18',
        usWholesale: '25–35',
        directSource: '7.00'
      }
    },
    {
      id: 'powder',
      name: 'Standard Powder',
      description: 'Finely ground leaf material (most common form)',
      alkaloid: 'Varies by strain',
      price: {
        thailand: '18–25',
        usWholesale: '30–45',
        directSource: '9.00'
      }
    },
    {
      id: 'extract10',
      name: 'MIT Extract 10%',
      description: 'Concentrated form with higher alkaloid content',
      alkaloid: '~10% mitragynine',
      price: {
        thailand: '50–70',
        usWholesale: '80–120',
        directSource: '15.00'
      }
    },
    {
      id: 'extract30',
      name: 'MIT Extract 30%',
      description: 'Strong potency concentrated extract',
      alkaloid: '~30% mitragynine',
      price: {
        thailand: '100–140',
        usWholesale: '140–180',
        directSource: '17.50'
      }
    },
    {
      id: 'extract50',
      name: 'MIT Extract 50%',
      description: 'High potency concentrated extract',
      alkaloid: '~50% mitragynine',
      price: {
        thailand: '160–200',
        usWholesale: '200–250',
        directSource: '20.00'
      }
    }
  ],
  supplyChain: {
    advantages: [
      'Quality control at origin',
      'Elimination of middlemen',
      'Consistent supply',
      'Potential cost savings',
      'Product traceability'
    ],
    availability: 'Up to 500 tons monthly',
    moq: '50-100kg for standard wholesale'
  }
};

const KratomQuiz = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({
    name: '',
    company: '',
    email: '',
    volume: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const questions = [
    {
      id: 'market',
      question: 'Which market are you primarily serving?',
      options: [
        { id: 'us', label: 'United States' },
        { id: 'europe', label: 'Europe' },
        { id: 'asia', label: 'Asia/Pacific' },
        { id: 'other', label: 'Other Regions' }
      ]
    },
    {
      id: 'business',
      question: 'What best describes your business model?',
      options: [
        { id: 'brand', label: 'Established Kratom Brand' },
        { id: 'manufacturer', label: 'Herbal Product Manufacturer' },
        { id: 'whitelabel', label: 'White Label / Private Label' },
        { id: 'distributor', label: 'Wholesale Distributor' },
        { id: 'retailer', label: 'Retail Shop Owner' }
      ]
    },
    {
      id: 'volume',
      question: 'What monthly volume are you targeting?',
      options: [
        { id: 'small', label: '50kg - 500kg' },
        { id: 'medium', label: '500kg - 2 tons' },
        { id: 'large', label: '2 tons - 20 tons' },
        { id: 'enterprise', label: '20+ tons' }
      ]
    },
    {
      id: 'priority',
      question: 'What is your primary consideration when sourcing Kratom?',
      options: [
        { id: 'price', label: 'Competitive Pricing' },
        { id: 'alkaloid', label: 'Alkaloid Content / Potency' },
        { id: 'consistency', label: 'Consistency & Reliability' },
        { id: 'ethics', label: 'Ethical Sourcing / Farmer Support' },
        { id: 'compliance', label: 'Testing & Regulatory Compliance' }
      ]
    },
    {
      id: 'products',
      question: 'What Kratom products are most relevant to your business?',
      options: [
        { id: 'leaf', label: 'Raw Leaf Material' },
        { id: 'powder', label: 'Standard Powder' },
        { id: 'premium', label: 'Premium Strains (Maeng Da)' },
        { id: 'extract', label: 'Extracts & Concentrates' },
        { id: 'all', label: 'Full Product Range' }
      ]
    },
    {
      id: 'quality',
      question: 'Which quality factors are most important to you?',
      options: [
        { id: 'alkaloid', label: 'Alkaloid Content & Profile' },
        { id: 'harvest', label: 'Harvesting Practices & Leaf Maturity' },
        { id: 'process', label: 'Processing Methods & Techniques' },
        { id: 'testing', label: 'Lab Testing & Safety Analysis' },
        { id: 'all', label: 'All Quality Factors' }
      ]
    },
    {
      id: 'blockchain',
      question: 'What blockchain-powered supply chain features would benefit your business most?',
      options: [
        { id: 'tracking', label: 'Real-time Shipment Tracking' },
        { id: 'authenticity', label: 'Product Authentication & Verification' },
        { id: 'testing', label: 'Immutable Laboratory Testing Records' },
        { id: 'inventory', label: 'Automated Inventory Management' },
        { id: 'all', label: 'Complete Blockchain Solution' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const generateRecommendations = () => {
    // Process answers to generate recommendations using the detailed product data
    let recommendations = {
      primary: [] as string[],
      secondary: [] as string[],
      notes: '',
      volume: ''
    };

    // Volume recommendation based on selected volume and priority
    switch (answers.volume) {
      case 'small':
        recommendations.volume = `Suggested starting MOQ: 100kg monthly with flexible scheduling`;
        break;
      case 'medium':
        recommendations.volume = `Suggested volume: 500kg - 2 tons monthly with quarterly contracts`;
        break;
      case 'large':
        recommendations.volume = `Suggested volume: 5-10 tons monthly with dedicated logistics support`;
        break;
      case 'enterprise':
        recommendations.volume = `Custom enterprise program with guaranteed ${kratomData.supplyChain.availability} capacity`;
        break;
      default:
        recommendations.volume = `Standard MOQ starting at ${kratomData.supplyChain.moq}`;
    }

    // Primary product recommendations based on business, priority and products
    if (answers.products === 'premium' || answers.priority === 'alkaloid') {
      const maengDa = kratomData.strains.find(s => s.id === 'maengda');
      recommendations.primary.push(
        `${maengDa?.name} (Premium, ${maengDa?.alkaloid} alkaloid content, direct source price: $${maengDa?.price.directSource}/kg)`
      );
    }
    
    if (answers.products === 'powder' || answers.products === 'all') {
      if (answers.priority === 'consistency') {
        const green = kratomData.strains.find(s => s.id === 'green');
        recommendations.primary.push(
          `${green?.name} (${green?.effects}, ${green?.alkaloid} alkaloid content, direct source price: $${green?.price.directSource}/kg)`
        );
      } else if (answers.priority === 'price') {
        const white = kratomData.strains.find(s => s.id === 'white');
        recommendations.primary.push(
          `${white?.name} (${white?.effects}, ${white?.alkaloid} alkaloid content, direct source price: $${white?.price.directSource}/kg)`
        );
      } else {
        const red = kratomData.strains.find(s => s.id === 'red');
        recommendations.primary.push(
          `${red?.name} (${red?.effects}, ${red?.alkaloid} alkaloid content, direct source price: $${red?.price.directSource}/kg)`
        );
      }
    }
    
    if (answers.products === 'leaf' || answers.products === 'all') {
      const leaf = kratomData.forms.find(f => f.id === 'leaf');
      recommendations.primary.push(
        `${leaf?.name} (${leaf?.description}, ${leaf?.alkaloid} alkaloid content, direct source price: $${leaf?.price.directSource}/kg)`
      );
    }
    
    if (answers.products === 'extract' || answers.products === 'all') {
      const extract10 = kratomData.forms.find(f => f.id === 'extract10');
      const extract30 = kratomData.forms.find(f => f.id === 'extract30');
      
      recommendations.primary.push(
        `${extract10?.name} (${extract10?.description}, direct source price: $${extract10?.price.directSource}/kg)`
      );
      
      recommendations.secondary.push(
        `${extract30?.name} (${extract30?.description}, direct source price: $${extract30?.price.directSource}/kg)`
      );
    }

    // Add business-specific recommendations
    if (answers.business === 'brand' || answers.business === 'whitelabel') {
      recommendations.secondary.push('Custom Branded Packaging Program');
      
      if (answers.priority === 'compliance' || answers.quality === 'testing') {
        recommendations.secondary.push('Enhanced Testing Panel with Custom Certificates of Analysis');
      }
    } 
    
    if (answers.business === 'manufacturer') {
      recommendations.secondary.push('Bulk Processing Program with Customized Specifications');
      
      if (answers.products === 'extract') {
        const extract50 = kratomData.forms.find(f => f.id === 'extract50');
        recommendations.secondary.push(
          `${extract50?.name} for Advanced Formulations (direct source price: $${extract50?.price.directSource}/kg)`
        );
      }
    } 
    
    if (answers.business === 'distributor' || answers.business === 'retailer') {
      recommendations.secondary.push('Complete Product Line with Customized Labeling Options');
    }

    // Add quality and compliance notes
    if (answers.quality === 'testing' || answers.quality === 'all') {
      recommendations.notes = 'All products include complete lab analysis with certificates for alkaloid content, heavy metals, contaminants, and microbiological safety.';
    }

    if (answers.market === 'us' && (answers.priority === 'compliance' || answers.quality === 'testing')) {
      recommendations.secondary.push('US Compliance Documentation Package');
      recommendations.notes += ' Products are tested to meet US market regulatory requirements.';
    }

    if (answers.priority === 'ethics') {
      recommendations.secondary.push('Farmer Direct Program with Transparent Sourcing');
      recommendations.notes += ' Our direct sourcing model ensures fair compensation to farmers and sustainable cultivation practices.';
    }

    // Add blockchain-specific recommendations
    if (answers.blockchain) {
      switch (answers.blockchain) {
        case 'tracking':
          recommendations.secondary.push('GPS-Enabled Blockchain Shipment Tracking System');
          recommendations.notes += ' Your orders will include our premium real-time tracking system with SMS/email alerts for major shipping milestones.';
          break;
        case 'authenticity':
          recommendations.secondary.push('Product Authentication with QR Code Verification');
          recommendations.notes += ' Each batch will include tamper-proof QR codes linking to immutable blockchain records verifying product origin and chain of custody.';
          break;
        case 'testing':
          recommendations.secondary.push('Blockchain Lab Testing Integration for Regulatory Compliance');
          recommendations.notes += ' All lab tests will be recorded on the blockchain with cryptographic proof of data integrity, supporting your regulatory compliance needs.';
          break;
        case 'inventory':
          recommendations.secondary.push('Blockchain-Powered Inventory Management System');
          recommendations.notes += ' Your account will include access to our blockchain inventory management platform with automated reordering features.';
          break;
        case 'all':
          recommendations.secondary.push('Complete Enterprise Blockchain Traceability Solution');
          recommendations.notes += ' Your enterprise package includes full access to our comprehensive blockchain platform for complete product traceability and supply chain transparency.';
          break;
      }
    }

    // Ensure we have at least one primary recommendation
    if (recommendations.primary.length === 0) {
      const default1 = kratomData.strains.find(s => s.id === 'green');
      const default2 = kratomData.strains.find(s => s.id === 'maengda');
      
      recommendations.primary.push(
        `${default1?.name} (${default1?.effects}, direct source price: $${default1?.price.directSource}/kg)`,
        `${default2?.name} (${default2?.effects}, direct source price: $${default2?.price.directSource}/kg)`
      );
    }

    return recommendations;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Generate recommendations
      const recommendationsResult = generateRecommendations();
      setRecommendations(recommendationsResult);
      
      // Prepare data for API submission
      const submissionData = {
        market: answers.market,
        business: answers.business,
        volume: answers.volume,
        priority: answers.priority,
        products: answers.products,
        quality: answers.quality,
        blockchain: answers.blockchain,
        name: contact.name,
        company: contact.company,
        email: contact.email,
        estimatedVolume: contact.volume,
        recommendations: recommendationsResult,
      };
      
      // Log for debugging
      console.log('Submitting data with blockchain preference:', submissionData.blockchain);
      
      // Submit to API
      await apiRequest('POST', '/api/quiz/submit', submissionData);
      
      // Show success message
      toast({
        title: "Submission Successful",
        description: "Your personalized kratom sourcing plan is ready!",
      });
      
      // Show results
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      
      toast({
        title: "Submission Failed",
        description: "There was an error processing your submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setContact({
      name: '',
      company: '',
      email: '',
      volume: '',
    });
    setShowResults(false);
    setRecommendations(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Kratom Wholesale Sourcing Quiz</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Answer a few questions to receive your personalized Thailand direct-source kratom procurement plan.
        </p>
      </header>

      <div className="quiz-container relative mx-auto max-w-2xl">
        {!showResults && (
          <>
            <ProgressBar currentStep={step} totalSteps={questions.length + 1} />
            
            <StepIndicator 
              steps={[
                { label: 'Market', step: 0 },
                { label: 'Business', step: 1 },
                { label: 'Volume', step: 2 },
                { label: 'Priority', step: 3 },
                { label: 'Products', step: 4 },
                { label: 'Quality', step: 5 },
                { label: 'Blockchain', step: 6 },
                { label: 'Contact', step: 7 }
              ]} 
              currentStep={step} 
            />
            
            {questions.map((question, index) => (
              <div key={question.id} className={step === index ? 'block' : 'hidden'}>
                <QuestionCard 
                  question={question.question}
                  options={question.options}
                  onAnswer={(answerId) => handleAnswer(question.id, answerId)}
                />
              </div>
            ))}
            
            {step === questions.length && (
              <ContactForm 
                contact={contact}
                onChange={handleContactChange}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </>
        )}
        
        {showResults && recommendations && (
          <ResultsPage 
            recommendations={recommendations}
            contact={contact}
            onReset={resetQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default KratomQuiz;
