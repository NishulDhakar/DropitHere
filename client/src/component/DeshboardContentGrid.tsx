import React from "react";
import { Card } from "./Card";
import { NotesCard } from "./NotesCard";

interface ContentItem {
  type: "twitter" | "youtube" | "notes";
  link: string;
  title: string;
  content?: string;
}

interface DashboardContentGridProps {
  filterType: string;
  setFilterType: (type: "all" | "twitter" | "youtube" | "notes") => void;
  filteredContents: ContentItem[];
  handleDelete: (link: string) => void;
}

export function DashboardContentGrid({
  filterType,
  setFilterType,
  filteredContents,
  handleDelete,
}: DashboardContentGridProps) {
  return (
    <div className="p-4 md:p-8 pt-6">
      {filterType !== "all" && (
        <div className="mb-6 flex items-center gap-2">
          <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Showing {filterType} content
          </div>
          <button
            onClick={() => setFilterType("all")}
            className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors"
          >
            Show all
          </button>
        </div>
      )}

      {filteredContents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-slate-300 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            No content yet
          </h3>
          <p className="text-slate-500 mb-6 max-w-md">
            Start building your store by adding links or creating notes
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContents.map(({ type, link, title, content }, idx) => (
            <div
              key={link + type + idx}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{
                animationDelay: `${idx * 50}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {type === "notes" ? (
                <NotesCard
                  title={title}
                  type={type}
                  content={content ?? ""}
                  link={link}
                  onDelete={() => handleDelete(link)}
                />
              ) : (
                <Card
                  type={type}
                  link={link}
                  title={title}
                  onDelete={() => handleDelete(link)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}