import React from "react"
import { IconProps, IconSizeVariants } from "./index"

export const PlusIcon = (props : IconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={IconSizeVariants[props.size || "sm"]}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  
}
