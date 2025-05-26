import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKRND_URL } from '../config';
import { Card } from "../component/Card";

interface ContentItem {
  type: "twitter" | "youtube";
  link: string;
  title: string;
}

export function SharedDashboard() {
  const { shareId } = useParams();
  const [state, setState] = useState<{
    contents: ContentItem[];
    isLoading: boolean;
    error: string | null;
  }>({
    contents: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    axios.get(`${BACKRND_URL}/api/v1/brain/${shareId}`)
      .then(res => {
        const data = res.data.contents || res.data.content || [];
        setState({ contents: Array.isArray(data) ? data : [], isLoading: false, error: null });
      })
      .catch(err => {
        const errorMsg = err.response?.data?.message || 
                         err.response?.data?.massage || 
                         'Failed to load content';
        setState({ contents: [], isLoading: false, error: errorMsg });
      });
  }, [shareId]);

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#eeeeef]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen bg-[#eeeeef]">
        <div className="bg-white p-6 rounded shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-700">{state.error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.contents.length === 0) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen bg-[#eeeeef]">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">No Content</h2>
          <p>This shared collection is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-[#eeeeef]">
      <h2 className="text-2xl font-bold mb-6">Shared Content</h2>
      <div className="flex gap-4 flex-wrap">
        {state.contents.map((content, index) => (
          <Card key={index} type={content.type} link={content.link} title={content.title} />
        ))}
      </div>
    </div>
  );
}