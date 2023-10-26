import { twMerge as twMergeOriginal } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

export function twMerge(...args: any[]) {
  return clsx(twMergeOriginal(...args))
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(str: string) {
  return str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
}
