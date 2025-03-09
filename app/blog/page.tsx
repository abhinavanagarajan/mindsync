"use client"

import { useState } from 'react'
import { Heart, Share2, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const blogPosts = [
  {
    id: 1,
    title: "Scientists Discover Forest Bathing Reduces Stress by 70%",
    excerpt: "New research confirms that spending time in forests significantly reduces cortisol levels and improves mental well-being.",
    content: `A groundbreaking study published in the Journal of Environmental Psychology has found that "forest bathing" - the practice of mindfully spending time in wooded areas - can reduce stress levels by up to 70%.

The research, conducted across multiple countries, showed that just 2 hours per week of forest bathing led to:
- Significant reduction in cortisol levels
- Improved sleep quality
- Enhanced immune system function
- Better mood and reduced anxiety

"This is a powerful reminder that nature is one of our greatest healers," says lead researcher Dr. Sarah Chen. "The combination of fresh air, natural sounds, and the presence of phytoncides - compounds released by trees - creates a perfect environment for stress relief."`,
    date: "2024-03-08",
    readTime: "5 min",
    likes: 245,
    image: "/blog/forest-bathing.jpg"
  },
  {
    id: 2,
    title: "Global Meditation Movement Brings Peace to Millions",
    excerpt: "A worldwide meditation initiative has connected people across 150 countries, fostering unity and inner peace.",
    content: `In an unprecedented display of global unity, millions of people from 150 countries participated in a synchronized meditation event, demonstrating the growing awareness of mental wellness practices.

The "One World, One Breath" initiative has:
- Connected over 5 million participants globally
- Reduced reported anxiety levels in participants by 45%
- Created lasting communities focused on mindfulness
- Inspired similar events in schools and workplaces

"What we're seeing is a beautiful shift in how people approach mental health and community connection," explains event organizer Maya Patel. "This isn't just about individual practice - it's about creating a more peaceful, understanding world."`,
    date: "2024-03-07",
    readTime: "4 min",
    likes: 189,
    image: "/blog/meditation.jpg"
  },
  {
    id: 3,
    title: "Revolutionary Music Therapy Shows Promise in Stress Management",
    excerpt: "New adaptive music therapy program uses AI to create personalized soundscapes for stress relief.",
    content: `A revolutionary new music therapy program that adapts to individual stress levels in real-time is showing remarkable results in early trials. The system, developed by a team of musicians and neuroscientists, uses biofeedback to create personalized soundscapes.

Key findings from the initial studies show:
- 85% of participants reported improved stress management
- Measurable reduction in blood pressure and heart rate
- Better focus and productivity during work hours
- Improved sleep quality when used before bedtime

"We're essentially creating a personal orchestra that responds to your body's needs," explains Dr. James Wilson, lead developer. "The AI analyzes various physiological markers and adjusts the music's tempo, harmony, and complexity accordingly."`,
    date: "2024-03-06",
    readTime: "6 min",
    likes: 312,
    image: "/blog/music-therapy.jpg"
  }
]

export default function BlogPage() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)
  const [likes, setLikes] = useState<{[key: number]: number}>(() => {
    const initialLikes: {[key: number]: number} = {}
    blogPosts.forEach(post => {
      initialLikes[post.id] = post.likes
    })
    return initialLikes
  })

  const handleLike = (postId: number) => {
    setLikes(prev => ({
      ...prev,
      [postId]: prev[postId] + 1
    }))
  }

  const handleShare = async (post: typeof blogPosts[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Uplifting News & Stories</h1>
      
      <div className="grid gap-8">
        {blogPosts.map(post => (
          <article
            key={post.id}
            className="bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${post.image})`,
                  filter: 'brightness(0.9)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h2 className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-white">
                {post.title}
              </h2>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>

              {expandedPost === post.id ? (
                <ScrollArea className="h-[300px] mb-4">
                  <div className="prose max-w-none border-2 border-gray-500 rounded-lg p-4">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              ) : null}

              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                >
                  {expandedPost === post.id ? 'Read Less' : 'Read More'}
                </Button>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`h-100 w-100 ${likes[post.id] > post.likes ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{likes[post.id]}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(post)}
                  >
                    <Share2 className="h-15 w-15" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
} 