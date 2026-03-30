export function TypingIndicator() {
  return (
    <div className="animate-fade-in flex justify-start px-4 py-1">
      <div className="flex max-w-[85%] gap-2">
        {/* Avatar */}
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-xs font-semibold text-white">
          A
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-quinyx">Ava</span>
          <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
            <span className="animate-dot-1 h-2 w-2 rounded-full bg-gray-400" />
            <span className="animate-dot-2 h-2 w-2 rounded-full bg-gray-400" />
            <span className="animate-dot-3 h-2 w-2 rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
