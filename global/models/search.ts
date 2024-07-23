import axios from "axios";
import { API_URL } from "../utils/constants";

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
}

function getFormattedSearchResults(data: any): SearchResult[] {
  const searchResults: SearchResult[] = [];

  for (const result of data["bestMatches"]) {
    searchResults.push({
      symbol: result["1. symbol"],
      name: result["2. name"],
      type: result["3. type"],
    });
  }

  return searchResults;
}

export async function search(query: string) {
  let searchResponse;
  try {
    searchResponse = await axios.get("/api/search", {
      params: {
        query, // Pass the query parameter to the API route
      },
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
  // response
  // const searchResponse = await axios.get(API_URL, {
  //   headers: {
  //     Authorization: `${process.env.SEARCH_API_KEY}`,
  //   },
  //   params: {
  //     function: "SYMBOL_SEARCH",
  //     keywords: query,
  //   },
  // });

  const searchData = searchResponse?.data;

  const searchResultItems = getFormattedSearchResults(searchData);

  return searchResultItems;
}
