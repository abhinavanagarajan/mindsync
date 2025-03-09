"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Shuffle } from 'lucide-react'

const GRID_SIZE = 3
const PIECE_SIZE = 100

const images = [
  '/puzzles/nature1.jpg',
  '/puzzles/nature2.jpg',
  '/puzzles/nature3.jpg',
  '/puzzles/nature4.jpg'
]

interface PuzzlePiece {
  id: number
  currentPos: number
  correctPos: number
  imgUrl: string
}

export default function JigsawPuzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  const initializePuzzle = () => {
    const newImage = images[Math.floor(Math.random() * images.length)]
    setCurrentImage(newImage)
    
    const newPieces: PuzzlePiece[] = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i,
      imgUrl: newImage
    }))

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = newPieces[i].currentPos
      newPieces[i].currentPos = newPieces[j].currentPos
      newPieces[j].currentPos = temp
    }

    setPieces(newPieces)
    setIsComplete(false)
    setSelectedPiece(null)
  }

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index)
    } else {
      // Swap pieces
      setPieces(prev => {
        const newPieces = [...prev]
        const temp = newPieces[index].currentPos
        newPieces[index].currentPos = newPieces[selectedPiece].currentPos
        newPieces[selectedPiece].currentPos = temp
        return newPieces
      })
      setSelectedPiece(null)

      // Check if puzzle is complete
      setTimeout(() => {
        const isComplete = pieces.every(piece => piece.currentPos === piece.correctPos)
        setIsComplete(isComplete)
      }, 100)
    }
  }

  useEffect(() => {
    initializePuzzle()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        <Button
          onClick={initializePuzzle}
          variant="outline"
          size="icon"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        {isComplete && (
          <div className="text-green-500 font-bold">
            Puzzle Complete! 🎉
          </div>
        )}
      </div>

      <div
        className="grid gap-1 bg-gray-200 p-2 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${PIECE_SIZE}px)`
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            className={`
              relative w-[${PIECE_SIZE}px] h-[${PIECE_SIZE}px] 
              cursor-pointer transition-transform
              ${selectedPiece === index ? 'ring-2 ring-primary' : ''}
              hover:ring-2 hover:ring-primary-light
            `}
            onClick={() => handlePieceClick(index)}
          >
            <div
              className="w-full h-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${piece.imgUrl})`,
                backgroundPosition: `${-(piece.correctPos % GRID_SIZE) * PIECE_SIZE}px ${-Math.floor(piece.correctPos / GRID_SIZE) * PIECE_SIZE}px`
              }}
            />
          </div>
        ))}
      </div>

      {selectedPiece !== null && (
        <div className="mt-4 text-gray-500">
          Click another piece to swap positions
        </div>
      )}
    </div>
  )
} 