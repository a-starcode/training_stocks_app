// pages/api/external.js

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../global/utils/constants";

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req.query; // Retrieve the query parameter from the request URL

    const response = await axios.get(`${API_URL}`, {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: query,
        apikey: process.env.SEARCH_API_KEY,
      },
    });

    // Process the response data
    res.status(200).json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
