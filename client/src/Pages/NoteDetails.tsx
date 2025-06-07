import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Printer, Edit2, Save } from "lucide-react";
import { BACKRND_URL } from "../config";

export function NoteDetails() {
  const { title } = useParams<{ title: string }>();
  const [note, setNote] = useState<{ content: string; title: string; link?: string; createdAt?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${BACKRND_URL}/api/v1/content/note/${encodeURIComponent(title ?? "")}`,
          {
            headers: { Authorization: token ?? "" },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error("Note not found");
        setNote(data);
        setEditContent(data.content);
      } catch {
        setNote(null);
      }
      setLoading(false);
    }
    fetchNote();
  }, [title]);

  const handleCopy = async () => {
    if (!note?.content) return;
    try {
      await navigator.clipboard.writeText(note.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!note) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKRND_URL}/api/v1/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ?? "",
        },
        body: JSON.stringify({
          link: note.link,
          content: editContent,
        }),
      });
      if (res.ok) {
        setNote({ ...note, content: editContent });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Note Not Found</h2>
          <p className="text-slate-600 mb-6">The note you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all duration-200 font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-full transition-all duration-200"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 text-slate-600"
                title="Copy content"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 text-slate-600"
                title="Print note"
              >
                <Printer size={18} />
              </button>
             
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 text-slate-600"
                  title="Edit note"
                >
                  <Edit2 size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 text-green-600"
                  title="Save note"
                >
                  <Save size={18} />
                </button>
              )}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 leading-tight">
            {note.title}
          </h1>

        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl overflow-hidden">
          <div className="p-8">
            {isEditing ? (
              <textarea
                className="w-full min-h-[200px] p-3 rounded-lg border border-slate-300 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                autoFocus
              />
            ) : (
              <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-lg">
                {note.content}
              </pre>
            )}
          </div>
        </div>
        {copied && (
          <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
            ✓ Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteDetails;