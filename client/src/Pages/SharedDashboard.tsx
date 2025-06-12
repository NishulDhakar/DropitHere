import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKRND_URL } from "../config";
import { Card } from "../component/Card";
import { NotesCard } from "../component/NotesCard";

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
    error: null,
  });

  useEffect(() => {
    axios
      .get(`${BACKRND_URL}/api/v1/brain/snapshot/${shareId}`)
      .then((res) => {
        const data = res.data.contents || [];
        setState({
          contents: Array.isArray(data) ? data : [],
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message ||
          err.response?.data?.massage ||
          "Failed to load content";
        setState({ contents: [], isLoading: false, error: errorMsg });
      });
  }, [shareId]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(120,119,198,0.1),_transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.1),_transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-indigo-300 rounded-full animate-bounce opacity-60"></div>
        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="w-16 h-16 relative mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-blue-400 to-purple-500 animate-spin border-t-transparent"></div>
              <div className="absolute inset-2 rounded-full border-2 border-gradient-to-r from-purple-400 to-pink-400 animate-spin animate-reverse border-b-transparent"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
                Loading Knowledge Hub
              </h3>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Error</h2>
          <p className="text-gray-600 mb-6">{state.error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.contents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-500 text-lg">This shared collection is empty.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {state.contents.map(({ type, link, title, content }, idx) => (
            <div key={link + type + idx}>
              {type === "notes" ? (
                <NotesCard
                  title={title}
                  type={type}
                  content={content ?? ""}
                  link={link}
                />
              ) : (
                <Card
                  type={type}
                  link={link}
                  title={title}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
