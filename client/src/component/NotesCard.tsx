import React from "react";
import { DeleteIcon } from "../icons/Delete";
import { NotesIcon } from "../icons/NotesIcon";
import axios from "axios";
import { BACKRND_URL } from "../config";

interface CardProps {
  title: string;
  content: string;
  link: string;
  type ?: "notes";
  onDelete?: () => void;
}

export function NotesCard({ title, content, link, onDelete }: CardProps) {
  const [noteContent, setNoteContent] = React.useState(content || "");
  const [updating, setUpdating] = React.useState(false);

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

  return (
    <div className="bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all duration-200 rounded-2xl p-4 w-full max-w-md border border-gray-200 dark:border-zinc-700">
      <div className="flex items-start justify-between mb-3">
        <span className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          <NotesIcon />
          {title}
        </span>
        <button onClick={onDelete} className="text-gray-400 hover:text-red-500 transition-all">
          <DeleteIcon />
        </button>
      </div>

      <textarea
        className="w-full p-3 mb-4 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-sm text-gray-800 dark:text-white placeholder-gray-400"
        rows={5}
        placeholder="Write your markdown notes here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        disabled={updating}
        className="bg-[#7164c0] dark:bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7164c0] border border-gray-200 shadow-sm"
      >
        {updating ? "Updating..." : "Update Note"}
      </button>
    </div>
  );
}
