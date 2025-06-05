import React, { useRef, useState } from "react"
import { CrossIcon } from "../icons/Crossicon"
import { Input } from "./Input"
import { Button } from "./Button"
import axios from "axios";
import { BACKRND_URL } from "../config";

enum contentType{
    Youtube = "youtube",
    Twitter = "twitter"

}
export function CreateContentModal({open , onClose}){

    
    const titleRef = useRef<HTMLInputElement>(null);

    const linkRef = useRef<HTMLInputElement>(null);
    const[ type , setType] = useState(contentType.Youtube);

    async function addContent() {
        if (!titleRef.current || !linkRef.current) return;

        const title = titleRef.current.value;
        const link = linkRef.current.value;

        await axios.post(BACKRND_URL + "/api/v1/content", {
            link,
            type,
            title,
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        onClose();
    }

    return <div>
        {open && <div className="w-screen h-screen fixed  top-0 left-0 bg-gray-50 flex justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                        <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input reference={titleRef} placeholder="Title"/>
                        <Input reference={linkRef}  placeholder= "Link — youtube / twitter" />
                    </div>

                    <div>
                        <div className="flex justify-center text-lg font-semibold border-b pb-2 pt-2 mb-2">
                            <h1>Type</h1>
                        </div>
                        <div className="flex gap-1 justify-center  pb-2">
                        <Button size="md" text= "Youtube" variant={type === contentType.Youtube ? "primary" : "secondary"} onClick={() => {
                            setType(contentType.Youtube)
                        }}></Button>
                        <Button size="md" text= "Twitter" variant={type === contentType.Twitter ? "primary" : "secondary"} onClick={() => {
                            setType(contentType.Twitter)
                        }}></Button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text= "submit" size ="md"/>
                    </div>
                </span>
            </div>
             
        </div>}
    </div>

}