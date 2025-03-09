"use client"

import { useState, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

const relaxingSongs = [
  {
    title: "Peaceful Piano",
    artist: "Relaxing Music",
    url: "/music/peaceful-piano.mp3"
  },
  {
    title: "Ocean Waves",
    artist: "Nature Sounds",
    url: "/music/ocean-waves.mp3"
  },
  {
    title: "Forest Ambience",
    artist: "Nature Sounds",
    url: "/music/forest-ambience.mp3"
  },
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % relaxingSongs.length)
  }

  const previousSong = () => {
    setCurrentSong((prev) => (prev - 1 + relaxingSongs.length) % relaxingSongs.length)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration
      audioRef.current.currentTime = time
      setProgress(value[0])
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">{relaxingSongs[currentSong].title}</h2>
        <p className="text-gray-500">{relaxingSongs[currentSong].artist}</p>
      </div>

      <audio
        ref={audioRef}
        src={relaxingSongs[currentSong].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />

      <div className="mb-4">
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={previousSong}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSong}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Playlist</h3>
        <div className="space-y-2">
          {relaxingSongs.map((song, index) => (
            <div
              key={index}
              className={`p-2 rounded cursor-pointer hover:bg-black-400 ${
                currentSong === index ? 'bg-gray-400' : ''
              }`}
              onClick={() => setCurrentSong(index)}
            >
              <div className="font-medium">{song.title}</div>
              <div className="text-sm text-gray-500">{song.artist}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 