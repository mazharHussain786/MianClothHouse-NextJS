import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getProducts=async()=>
{
 const resposne=await fetch("/api/cloths")
  const data =await resposne.json()
  console.log("data")
}