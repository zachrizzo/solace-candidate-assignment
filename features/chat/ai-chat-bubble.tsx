"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { type Message } from "@/features/chat/types/chat.types"

export function AiChatBubble(): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your Solace Assistant. I can help you find the right advocate for your health needs. What kind of health-related support are you looking for?",
      sender: "bot",
      timestamp: new Date(),
      isHtml: false,
    },
  ])
  const [inputValue, setInputValue] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      isHtml: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Call the OpenAI API through our endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add bot response immediately
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
        isHtml: data.isHtml || false,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Fallback response in case of error
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm having trouble connecting to my AI brain right now. Please try again in a moment or contact support if the problem persists.",
        sender: "bot",
        timestamp: new Date(),
        isHtml: false,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, errorMessage]);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Function to render message content (handles HTML)
  const renderMessageContent = (message: Message) => {
    if (message.isHtml) {
      return <div dangerouslySetInnerHTML={{ __html: message.content }} />;
    }
    return <p className="text-sm whitespace-pre-line">{message.content}</p>;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-50"
          >
            <Card className="w-[600px] max-w-[calc(100vw-40px)] h-[700px] shadow-lg rounded-xl border-purple-200 dark:border-purple-900 flex flex-col">
              <CardHeader className="p-4 border-b bg-purple-50/50 dark:bg-purple-900/30 flex flex-row items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-purple-200 dark:border-purple-800">
                    <AvatarFallback className="bg-purple-700 text-white">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-base flex items-center gap-2 text-purple-800 dark:text-purple-300">
                      Solace Health Assistant
                      <Sparkles className="h-4 w-4 text-purple-500" />
                    </h3>
                    <p className="text-xs text-muted-foreground">Powered by OpenAI</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto flex-grow">
                <div className="h-full overflow-y-auto scroll-smooth p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 hidden sm:flex">
                          <AvatarFallback className="bg-purple-700 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={
                          message.sender === "user"
                            ? "bg-primary/15 rounded-tl-xl rounded-tr-xl rounded-bl-none rounded-br-xl p-3 ml-auto max-w-[80%] border-l border-t border-primary/20"
                            : "bg-muted rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-none p-3 mr-auto max-w-[80%] border-r border-t border-border"
                        }
                      >
                        {renderMessageContent(message)}
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2 mt-1 hidden sm:flex">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2 mt-1 hidden sm:flex">
                        <AvatarFallback className="bg-purple-700 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-none p-3 mr-auto max-w-[80%] border-r border-t border-border">
                        <div className="flex space-x-1">
                          <div
                            className="h-2 w-2 rounded-full bg-purple-600 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-purple-600 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-purple-600 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t bg-muted/50 shrink-0">
                <div className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Type your health needs or questions..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-50 transition-all duration-300"
          >
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

