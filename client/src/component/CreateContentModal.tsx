import React, { useRef, useState } from "react";
import { CrossIcon } from "../icons/Crossicon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKRND_URL } from "../config";

enum contentType {
  Youtube = "youtube",
  Twitter = "twitter",
}
export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);

  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(contentType.Youtube);

  async function addContent() {
    if (!titleRef.current || !linkRef.current) return;

    const title = titleRef.current.value;
    const link = linkRef.current.value;

    await axios.post(
      BACKRND_URL + "/api/v1/content",
      {
        link,
        type,
        title,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    onClose();
  }

  return (
    <div>
      {open && (
  <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4">
    <div className="bg-white dark:bg-zinc-900 w-full max-w-lg p-6 rounded-2xl shadow-xl space-y-6">
      
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
          <CrossIcon />
        </button>
      </div>
      <div className="space-y-4">
        <Input reference={titleRef} placeholder="Title" />
        
        {type === contentType.Youtube && (
          <Input reference={linkRef} placeholder="YouTube Video Link" />
        )}
        
        {type === contentType.Twitter && (
          <Input reference={linkRef} placeholder="Tweet Link" />
        )}
      </div>
      <div>
        <div className="flex justify-center gap-4">
          <Button
            size="md"
            text="YouTube"
            variant={type === contentType.Youtube ? "primary" : "secondary"}
            onClick={() => setType(contentType.Youtube)}
          />
          <Button
            size="md"
            text="Twitter"
            variant={type === contentType.Twitter ? "primary" : "secondary"}
            onClick={() => setType(contentType.Twitter)}
          />
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button onClick={addContent} variant="primary" text="Submit" size="md" />
      </div>
    </div>
  </div>
)}
    </div>
  );
}