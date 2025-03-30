import React from 'react';

    const SearchResults = ({ results }) => {
      if (!results || !results.items || results.items.length === 0) {
        return <p className="text-center mt-8 text-gray-600">No results found.</p>;
      }

      const searchInfo = results.searchInformation;

      return (
        <div className="w-full max-w-2xl mt-6">
          {searchInfo && (
            <p className="text-sm text-gray-600 mb-4">
              About {searchInfo.formattedTotalResults} results ({searchInfo.formattedSearchTime} seconds)
            </p>
          )}

          {results.items.map((item, index) => (
            <div key={item.cacheId || index} className="mb-6">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-result-url hover:underline block truncate"
              >
                {item.formattedUrl}
              </a>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-link-blue hover:underline visited:text-visited-link block"
              >
                {item.title}
              </a>
              <p className="text-sm text-result-snippet mt-1">
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      );
    };

    export default SearchResults;
