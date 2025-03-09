"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MusicPlayer from './components/MusicPlayer.tsx'
import EbookReader from './components/EbookReader.tsx'
import PianoGame from './components/PianoGame.tsx'
import JigsawPuzzle from './components/JigsawPuzzle.tsx'

export default function RelaxPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Relax & Unwind</h1>
      
      <Tabs defaultValue="music" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="music">Music Therapy</TabsTrigger>
          <TabsTrigger value="ebooks">eBooks</TabsTrigger>
          <TabsTrigger value="piano">Piano Tiles</TabsTrigger>
          <TabsTrigger value="puzzle">Jigsaw Puzzle</TabsTrigger>
        </TabsList>
        
        <TabsContent value="music" className="border rounded-lg p-6">
          <MusicPlayer />
        </TabsContent>
        
        <TabsContent value="ebooks" className="border rounded-lg p-6">
          <EbookReader />
        </TabsContent>
        
        <TabsContent value="piano" className="border rounded-lg p-6">
          <PianoGame />
        </TabsContent>
        
        <TabsContent value="puzzle" className="border rounded-lg p-6">
          <JigsawPuzzle />
        </TabsContent>
      </Tabs>
    </div>
  )
} 