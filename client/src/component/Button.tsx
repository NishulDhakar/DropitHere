import React from 'react';

interface ButtonProps {

    text : String,
    variant : "primary" | "secondary",
    size : "sm" | "md" | "lg"
    onClick? : () => void
    startIcon? : any;
    endIcon? : any;
    fullWidth? : boolean;
    loading? : boolean

}
const variantStyles = {

    "primary" : "bg-[#7164c0]  text-white" ,
    "secondary" : "bg-[#d9ddee] text-[#7164c0]" 
    
}
const sizeStyles = {
    "sm" : "p-2" ,
    "md" : "p-4" ,
    "lg" : "p-6" 
}
const defaultStyles = "rounded-md front-light px-4 py-2 flex items-center"

export const Button = (props : ButtonProps) => {
    return <button
            onClick={props.onClick}
            className={`${variantStyles[props.variant]} 
            ${props.fullWidth ? " w-full flex justify-center items-center" : ""} 
            ${sizeStyles[props.size]} 
            ${defaultStyles}
            ${props.loading ? " opacity-45" : ""}`}
            disabled = {props.loading} > 
           { props.startIcon ? <div className='pr-2' > {props.startIcon}</div> : null} {props.text}
           </button>

}
<Button text={"text"} variant = "primary" size = "md"  onClick={() => {}} startIcon={"-"} />