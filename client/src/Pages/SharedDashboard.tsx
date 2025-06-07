import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKRND_URL } from '../config';
import { Card } from "../component/Card";
import { NotesCard } from '../component/NotesCard';

interface ContentItem {
  type: "twitter" | "youtube" | "notes";
  link: string;
  title: string;
  content?: string; 
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
     <div className='flex gap-4 flex-wrap mt-8'>
              {state.contents.map(({ type, link, title, content }, idx) => {
                if (type === "notes") {
                  return (
                    <NotesCard
                      key={link + type + idx}
                      title={title}
                      type={type}
                      content={content ?? ""}
                      link={link} 
                    
                    />
                  );
                } else {
                  return (
                    <Card
                      key={link + type + idx}
                      type={type}
                      link={link}
                      title={title}
                    />
                  );
                }
              })}
             </div>
  );
}