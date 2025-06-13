import React, { useRef, useState } from "react";
import { CrossIcon } from "../icons/Crossicon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKRND_URL } from "../config";

enum contentType {
  Notes = "notes",
}
export function CreateNotesModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type] = useState(contentType.Notes);

  const [mathQuestion] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return `What is ${a} + ${b}?`;
  });

  const [showSolveMsg, setShowSolveMsg] = useState(false);

  async function addContent() {
    if (!titleRef.current || !linkRef.current) return;

    const title = titleRef.current.value;
    const link = linkRef.current.value;

    if (title && !link) {
      setShowSolveMsg(true);
      setTimeout(() => setShowSolveMsg(false), 2000);
      return;
    }

    await axios.post(
      `${BACKRND_URL}/api/v1/content`,
      { link, type, title },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    onClose();
  }
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-white text-center">
                Add New Content
              </h2>
              <Input reference={titleRef} placeholder="Enter title" />
              <div className="">
                <Input reference={linkRef} placeholder={mathQuestion} />
              </div>
              {showSolveMsg && (
                <div className="text-center text-red-500 font-semibold text-sm mt-2">
                  Solve it legend 🫡
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-center">
              <Button
                onClick={addContent}
                variant="primary"
                text="Submit"
                size="md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
