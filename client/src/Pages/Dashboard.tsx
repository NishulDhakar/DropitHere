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

export function Dashboard() {

  const [copied, setCopied] = useState(false);

  const [modalOpen , setModalOpen] = useState(false)
  const {contents , refress} = useContent()
  
  useEffect(() => {
    refress();
  }, [modalOpen])

  return (
    
    <div className='p-4 md:ml-72 min-h-screen border-2 border-gray-200 bg-[#eeeeef]'>
      <div>
       <SideBar />
      </div>
      <div className='p-4'>
      <CreateContentModal open={modalOpen} onClose={() =>{
         setModalOpen(false)
      }} />


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

            const shareUrl = "http://localhost:5173/share/" + response.data.hash;
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
               text = "Add Comment"/>
       </div>
       
       <div className='flex gap-4 flex-wrap mt-8'>

        {contents.map(({type, link , title}) => <Card
         type= {type} 
         link= {link}
         title={title} />)}
       </div>
       </div>
    </div>
  )
}
