import React, { ReactElement } from 'react';

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
}
export function SideBarItem(props: SideBarItemProps) {
    return (
        <div
            className='flex text-gray-700 py-2 cursor-pointer hover:bg-gray-100 rounded max-w-48 pl-4 transition-all duration-150'
            onClick={props.onClick}
        >
            <div className='pr-2'>
                {props.icon}
            </div>
            <div className=''>
                {props.text}
            </div>
        </div>
    );
}