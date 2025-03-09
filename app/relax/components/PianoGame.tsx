"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

interface Tile {
  id: number
  x: number
  y: number
  speed: number
  key: string
}

const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 600
const TILE_WIDTH = CANVAS_WIDTH / KEYS.length
const TILE_HEIGHT = 80

export default function PianoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tile, setTile] = useState<Tile | null>(null)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const animationFrameRef = useRef<number>()

  const startGame = () => {
    setTile(null)
    setScore(0)
    setGameOver(false)
    setIsPlaying(true)
  }

  const createTile = () => {
    const keyIndex = Math.floor(Math.random() * KEYS.length)
    return {
      id: Date.now(),
      x: keyIndex * TILE_WIDTH,
      y: -TILE_HEIGHT,
      speed: 2,
      key: KEYS[keyIndex]
    }
  }

  const handleKeyClick = (keyIndex: number) => {
    if (!isPlaying || gameOver || !tile) return

    if (
      tile.x === keyIndex * TILE_WIDTH && 
      tile.y >= CANVAS_HEIGHT - TILE_HEIGHT * 2 &&
      tile.y <= CANVAS_HEIGHT - TILE_HEIGHT / 2
    ) {
      setTile(null) // Remove the hit tile
      setScore(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const animate = () => {
      if (!isPlaying) return

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Create new tile if none exists
      if (!tile) {
        setTile(createTile())
        return
      }

      // Update tile position
      const updatedTile = {
        ...tile,
        y: tile.y + tile.speed
      }

      // Check for game over
      if (updatedTile.y > CANVAS_HEIGHT) {
        setGameOver(true)
        setIsPlaying(false)
        return
      }

      setTile(updatedTile)

      // Draw tile
      ctx.fillStyle = '#4CAF50'
      ctx.fillRect(updatedTile.x, updatedTile.y, TILE_WIDTH - 2, TILE_HEIGHT)
      ctx.fillStyle = '#fff'
      ctx.font = '20px Arial'
      ctx.fillText(updatedTile.key, updatedTile.x + TILE_WIDTH / 3, updatedTile.y + TILE_HEIGHT / 2)

      // Draw piano keys
      KEYS.forEach((key, i) => {
        ctx.fillStyle = '#eee'
        ctx.strokeStyle = '#999'
        ctx.lineWidth = 2
        ctx.fillRect(i * TILE_WIDTH, CANVAS_HEIGHT - TILE_HEIGHT, TILE_WIDTH - 2, TILE_HEIGHT)
        ctx.strokeRect(i * TILE_WIDTH, CANVAS_HEIGHT - TILE_HEIGHT, TILE_WIDTH - 2, TILE_HEIGHT)
        ctx.fillStyle = '#333'
        ctx.fillText(key, i * TILE_WIDTH + TILE_WIDTH / 3, CANVAS_HEIGHT - TILE_HEIGHT / 2)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, tile, gameOver])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        <Button
          onClick={startGame}
          disabled={isPlaying}
        >
          {gameOver ? 'Try Again' : 'Start Game'}
        </Button>
        <div className="text-xl font-bold">Score: {score}</div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border rounded-lg"
        />
        
        <div className="absolute bottom-0 left-0 right-0 flex">
          {KEYS.map((key, i) => (
            <div
              key={key}
              className="flex-1 h-20 border-r last:border-r-0 bg-white hover:bg-gray-100 cursor-pointer flex items-center justify-center text-lg font-bold"
              onClick={() => handleKeyClick(i)}
            >
              {key}
            </div>
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-red-500">Game Over!</h3>
          <p className="text-gray-600">Final Score: {score}</p>
        </div>
      )}
    </div>
  )
} 