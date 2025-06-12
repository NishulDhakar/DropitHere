import React from "react";
import { Button } from "../component/Button";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/ShareIcon";
import { NotesIcon } from "../icons/NotesIcon";

interface DashboardHeaderProps {
  filteredCount: number;
  filterType: string;
  isLoading: boolean;
  isGuest: boolean;
  onShare: () => void;
  onAddLink: () => void;
  onAddNote: () => void;
  onLogout: () => void;
}

export function DashboardHeader({
  filteredCount,
  filterType,
  isLoading,
  isGuest,
  onShare,
  onAddLink,
  onAddNote,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            {filteredCount} {filterType === "all" ? "items" : filterType} saved
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              onClick={onShare}
              startIcon={<ShareIcon />}
              size="md"
              variant="secondary"
              text={isLoading ? "Sharing..." : "Share Deshboard"}
              disabled={isGuest || isLoading}
            />
            <Button
              onClick={onAddLink}
              startIcon={<PlusIcon size="lg" />}
              size="sm"
              variant="primary"
              text="Add Links"
            />
            <Button
              onClick={onAddNote}
              startIcon={<NotesIcon />}
              size="sm"
              variant="primary"
              text="Create Notes"
            />
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}