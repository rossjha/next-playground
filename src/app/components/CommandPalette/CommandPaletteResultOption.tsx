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
      className={`mx-6 px-4 text-forest-green flex py-3 text-sm dark:border-b-gray-500 cursor-pointer rounded-md ${
        active ? 'bg-forest-100' : 'bg-white dark:bg-slate-900'
      }`}
    >
      <span
        className={`mr-1 font-medium ${
          active ? 'text-forest-green' : 'text-forest-green dark:text-slate-200'
        }`}
      >
        {text}
      </span>
      <span
        className="line-clamp-2 inline-block justify-center bg-gray-200 px-2 py-1 text-[0.7rem] font-normal uppercase leading-tight text-gray-800">
        {subText}
      </span>
    </div>
  )
}
