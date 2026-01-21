'use client'

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-700" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-jori-500 animate-spin" />
        </div>
        <p className="text-gray-400 animate-pulse">Carregando...</p>
      </div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="glass-card p-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-1/3" />
              <div className="h-3 bg-gray-700/50 rounded w-1/4" />
            </div>
            <div className="h-6 w-24 bg-gray-700 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
