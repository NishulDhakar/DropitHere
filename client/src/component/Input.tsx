import React from "react"

interface inputProps {
    reference ?: any;
    placeholder : string;
    type?: "text" | "password";
}
export function Input({placeholder, reference , type} : inputProps){

    return <div>
        <input ref={reference} placeholder={placeholder} type={type} className="px-4 py-2 rounded border-gray-200 border m-2"></input>
    </div>

} 