import React, { useEffect, useState } from "react";
import { Button } from "../component/Button";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../component/Card";
import { CreateContentModal } from "../component/CreateContentModal";
import { SideBar } from "../component/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKRND_URL } from "../config";
import { NotesIcon } from "../icons/NotesIcon";
import { CreateNotesModel } from "../component/CreateNotesModel";
import { NotesCard } from "../component/NotesCard";

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
  const { contents, refress } = useContent() as {
    contents: ContentItem[];
    refress: () => void;
  };

  useEffect(() => {
    refress();
  }, [modalOpen]);

  useEffect(() => {
    refress();
  }, [notesModel]);

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

        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
          <div className="p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-slate-600 mt-1 text-sm md:text-base">
                {filteredContents.length}{" "}
                {filterType === "all" ? "items" : filterType} saved
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  onClick={async () => {
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
                      const shareUrl =
                        "dropithere.nishul.dev/share/" + data.hash;
                      await navigator.clipboard.writeText(shareUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    } catch (error) {
                      console.error("Error sharing:", error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  startIcon={<ShareIcon />}
                  size="md"
                  variant="secondary"
                  text={
                    isLoading
                      ? "Sharing..."
                      : "Share Deshboard"
                  }
                />

                <Button
                  onClick={() => setModalOpen(true)}
                  startIcon={<PlusIcon size="lg" />}
                  size="sm"
                  variant="primary"
                  text="Add Links"
                />

                <Button
                  onClick={() => setNotesModel(true)}
                  startIcon={<NotesIcon />}
                  size="sm"
                  variant="primary"
                  text="Create Notes"
                />
              </div>
            </div>
          </div>
        </div>

        {copied && (
          <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
            ✓ Link copied to clipboard!
          </div>
        )}

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
                Start building your store by adding links or creating
                notes
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContents.map(({ type, link, title, content }, idx) => {
                return (
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
