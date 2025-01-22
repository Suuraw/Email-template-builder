import  { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import HomePage from "./components/HomePage";
import Spinner from "./components/spinner"; 

function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Router>
      <div>
        {loading ? (
          <Spinner /> // Show spinner while loading
        ) : (
          <Routes>
            {/* Route for the homepage */}
            <Route path="/" element={<HomePage />} />

            {/* Route for the editor */}
            <Route path="/editor" element={<Editor />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
