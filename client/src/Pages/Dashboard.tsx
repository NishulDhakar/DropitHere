import React, { useEffect, useState } from "react";
import { SideBar } from "../component/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKRND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardContentGrid } from "../component/DeshboardContentGrid"; 
import { SignupPromptModal } from "../component/SignupPromptModal";
import { CreateContentModal } from "../component/CreateContentModal";
import { CreateNotesModel } from "../component/CreateNotesModel";

interface ContentItem {
  type: "twitter" | "youtube" | "notes";
  link: string;
  title: string;
  content?: string;
}

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notesModel, setNotesModel] = useState(false);
  const [filterType, setFilterType] = useState<
    "all" | "twitter" | "youtube" | "notes"
  >("all");
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const { contents, refress } = useContent() as {
    contents: ContentItem[];
    refress: () => void;
  };
  const navigate = useNavigate();

  const isGuest = localStorage.getItem("guest") === "true";

  useEffect(() => {
    refress();
  }, [modalOpen, notesModel]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
    navigate("/signin");
  }

  const handleDelete = async (link: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please sign in to delete content");
        return;
      }
      const res = await fetch(`${BACKRND_URL}/api/v1/content`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ link }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete content");
      }
      await refress();
    } catch (error) {
      console.error("Error deleting content:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete content"
      );
    }
  };

  const filteredContents =
    filterType === "all"
      ? contents
      : contents.filter((item) => item.type === filterType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex flex-col md:flex-row relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(120,119,198,0.05),_transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.05),_transparent_70%)] pointer-events-none"></div>

      <SideBar
        setFilterType={setFilterType}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 transition-all duration-500 ease-in-out ${
          collapsed ? "md:ml-20" : "md:ml-72"
        } w-full relative z-10`}
      >
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <CreateNotesModel
          open={notesModel}
          onClose={() => setNotesModel(false)}
        />

        <DashboardHeader
          filteredCount={filteredContents.length}
          filterType={filterType}
          isLoading={isLoading}
          isGuest={isGuest}
          onShare={async () => {
            setIsLoading(true);
            try {
              const response = await fetch(
                BACKRND_URL + "/api/v1/brain/share/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token") || "",
                  },
                  body: JSON.stringify({ share: true }),
                }
              );
              if (!response.ok) throw new Error("Failed to share");
              const data = await response.json();
              const shareUrl = "http://localhost:5173/share/" + data.hash;
              await navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch (error) {
              console.error("Error sharing:", error);
            } finally {
              setIsLoading(false);
            }
          }}
          onAddLink={() => {
            if (isGuest) {
              setShowSignupPrompt(true);
              return;
            }
            setModalOpen(true);
          }}
          onAddNote={() => {
            if (isGuest) {
              setShowSignupPrompt(true);
              return;
            }
            setNotesModel(true);
          }}
          onLogout={handleLogout}
        />

        {copied && (
          <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
            ✓ Link copied to clipboard!
          </div>
        )}

        <DashboardContentGrid
          filterType={filterType}
          setFilterType={setFilterType}
          filteredContents={filteredContents}
          handleDelete={handleDelete}
        />

        <SignupPromptModal
          open={showSignupPrompt}
          onClose={() => setShowSignupPrompt(false)}
        />
      </div>
    </div>
  );
}
