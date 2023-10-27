type CommandPaletteResultsOptionProps = {
  text: string
  subText: string
  active: boolean
}

export default function CommandPaletteResultsOption({
  text,
  subText,
  active,
}: CommandPaletteResultsOptionProps) {
  return (
    <div
      className={`cursor-pointer space-x-1 px-6 py-2 transition-colors ${
        active ? 'bg-teal-900' : 'bg-white dark:bg-slate-900'
      }`}
    >
      <span
        className={`mr-1 font-medium ${
          active ? 'text-white' : 'text-gray-900 dark:text-slate-200'
        }`}
      >
        {text}
      </span>
      <span
        className={`text-xs ${active ? 'text-teal-500' : 'text-slate-400'}`}
      >
        {subText}
      </span>
    </div>
  )
}
