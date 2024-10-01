import React, { useState } from "react";
import "./InputBar.css";
import { FaCamera, FaUpload } from "react-icons/fa";

interface InputBarProps {
  onSearch: (ingredients: string) => void; // Pass ingredients to parent
  loading: boolean; // Pass loading state
  setLoading: (loading: boolean) => void; // Setter for loading state
}

const InputBar: React.FC<InputBarProps> = ({
  onSearch,
  loading,
  // setLoading,
}) => {
  const [input, setInput] = useState<string>(""); // State for input value

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input); // Pass input to parent component
    }
  };

  return (
    <div className="input-bar-container">
      <form onSubmit={handleSubmit} className="input-bar-form">
        <div className="icon-buttons">
          <button type="button" className="icon-button">
            <FaCamera size={18} />
          </button>
          <button type="button" className="icon-button">
            <FaUpload size={18} />
          </button>
        </div>
        <input
          type="text"
          className="input-bar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here to add ingredients"
        />
        <button
          type="submit"
          className="search-button"
          style={{ fontSize: "14px" }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default InputBar;
