import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKRND_URL } from "../config";
import { Card } from "../component/Card";
import { NotesCard } from "../component/NotesCard";
import { Footer } from "../component/Footer";

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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(239,68,68,0.05),_transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-200 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Oops! Something went wrong</h2>
          <p className="text-slate-600 mb-6">{state.error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.contents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(120,119,198,0.05),_transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.05),_transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10 max-w-lg mx-auto text-center p-8">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6 mx-auto relative">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed">
              This shared collection Empty. 
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-8">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(120,119,198,0.05),_transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.05),_transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-60 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-40 left-32 w-3 h-3 bg-indigo-300 rounded-full animate-bounce opacity-25"></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-100/10 to-purple-100/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
      
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['twitter', 'youtube', 'notes'].map(type => {
                  const count = state.contents.filter(item => item.type === type).length;
                  if (count === 0) return null;
                  const colors = {
                    twitter: 'from-blue-50 to-cyan-50 border-blue-200/50 text-blue-700',
                    youtube: 'from-red-50 to-pink-50 border-red-200/50 text-red-700',
                    notes: 'from-green-50 to-emerald-50 border-green-200/50 text-green-700'
                  };
                  return (
                    <div key={type} className={`px-4 py-2 bg-gradient-to-r ${colors[type]} border rounded-full text-sm font-medium flex items-center gap-2`}>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      {count} {type}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {state.contents.map(({ type, link, title, content }, idx) => {
              return (
                <div
                  key={link + type + idx}
                  className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 group"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none"></div>
          <Footer />
        </div>
      </div>
    
  );
}