import React, { useState } from "react";
import { DeleteIcon } from "../icons/Delete";
import { NotesIcon } from "../icons/NotesIcon";
import axios from "axios";
import { BACKRND_URL } from "../config";
import { ResizeIcon } from "../icons/ResizeIcon";
import { ResizeIconSmall } from "../icons/ResizeSmall";

interface CardProps {
  title: string;
  content: string;
  link: string;
  type?: "notes";
  onDelete?: () => void;
}

export function NotesCard({ title, content, link, onDelete }: CardProps) {
  const [noteContent, setNoteContent] = useState(content || "");
  const [updating, setUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKRND_URL}/api/v1/content`,
        { link, content: noteContent },
        { headers: { Authorization: token } }
      );
      alert("Note updated!");
    } catch {
      alert("Failed to update note");
    }
    setUpdating(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  return (
    <div className={`
      bg-white dark:bg-zinc-800 
      shadow-md hover:shadow-lg 
      transition-all duration-200 
      rounded-2xl p-4 
      border border-gray-200 dark:border-zinc-700
      w-full
      ${isExpanded ? 'col-span-full max-w-none' : 'max-w-2xl'}
      resize-container relative
    `}>

      <div className="flex items-start justify-between mb-3 sticky top-0 bg-inherit z-10 pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 flex-1 min-w-0">
          <NotesIcon/>
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
            onClick={onDelete} 
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
            title="Delete note"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>


      <div className="space-y-4">
        <textarea
          className={`
            w-full p-3 rounded-lg 
            bg-gray-50 dark:bg-zinc-900 
            border border-gray-300 dark:border-zinc-700 
            text-sm text-gray-800 dark:text-white 
            placeholder-gray-400 
            resize-y overflow-auto
            transition-all duration-200
            focus:ring-2 focus:ring-[#7164c0] focus:border-transparent
            ${isExpanded ? 'min-h-[400px] max-h-[80vh]' : 'min-h-[120px] max-h-[600px]'}
          `}
          placeholder="Write your markdown notes here..."
          value={noteContent}
          onChange={handleTextareaChange}
          style={{ 
            resize: "vertical",
            minHeight: isExpanded ? '400px' : '120px',
            maxHeight: isExpanded ? '80vh' : '600px'
          }}
        />


        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-zinc-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {noteContent.length} characters • {noteContent.split('\n').length} lines
          </div>
          <button
            onClick={handleUpdate}
            disabled={updating || noteContent === content}
            className={`
              px-4 py-2 text-sm font-semibold rounded-lg
              transition-all duration-150 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7164c0]
              border shadow-sm
              ${updating || noteContent === content
                ? 'bg-gray-300 dark:bg-zinc-600 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-300 dark:border-zinc-600'
                : 'bg-[#7164c0] dark:bg-blue-500 text-white hover:opacity-90 border-[#7164c0] dark:border-blue-500'
              }
            `}
          >
            {updating ? "Updating..." : noteContent === content ? "No changes" : "Update Note"}
          </button>
        </div>
      </div>
      

      <div className="absolute bottom-2 right-2 w-3 h-3 opacity-30 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400">
          <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z"/>
        </svg>
      </div>
    </div>
  );
}