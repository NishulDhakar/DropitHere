import React, { useState } from "react";
import { DeleteIcon } from "../icons/Delete";
import { NotesIcon } from "../icons/NotesIcon";
import axios from "axios";
import { BACKRND_URL } from "../config";
import { ResizeIcon } from "../icons/ResizeIcon";
import { ResizeIconSmall } from "../icons/ResizeSmall";
import { CopyIcon } from "../icons/CopyIcon";

interface CardProps {
  title: string;
  content: string;
  link: string;
  type?: "notes";
  onDelete?: () => void;
  onUpdated?: () => void;
}

export function NotesCard({ title, content, link, onDelete, onUpdated }: CardProps) {
  const [lastSavedContent] = useState(content || "");
  const [noteContent, setNoteContent] = useState(content || "");
  const [updating, setUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(noteContent);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKRND_URL}/api/v1/content`,
        { link, content: noteContent },
        { headers: { Authorization: token } }
      );
      if (typeof onUpdated === "function") onUpdated(); 
    } catch {
      alert("Failed to update note");
    }
    setUpdating(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  return (
    <div
      className={`
        bg-white dark:bg-zinc-800 
        shadow-md hover:shadow-lg 
        transition-all duration-200 
        rounded-2xl p-4 
        border border-gray-200 dark:border-zinc-700
        flex flex-col
        w-full
        ${isExpanded ? 'col-span-full max-w-3xl' : ''}
      `}
      style={{
        minWidth: 220,
        minHeight: 180,
        maxWidth: isExpanded ? 900 : "100%",
        maxHeight: isExpanded ? 900 : 400,
        transition: "max-width 0.3s, max-height 0.3s"
      }}
    >
      <div className="flex items-start justify-between mb-3 sticky top-0 bg-inherit z-10 pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 flex-1 min-w-0">
          <NotesIcon />
          <span className="truncate" title={title}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ResizeIcon /> : <ResizeIconSmall />}
          </button>

         <button 
            onClick={handleCopy}
            className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded"
            title="Copy note content"
         >
            <CopyIcon />
          </button>


          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
            title="Delete note"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-40px)] flex-1">
        <textarea
          className={`
            w-full p-3 rounded-lg 
            bg-gray-50 dark:bg-zinc-900 
            border border-gray-300 dark:border-zinc-700 
            text-sm text-gray-800 dark:text-white 
            placeholder-gray-400 
            resize-none overflow-auto
            transition-all duration-200
            focus:ring-2 focus:ring-[#7164c0] focus:border-transparent
            flex-1 min-h-0
          `}
          placeholder="Write your markdown notes here..."
          value={noteContent}
          onChange={handleTextareaChange}
          style={{
            minHeight: isExpanded ? '320px' : '80px',
            maxHeight: isExpanded ? '400px' : '120px',
            fontSize: isExpanded ? '1.1rem' : '1rem',
            transition: "min-height 0.3s, max-height 0.3s, font-size 0.3s"
          }}
        />
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-zinc-700 mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {noteContent.length} characters • {noteContent.split('\n').length} lines
          </div>
          <button
            onClick={handleUpdate}
            disabled={updating || noteContent === lastSavedContent}
            className={`
              px-4 py-2 text-sm font-semibold rounded-lg
              transition-all duration-150 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7164c0]
              border shadow-sm
              ${updating || noteContent === lastSavedContent
                ? 'bg-gray-300 dark:bg-zinc-600 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-300 dark:border-zinc-600'
                : 'bg-[#7164c0] dark:bg-blue-500 text-white hover:opacity-90 border-[#7164c0] dark:border-blue-500'
              }
            `}
          >
            {updating ? "Updating..." : noteContent === lastSavedContent ? "No changes" : "Update Note"}
          </button>
        </div>
      </div>
      {showCopied && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-50">
          Copied to clipboard!
        </div>
      )}

      { updating && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-50">
          <div className="text-gray-700 dark:text-gray-300">Updating...</div>
        </div>
      )}
    </div>
  );
}