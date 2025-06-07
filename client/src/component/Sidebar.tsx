import React from 'react';
import { SideBarItem } from './SidebarItem';
import { TwitterIcon } from '../icons/twitter';
import { YutubeIcon } from '../icons/YoutubeIcon';
import { AllIcon } from '../icons/AllIcon';
import { NotesIcon } from '../icons/NotesIcon';

export function SideBar({ setFilterType }: { setFilterType: (type: "all" | "twitter" | "youtube" | "notes") => void }) {
    return (
        <div className="hidden md:block md:h-screen bg-white border-gray-200 border-r w-72 fixed left-0 top-0 pl-6">
            <div className='text-2xl pt-8 items-center flex '>
                <div className='pr-2  text-purple-800'>
                    <div className='w-15 h-15'>
                        <img src="/logo.png" alt="Logo" />
                    </div>
                </div>
                DropItHere
            </div>
            <div className='pt-8 '>
                <SideBarItem text="All" icon={<AllIcon />} onClick={() => setFilterType("all")} />
                <SideBarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilterType("twitter")} />
                <SideBarItem text="Youtube" icon={<YutubeIcon />} onClick={() => setFilterType("youtube")} />
                <SideBarItem text="Notes" icon={<NotesIcon />} onClick={() => setFilterType("notes")} />
            </div>
        </div>
    );
}