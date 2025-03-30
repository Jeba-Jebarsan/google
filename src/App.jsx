import React, { useState, useCallback } from 'react';
    import axios from 'axios';
    import SearchBar from './components/SearchBar';
    import SearchResults from './components/SearchResults';
    import LoadingSpinner from './components/LoadingSpinner';

    // --- Configuration ---
    const API_KEY = "AIzaSyAzu8HuhxSiRnGK_memN_TKdFPsc6r6ecg"; // Your API Key
    const SEARCH_ENGINE_ID = "91bbbb44c859f4793"; // IMPORTANT: Replace with your Search Engine ID (cx)
    const GOOGLE_LOGO_URL = "https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    // ---------------------

    function App() {
      const [query, setQuery] = useState('');
      const [results, setResults] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [showHomepage, setShowHomepage] = useState(true);

      const handleSearch = useCallback(async (searchQuery) => {
        if (!searchQuery.trim()) return;
        if (!SEARCH_ENGINE_ID || SEARCH_ENGINE_ID === "YOUR_SEARCH_ENGINE_ID") {
           setError("Please provide your Google Custom Search Engine ID (cx) in src/App.jsx");
           setLoading(false);
           setShowHomepage(false);
           setResults(null);
           return;
        }

        setQuery(searchQuery);
        setLoading(true);
        setError(null);
        setResults(null);
        setShowHomepage(false); // Hide homepage elements when searching

        const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchQuery)}`;

        try {
          const response = await axios.get(url);
          console.log("API Response:", response.data); // Log API response for debugging
          if (response.data.items) {
            setResults(response.data);
          } else {
            setResults({ items: [] }); // Handle cases with no results
          }
        } catch (err) {
          console.error("API Error:", err);
          let errorMessage = "An error occurred while fetching search results.";
          if (err.response) {
            // Server responded with a status code outside the 2xx range
            errorMessage = `Error ${err.response.status}: ${err.response.data?.error?.message || 'Failed to fetch results.'}`;
            if (err.response.status === 403) {
              errorMessage += " Check your API key and Search Engine ID (cx). Ensure the Custom Search API is enabled for your project.";
            } else if (err.response.status === 400 && err.response.data?.error?.message.includes('invalid value')) {
               errorMessage += " Check if the Search Engine ID (cx) is correct.";
            }
          } else if (err.request) {
            // Request was made but no response received
            errorMessage = "Network error. Please check your connection.";
          }
          setError(errorMessage);
          setResults(null);
        } finally {
          setLoading(false);
        }
      }, []);

      const handleLogoClick = () => {
        setShowHomepage(true);
        setResults(null);
        setError(null);
        setQuery('');
      }

      return (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className={`flex items-center p-4 ${!showHomepage ? 'border-b border-search-border' : ''}`}>
            {!showHomepage && (
              <img
                src={GOOGLE_LOGO_URL}
                alt="Google Logo"
                className="h-8 mr-6 cursor-pointer"
                onClick={handleLogoClick}
              />
            )}
             {!showHomepage && (
               <div className="flex-grow max-w-2xl">
                 <SearchBar initialQuery={query} onSearch={handleSearch} showButtons={false} />
               </div>
             )}
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col items-center justify-start p-6">
            {showHomepage && (
              <div className="flex flex-col items-center justify-center flex-grow -mt-20">
                <img
                  src={GOOGLE_LOGO_URL}
                  alt="Google Logo"
                  className="h-24 mb-8"
                />
                <div className="w-full max-w-xl">
                   <SearchBar onSearch={handleSearch} showButtons={true} />
                </div>
              </div>
            )}

            {loading && <LoadingSpinner />}

            {error && !loading && (
              <div className="text-center text-google-red mt-8 bg-red-100 p-4 rounded border border-google-red max-w-2xl w-full">
                <p><strong>Error:</strong></p>
                <p>{error}</p>
                {error.includes("Search Engine ID") && (
                   <p className="mt-2 text-sm">You can create one at <a href="https://programmablesearchengine.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Programmable Search Engine</a>.</p>
                )}
              </div>
            )}

            {results && !loading && !error && (
              <SearchResults results={results} />
            )}
          </main>

          {/* Footer (Optional) */}
          {/* <footer className="bg-search-bg p-4 text-sm text-gray-600 border-t border-search-border">
            <div className="container mx-auto text-center">
              Footer content here
            </div>
          </footer> */}
        </div>
      );
    }

    export default App;
