import React from 'react';
import { SideBarItem } from './SidebarItem';
import { TwitterIcon } from '../icons/twitter';
import { YputubeIcon } from '../icons/YoutubeIcon';
import { LogoIcon } from '../icons/LogoIcon';
export function SideBar (){
    return <div className="h-screen bg-white border-gray-200 border-r w-72 fixed left-0 top-0 pl-6  ">

        <div className='text-2xl pt-8 items-center flex '>
            <div className='pr-2  text-purple-800'>
            <LogoIcon />
            </div>
            DropItHere
        </div>
        <div className='pt-8 '>
            <SideBarItem text="Twitter" icon={<TwitterIcon />} />
            <SideBarItem text="Youtube" icon={<YputubeIcon  />} />
            
        </div>

    </div>
}