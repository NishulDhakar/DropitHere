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
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-500">Loading shared dashboard...</span>
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