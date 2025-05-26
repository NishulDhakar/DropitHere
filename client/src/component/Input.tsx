import React from "react"

interface inputProps {
    reference ?: any;
    placeholder : string;
}
export function Input({placeholder, reference} : inputProps){

    return <div>
        <input ref={reference} placeholder={placeholder} type="text" className="px-4 py-2 rounded border-gray-200 border m-2"></input>
    </div>

} 