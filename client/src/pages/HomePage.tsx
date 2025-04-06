import { Link, useLocation, useRoute } from 'wouter';
import { ArrowRight, Check, HelpCircle, Leaf, TrendingUp, Users, Link as LinkIcon, Database, QrCode, Truck, BarChart } from 'lucide-react';
import KratomQuiz from './KratomQuiz';

const HomePage = () => {
  const [location, navigate] = useLocation();
  const [isQuizRoute] = useRoute("/quiz");
  
  // Testimonials data
  const testimonials = [
    {
      name: 'David Chen',
      role: 'CEO, GreenLeaf Botanicals',
      quote: 'The sourcing recommendations we received were spot on. We\'ve been able to secure a consistent supply chain that meets our quality standards.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Procurement Director, NaturalWay',
      quote: 'This quiz saved us months of research and negotiation. The vendor recommendations matched exactly what we were looking for.',
    },
    {
      name: 'Michael Torres',
      role: 'Founder, PureBotanicals',
      quote: 'As a new brand in the space, we needed guidance on sourcing. The personalized recommendations helped us launch our product line with confidence.',
    },
  ];

  // FAQs data
  const faqs = [
    {
      question: 'How does the Kratom sourcing quiz work?',
      answer: 'Our quiz uses advanced algorithms to analyze your business needs, volume requirements, and quality standards. Based on your answers, we generate personalized recommendations for Kratom sourcing that align with your specific business model.',
    },
    {
      question: 'Is my information kept confidential?',
      answer: 'Absolutely. All information you provide is kept strictly confidential and is only used to generate accurate sourcing recommendations. We do not share your data with third parties without your consent.',
    },
    {
      question: 'What makes your sourcing recommendations better than others?',
      answer: 'Our recommendations are based on years of industry experience and relationships with verified suppliers. We consider factors like compliance requirements, quality standards, price points, and volume needs to create a truly customized sourcing plan.',
    },
    {
      question: 'How does your blockchain supply chain tracking work?',
      answer: 'Our blockchain platform creates an immutable record of each product\'s journey from farm to consumer. This includes GPS tracking of shipments, QR code verification for authenticity, secure storage of lab testing results, and integration with inventory systems. All data is cryptographically secured and tamper-proof.',
    },
    {
      question: 'How soon can I implement these recommendations?',
      answer: 'After completing the quiz, you\'ll receive immediate recommendations. Our procurement specialists will then contact you within 24 hours to discuss implementation details and next steps.',
    },
  ];

  // Benefits data
  const benefits = [
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: 'Quality Assurance',
      description: 'Connect with suppliers who maintain rigorous testing standards and consistent alkaloid profiles.',
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-green-600" />,
      title: 'Competitive Pricing',
      description: 'Leverage our industry relationships to secure optimal pricing for your volume requirements.',
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: 'Ethical Sourcing',
      description: 'Support sustainable farming practices and fair compensation for Kratom farmers.',
    },
    {
      icon: <Check className="h-10 w-10 text-green-600" />,
      title: 'Compliance Support',
      description: 'Navigate regulatory requirements with suppliers who provide comprehensive documentation.',
    },
  ];

  // If we're on the quiz route, just render the quiz component
  if (isQuizRoute) {
    return <KratomQuiz />;
  }

  // Otherwise, show the landing page
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6">
              Find Your Perfect Kratom Supply Chain
            </h1>
            <p className="text-xl text-green-800 mb-6 max-w-3xl mx-auto">
              Take our 2-minute quiz to receive personalized Kratom sourcing recommendations 
              tailored to your business model, volume needs, and quality standards.
            </p>
            <p className="text-lg text-indigo-600 mb-10 max-w-3xl mx-auto font-medium">
              Now with blockchain-powered supply chain tracking for complete transparency and traceability!
            </p>
            <button 
              onClick={() => navigate('/quiz')}
              className="btn-primary inline-flex items-center text-lg"
            >
              Take the Quiz <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="mt-10 text-green-700 flex justify-center space-x-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" /> 100% Free
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" /> 2 Minute Completion
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" /> Custom Results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
            Why Use Our Sourcing Quiz?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our specialized quiz helps businesses of all sizes optimize their Kratom supply chain.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md card-hover benefit-card animate-fadeIn opacity-0">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/quiz')}
              className="btn-secondary inline-flex items-center"
            >
              Start Your Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Businesses have transformed their Kratom sourcing with our personalized recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md testimonial animate-fadeIn opacity-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-green-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Supply Chain Section */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-4">
            Blockchain-Powered Supply Chain
          </h2>
          <p className="text-xl text-center text-indigo-600 mb-12 max-w-3xl mx-auto">
            Discover how our blockchain integration brings unprecedented transparency and traceability to your Kratom supply chain.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn opacity-0">
              <div className="flex flex-col items-center text-center">
                <QrCode className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">Product Authentication</h3>
                <p className="text-gray-600">Verify product origin and authenticity with tamper-proof QR code blockchain verification.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn opacity-0 delay-100">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">Real-Time Tracking</h3>
                <p className="text-gray-600">Track your shipments in real-time with GPS-enabled blockchain records and status updates.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn opacity-0 delay-200">
              <div className="flex flex-col items-center text-center">
                <Database className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">Immutable Testing</h3>
                <p className="text-gray-600">Access permanent, tamper-proof records of all laboratory testing results for compliance.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn opacity-0 delay-300">
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">Inventory Management</h3>
                <p className="text-gray-600">Integrate blockchain with your inventory systems for automated, data-driven reordering.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto border-l-4 border-indigo-500">
            <div className="flex items-start">
              <LinkIcon className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Complete Enterprise Solution</h3>
                <p className="text-gray-600">
                  Our blockchain platform creates a permanent, tamper-proof record of each product's journey from harvest to your facility. 
                  This provides unprecedented transparency, facilitates compliance documentation, and enhances your ability to 
                  trace products throughout your supply chain.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Discover Blockchain Features <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Get answers to common questions about our Kratom sourcing quiz.
          </p>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <HelpCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Ready to Find Your Ideal Kratom Supplier?
            </h3>
            <button 
              onClick={() => navigate('/quiz')}
              className="btn-primary inline-flex items-center"
            >
              Take the Quiz Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Kratom Sourcing Quiz</h2>
              <p className="text-green-200 mt-2">Find your perfect Kratom supply chain</p>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-green-200">info@kratomsourcing.com</p>
                <p className="text-green-200">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Links</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors">About Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
            <p>&copy; {new Date().getFullYear()} Kratom Sourcing Quiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;