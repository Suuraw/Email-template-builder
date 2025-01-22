import email from "../assests/email.png";
import news from "../assests/news.png";
import product from "../assests/product.png";
import invite from "../assests/invite.png";
// import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// interface HomePageProps {
//   setQueryPara: React.Dispatch<React.SetStateAction<string>>;
// }

function HomePage() {
  const navigate = useNavigate();
  const handleTemplateClick = (template: string) => {
    switch (template) {
      case "Template 1":
        localStorage.setItem("queryPara", "123");
        break;
      case "Template 2":
        localStorage.setItem("queryPara", "124");
        break;
      case "Template 3":
        localStorage.setItem("queryPara", "125");
        break;
      case "Template 4":
        localStorage.setItem("queryPara", "126");
        break;
      default:
        console.error("Invalid template selected");
    }
    navigate('/editor');    
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Other sections remain the same */}

      {/* Templates Preview */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Start with Beautiful Templates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[email, invite,news,product].map((img, index) => {
              const templateName = `Template ${index + 1}`;
              return (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"

                >
                  <img
                    src={img}
                    alt={templateName}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold mb-2">{templateName}</h3>
                    <p className="text-gray-600 mb-4">Professional design for your email campaigns</p>
                    <button
                      onClick={() => handleTemplateClick(templateName)}
                      className="text-blue-600 font-semibold hover:text-blue-700"
                    >
                      Use Template → 
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other sections remain the same */}
    </div>
  );
}

export default HomePage;
