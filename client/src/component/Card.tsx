import React from "react"
import { ShareIcon } from "../icons/ShareIcon"


interface CardProps {
    title : string;
    link : string;
    type : "twitter" | "youtube"
}

export function Card({title, link , type} : CardProps) {

    return <div>
        <div className="text-black bg-white min-w-72 min-h-48 p-4 rounded-md border-gray-200 border">
           <div className="flex justify-between">

            <div className="flex items-center text-md">
                <div className="text-gray-500  pr-2">
                <ShareIcon />
                </div>
                {title}
            </div>
            <div className="flex">
                <div  className="pr-2 text-gray-500">
                    <a href={link} target="_blank">
                <ShareIcon /></a>
                </div>
                <div className="text-gray-500">
                <ShareIcon />
                </div>
            </div>

        </div>

        <div className="">
        {type === "youtube" && (
                   <iframe
                     className="w-full aspect-video"
                     src={`https://www.youtube.com/embed/${link.match(/[?&]v=([^&]+)/)?.[1]}`}
                     title="YouTube video player"
                     frameBorder={0}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     referrerPolicy="strict-origin-when-cross-origin"
                     allowFullScreen
                   ></iframe>
                 )}

        {type === "twitter" && <blockquote className="twitter-tweet">
             <a href={link.replace("x.com", "twitter.com")}>
             </a>
             </blockquote> }

          </div>
     </div>
</div>
}

