import { twMerge as twMergeOriginal } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

export function twMerge(...args: any[]) {
  return clsx(twMergeOriginal(...args))
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(str: string) {
  const formattedStr = str.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase()
  const words = formattedStr.split(/\s+/)

  const first = words.length > 0 ? words[0].charAt(0) : ''
  const second = words.length > 0 ? words[1].charAt(0) : ''

  return first + second
}

export function truncateStr(str: string, limit: number) {
  const ellipsis = '...'

  if (str.length < limit) {
    return str
  }

  return str.substring(0, limit - ellipsis.length) + ellipsis
}
