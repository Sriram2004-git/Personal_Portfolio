export default function Loading() {
  return (
    <div className="fixed inset-0 bg-bg-void flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-electric-blue/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-electric-blue animate-spin" />
          <div className="absolute inset-2 rounded-full border-t-2 border-ai-purple/60 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        </div>
        <div className="font-mono text-sm text-electric-blue/60 tracking-widest animate-pulse">
          INITIALIZING
        </div>
      </div>
    </div>
  )
}
