import { AdvocatesDirectory } from "@/features/advocates/advocatesDirectory"
import { ThemeToggle } from "@/features/ui/theme-toggle"
import { AiChatBubble } from "@/features/chat/ai-chat-bubble"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <AdvocatesDirectory />
        <AiChatBubble />
      </div>
    </div>
  )
}

