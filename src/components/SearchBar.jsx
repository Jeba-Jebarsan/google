import React, { useState, useEffect } from 'react';
    import { Search, Mic } from 'lucide-react'; // Using lucide-react for icons

    const SearchBar = ({ initialQuery = '', onSearch, showButtons = false }) => {
      const [inputValue, setInputValue] = useState(initialQuery);

      useEffect(() => {
        setInputValue(initialQuery); // Sync input value if initialQuery changes (e.g., from App state)
      }, [initialQuery]);

      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
      };

      const handleFeelingLucky = () => {
        // Google's "I'm Feeling Lucky" typically redirects to the first result.
        // Implementing this accurately requires knowing the first result URL *before* showing results,
        // which isn't standard with the Custom Search API response structure used here.
        // We'll just perform a regular search for simplicity.
        console.log("Feeling Lucky clicked! Performing regular search.");
        onSearch(inputValue);
      };

      return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="flex items-center w-full border border-search-border rounded-full px-4 py-2 hover:shadow-md focus-within:shadow-md transition-shadow duration-200 bg-white max-w-xl">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow focus:outline-none text-search-text text-base"
              aria-label="Search"
            />
            <Mic size={20} className="text-google-blue ml-3 cursor-pointer" /> {/* Placeholder Mic icon */}
          </div>

          {showButtons && (
            <div className="flex justify-center mt-7 space-x-3">
              <button
                type="submit"
                className="bg-search-bg text-search-text text-sm py-2 px-4 rounded border border-transparent hover:border-search-border hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue transition-all"
              >
                Google Search
              </button>
              <button
                type="button"
                onClick={handleFeelingLucky}
                className="bg-search-bg text-search-text text-sm py-2 px-4 rounded border border-transparent hover:border-search-border hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue transition-all"
              >
                I'm Feeling Lucky
              </button>
            </div>
          )}
        </form>
      );
    };

    export default SearchBar;
