import { Bitcoin, Building, CreditCard } from "lucide-react";

interface ContactFormProps {
  contact: {
    name: string;
    company: string;
    email: string;
    volume: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const ContactForm = ({ contact, onChange, onSubmit, loading }: ContactFormProps) => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md animate-fadeIn">
      <h2 className="text-xl font-bold text-green-800 mb-4">Almost there! Tell us about your business</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={onChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="company"
            value={contact.company}
            onChange={onChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={onChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Monthly Volume (kg)</label>
          <input
            type="text"
            name="volume"
            value={contact.volume}
            onChange={onChange}
            placeholder="e.g., 500kg, 5 tons, etc."
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Accepted Payment Methods</h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm">
              <Bitcoin className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-xs font-medium">Bitcoin (BTC)</span>
            </div>
            <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm">
              <CreditCard className="h-4 w-4 text-teal-500 mr-2" />
              <span className="text-xs font-medium">USDT</span>
            </div>
            <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm">
              <Building className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-xs font-medium">Bank Transfer</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Get My Personalized Recommendations'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
