import React, { useEffect, useState } from 'react';
import { Button } from "../component/Button"
import { PlusIcon } from '../icons/plusicon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from "../component/Card"
import { CreateContentModal } from '../component/CreateContentModal';
import { SideBar } from '../component/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKRND_URL } from '../config';
import { NotesIcon } from '../icons/NotesIcon';
import { CreateNotesModel } from '../component/CreateNotesModel';
import { NotesCard } from '../component/NotesCard';

interface ContentItem {
  type: "twitter" | "youtube" | "notes";
  link: string;
  title: string;
  content?: string; 
}

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [modalOpen , setModalOpen] = useState(false)
  const [notesModel , setNotesModel] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "twitter" | "youtube" | "notes">("all");
  const { contents, refress } = useContent() as { contents: ContentItem[], refress: () => void };
  
  useEffect(() => {
    refress();
  }, [modalOpen])

  useEffect(() => {
    refress();
  },[notesModel])

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
          "Authorization": token,
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
      alert(error instanceof Error ? error.message : "Failed to delete content");
    }
  };

  // Filter contents based on filterType
  const filteredContents = filterType === "all"
    ? contents
    : contents.filter(item => item.type === filterType);

  return (
    <div className='p-4 ml-72 min-h-screen border-2 border-gray-200 bg-[#eeeeef]'>
      <div>
        <SideBar setFilterType={setFilterType} />
      </div>
      <div className='p-4'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <CreateNotesModel open={notesModel} onClose={() => setNotesModel(false)} />


        <div className='flex justify-end gap-4'>


            <Button 
                onClick={ async () => {
      const response = await axios.post(BACKRND_URL + "/api/v1/brain/share/" , {
                  share : true
              } , { 
                  headers : {
                  "Authorization" : localStorage.getItem("token")
                  }
          });

          const shareUrl = "Dropithere.nishul.dev/share/" + response.data.hash;
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true)
          setTimeout(() => setCopied(false), 1000);
          }}
                 startIcon={ <ShareIcon /> } 
                 size ="md" 
                 variant='secondary' 
                 text = {copied ? ("Copied to clipboard") : "Share Brain"}/>

             <Button 
                 onClick={() =>{
                  setModalOpen(true)
                 }}
                 startIcon={<PlusIcon size='lg'/>} 
                 size ="sm"  
                 variant='primary' 
                 text = "Add Links"/>

                 <Button 
                 onClick={() =>{
                  setNotesModel(true)
                 }}
                 startIcon={<NotesIcon/>} 
                 size ="sm"  
                 variant='primary' 
                 text = "Create Notes"/>
         </div>
         
         <div className='flex gap-4 flex-wrap mt-8'>
          {filteredContents.map(({ type, link, title, content }, idx) => {
            if (type === "notes") {
              return (
                <NotesCard
                  key={link + type + idx}
                  title={title}
                  type={type}
                  content={content ?? ""}
                  link={link} 
                  onDelete={() => handleDelete(link)}
                />
              );
            } else {
              return (
                <Card
                  key={link + type + idx}
                  type={type}
                  link={link}
                  title={title}
                  onDelete={() => handleDelete(link)}
                />
              );
            }
          })}
         </div>
         </div>
      </div>
  )
}