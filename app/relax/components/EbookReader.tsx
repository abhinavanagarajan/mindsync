"use client"

import { useState, useEffect } from 'react'
import { Book, PlayCircle, PauseCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const books = [
  {
    title: "Mindfulness Basics",
    author: "Sarah Johnson",
    content: `Mindfulness is the practice of being present and fully engaged with whatever we're doing at the moment — free from distraction or judgment, and aware of our thoughts and feelings without getting caught up in them.

The practice can help reduce stress, improve focus, and increase our capacity for joy and contentment.

Start with these simple steps:
1. Find a quiet place to sit comfortably
2. Close your eyes and focus on your breath
3. Notice the sensation of breathing
4. When your mind wanders, gently return focus to your breath`
  },
  {
    title: "The Art of Relaxation",
    author: "Michael Chen",
    content: `Relaxation is both an art and a science. It's about learning to let go of tension and finding peace in the present moment.

When we're stressed, our bodies enter a "fight or flight" response. Learning to activate the relaxation response can help counter these effects.

Try this progressive relaxation technique:
1. Start with your toes, tense them for 5 seconds
2. Release and notice the feeling of relaxation
3. Move up through each muscle group
4. End with your facial muscles`
  }
]

export default function EbookReader() {
  const [selectedBook, setSelectedBook] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(books[selectedBook].content)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.onend = () => setIsReading(false)
    setSpeech(utterance)

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [selectedBook])

  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else if (speech) {
      window.speechSynthesis.speak(speech)
      setIsReading(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 border-r pr-6">
          <h3 className="font-semibold mb-4">Library</h3>
          <div className="space-y-4">
            {books.map((book, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer hover:border-primary ${
                  selectedBook === index ? 'border-primary' : ''
                }`}
                onClick={() => {
                  setSelectedBook(index)
                  setIsReading(false)
                }}
              >
                <Book className="h-8 w-8 mb-2 text-primary" />
                <h4 className="font-medium">{book.title}</h4>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">{books[selectedBook].title}</h2>
              <p className="text-gray-500">{books[selectedBook].author}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleReading}
            >
              {isReading ? (
                <PauseCircle className="h-6 w-6" />
              ) : (
                <PlayCircle className="h-6 w-6" />
              )}
            </Button>
          </div>

          <ScrollArea className="h-[500px] rounded-md border p-6">
            <div className="prose">
              {books[selectedBook].content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
} 