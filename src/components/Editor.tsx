import React, { useEffect } from "react";
import { Canvas } from "../components/Canvas";
import { EditorPanel } from "../components/EditorPanel";
import { ArrowLeft } from "lucide-react";
import { useTemplateStore } from "../store/templateStore";
import { useNavigate } from "react-router-dom";

function Editor() {
  const { discardChanges, saveTemplate } = useTemplateStore();
  const [isSaving, setIsSaving] = React.useState(false);
  const navigate = useNavigate(); // Call useNavigate at the top level

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveTemplate();
      alert("Template saved successfully!");
    } catch (error) {
      alert("Failed to save template. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#loaded";
      window.location.reload();
    }
  }, []);

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      discardChanges();
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="hover:bg-gray-100 p-2 rounded-md" onClick={handleBackClick}>
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <span className="text-sm font-medium">Welcome email</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              className={`px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1 ${
                isSaving ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex">
        <Canvas />
        <EditorPanel />
      </main>
    </div>
  );
}

export default Editor;
