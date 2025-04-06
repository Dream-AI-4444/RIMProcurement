import { RefreshCw, Bitcoin, Building, CreditCard, FileText, CheckCircle, TrendingUp, Database, QrCode, Link, Truck, BarChart, Download } from "lucide-react";
import { useState } from "react";

// Define Kratom product data based on provided information
const kratomData = [
  {
    type: "Thai White Vein",
    form: "Powder",
    alkaloidContent: "~1.5–1.7%",
    wholesaleThailand: "18–25",
    wholesaleUSA: "30–45", 
    retailUSA: "50–80",
    directSource: "9.00",
    pricePerTon: "50,000–80,000",
    notes: "Often marketed for energy and focus"
  },
  {
    type: "Thai Green Vein",
    form: "Powder", 
    alkaloidContent: "~1.5–1.8%",
    wholesaleThailand: "20–28",
    wholesaleUSA: "35–50",
    retailUSA: "55–90",
    directSource: "9.00",
    pricePerTon: "55,000–90,000",
    notes: "Balanced alkaloid profile"
  },
  {
    type: "Thai Red Vein",
    form: "Powder",
    alkaloidContent: "~1.4–1.7%",
    wholesaleThailand: "18–25",
    wholesaleUSA: "30–45",
    retailUSA: "50–80",
    directSource: "9.00",
    pricePerTon: "50,000–80,000",
    notes: "Often marketed for relaxation"
  },
  {
    type: "Maeng Da (Thai)",
    form: "Powder",
    alkaloidContent: "~1.7–2.0%",
    wholesaleThailand: "22–30",
    wholesaleUSA: "40–55",
    retailUSA: "60–100",
    directSource: "9.00",
    pricePerTon: "60,000–100,000",
    notes: "Premium variant with higher potency"
  },
  {
    type: "Premium Leaf",
    form: "Leaf",
    alkaloidContent: "~1.2–1.7%",
    wholesaleThailand: "12–18",
    wholesaleUSA: "25–35",
    retailUSA: "40–60",
    directSource: "7.00",
    pricePerTon: "40,000–60,000",
    notes: "Minimally processed whole or crushed leaves"
  },
  {
    type: "MIT Extract 10%",
    form: "Extract",
    alkaloidContent: "~10% mitragynine",
    wholesaleThailand: "50–70",
    wholesaleUSA: "80–120",
    retailUSA: "150–200",
    directSource: "15.00",
    pricePerTon: "150,000–200,000",
    notes: "Concentrated form with higher alkaloid content"
  }
];

interface ResultsPageProps {
  recommendations: {
    primary: string[];
    secondary: string[];
    notes: string;
    volume: string;
  };
  contact: {
    name: string;
    company: string;
    email: string;
    volume: string;
  };
  onReset: () => void;
}

const ResultsPage = ({ recommendations, contact, onReset }: ResultsPageProps) => {
  const [showPricingTable, setShowPricingTable] = useState(false);
  const [showSupplyInfo, setShowSupplyInfo] = useState(false);

  // Get recommended products based on the primary recommendations
  const getRecommendedProducts = () => {
    const recommendedProducts = [];
    
    // For demonstration, we're matching keywords in the recommendations to kratom types
    for (const rec of recommendations.primary) {
      const lowerRec = rec.toLowerCase();
      
      if (lowerRec.includes("white")) {
        recommendedProducts.push(kratomData[0]);
      } else if (lowerRec.includes("green")) {
        recommendedProducts.push(kratomData[1]);
      } else if (lowerRec.includes("red")) {
        recommendedProducts.push(kratomData[2]);
      } else if (lowerRec.includes("maeng") || lowerRec.includes("premium")) {
        recommendedProducts.push(kratomData[3]);
      } else if (lowerRec.includes("leaf")) {
        recommendedProducts.push(kratomData[4]);
      } else if (lowerRec.includes("extract")) {
        recommendedProducts.push(kratomData[5]);
      }
    }
    
    // If no specific matches, include the first 3 products as default
    if (recommendedProducts.length === 0) {
      return kratomData.slice(0, 3);
    }
    
    return recommendedProducts;
  };

  const recommendedProducts = getRecommendedProducts();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md animate-fadeIn">
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Your Custom Kratom Sourcing Plan</h2>
        <p className="text-green-600">Prepared exclusively for {contact.name} at {contact.company}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Primary Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.primary.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>

      {recommendations.secondary.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Complementary Products & Services</h3>
          <ul className="list-disc pl-5 space-y-2">
            {recommendations.secondary.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Volume Recommendation</h3>
        <p className="text-blue-700">{recommendations.volume}</p>
      </div>

      {recommendations.notes && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Notes</h3>
          <p className="text-gray-700">{recommendations.notes}</p>
        </div>
      )}

      {/* Recommended Products Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommended Products</h3>
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alkaloid Content</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Source Price ($/kg)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recommendedProducts.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.form}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.alkaloidContent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${product.directSource}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between">
          <button 
            onClick={() => setShowPricingTable(!showPricingTable)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FileText className="h-5 w-5 mr-2 text-green-600" />
            {showPricingTable ? 'Hide Full Pricing Data' : 'Show Full Pricing Data'}
          </button>
          
          <button 
            onClick={() => setShowSupplyInfo(!showSupplyInfo)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            {showSupplyInfo ? 'Hide Supply Chain Details' : 'Show Supply Chain Details'}
          </button>
        </div>
      </div>

      {/* Full Pricing Table (Expandable) */}
      {showPricingTable && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Complete Kratom Pricing Data</h3>
          <p className="text-sm text-gray-600 mb-4">Market comparison of standard kratom pricing across different supply chain positions.</p>
          
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thailand Wholesale ($/kg)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US Wholesale ($/kg)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US Retail ($/kg)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Source ($/kg)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Ton ($)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {kratomData.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{product.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${product.wholesaleThailand}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${product.wholesaleUSA}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${product.retailUSA}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">${product.directSource}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${product.pricePerTon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">* All prices shown in USD. Direct Source prices represent premium quality with verified origin and testing.</p>
        </div>
      )}

      {/* Supply Chain Information (Expandable) */}
      {showSupplyInfo && (
        <div className="mb-6 bg-green-50 p-4 rounded-lg animate-fadeIn">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Supply Chain Advantages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Direct Sourcing Benefits</h4>
                  <p className="text-sm text-gray-600">Eliminate middlemen with our direct relationship with producers in Thailand, ensuring quality control at origin and up to 70% cost savings.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Guaranteed Supply</h4>
                  <p className="text-sm text-gray-600">Secure access to up to 500 tons monthly with consistent alkaloid profiles and long-term contracts for supply stability.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Quality Assurance</h4>
                  <p className="text-sm text-gray-600">All products undergo rigorous testing for alkaloid content, heavy metals, contaminants, and microbiological safety.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Business Terms</h4>
                  <p className="text-sm text-gray-600">Flexible MOQs starting at 50kg, with annual agreements available for price stability and Thailand jurisdiction for legal matters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Payment Methods</h3>
        <p className="text-yellow-700 mb-3">We accept the following payment methods for your convenience:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-md font-medium text-yellow-700 mb-2">Cryptocurrency Payments (5% Discount)</h4>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <Bitcoin className="h-6 w-6 text-orange-500 mr-2" />
            <span className="font-medium">Bitcoin (BTC)</span>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <CreditCard className="h-6 w-6 text-teal-500 mr-2" />
            <span className="font-medium">USDT (TRC20/ERC20)</span>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <CreditCard className="h-6 w-6 text-blue-500 mr-2" />
            <span className="font-medium">Ethereum (ETH)</span>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <CreditCard className="h-6 w-6 text-purple-500 mr-2" />
            <span className="font-medium">Other Cryptocurrencies</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-md font-medium text-yellow-700 mb-2">Traditional Payment Methods</h4>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <Building className="h-6 w-6 text-blue-500 mr-2" />
            <span className="font-medium">International Bank Transfer</span>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <CreditCard className="h-6 w-6 text-gray-500 mr-2" />
            <span className="font-medium">Letter of Credit (L/C)</span>
          </div>
        </div>
        
        <p className="text-xs text-yellow-600 mt-3">* Cryptocurrency payments qualify for a 5% discount on total order value and faster processing times</p>
      </div>

      {/* Blockchain Supply Chain Tracking */}
      <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">
          <Link className="h-5 w-5 mr-2 inline-block text-indigo-600" />
          Blockchain-Powered Supply Chain
        </h3>
        <p className="text-indigo-700 mb-4">All orders include access to our proprietary blockchain-based tracking and verification system.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start">
              <QrCode className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Product Authentication</h4>
                <p className="text-sm text-gray-600">Each batch comes with a unique QR code linked to an immutable blockchain record verifying origin, testing results, and complete chain of custody.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Real-Time Logistics Tracking</h4>
                <p className="text-sm text-gray-600">Track your shipment from harvest to delivery with GPS-enabled blockchain records providing real-time location and status updates.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start">
              <Database className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Immutable Testing Records</h4>
                <p className="text-sm text-gray-600">All laboratory test results are permanently recorded on the blockchain, ensuring data integrity and preventing tampering or alteration.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start">
              <BarChart className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Inventory Management</h4>
                <p className="text-sm text-gray-600">Our blockchain platform integrates with your inventory systems to provide automated reordering and stock management based on real-time data.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-100">
          <p className="text-sm text-gray-700">
            <span className="font-medium">How it works: </span>
            Our proprietary blockchain solution creates a permanent, tamper-proof record of each kratom product's journey from harvest to your facility. This provides unprecedented transparency, facilitates compliance documentation, and enhances your ability to trace products throughout your supply chain.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Steps</h3>
        <p className="text-gray-700 mb-4">A RIM Procurement specialist will contact you within 24 hours to discuss your customized sourcing plan, provide sample options, and arrange payment details.</p>
        <p className="text-sm text-gray-500">Your information is secure and will only be used to contact you regarding your Kratom sourcing needs.</p>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
