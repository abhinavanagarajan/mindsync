"use client"

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Shield, Heart, Activity, Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SensorData {
  HeartRate: number
  GSR: number
  Cortisol: number
  timestamp: Date
}

// Add noise to make data more random
const addNoise = (base: number, amplitude: number) => {
  return base + (Math.random() - 0.5) * amplitude
}

// Sample data generator for demo purposes
const generateSampleData = () => {
  const now = new Date()
  return {
    HeartRate: addNoise(75, 15), // Random between 60-90
    GSR: addNoise(12, 4), // Random between 8-16
    Cortisol: addNoise(15, 6), // Random between 9-21
    timestamp: now
  }
}

const StressLevel = ({ value }: { value: number }) => {
  const router = useRouter()
  const getStressLevel = (value: number) => {
    if (value < 30) return {
      color: 'green',
      text: 'Safe Zone - Your body is maintaining healthy stress levels',
      icon: <Shield className="h-6 w-6" />
    }
    if (value < 70) return {
      color: 'yellow',
      text: 'Caution Zone - Consider taking preventive measures to manage stress',
      icon: <AlertTriangle className="h-6 w-6" />
    }
    return {
      color: 'red',
      text: 'Alert Zone - Immediate stress management recommended for your safety',
      icon: <Activity className="h-6 w-6" />
    }
  }

  const { color, text, icon } = getStressLevel(value)

  return (
    <div className="p-6 rounded-lg border-2" style={{ backgroundColor: `${color}10`, borderColor: color }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-bold" style={{ color }}>
            Current Safety Status
          </h3>
        </div>
        <Button
          onClick={() => router.push('/relax')}
          className="bg-primary hover:bg-primary/90"
        >
          Open Relaxation Center
        </Button>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  )
}

const MetricCard = ({ title, value, unit, icon, color }: {
  title: string
  value: number
  unit: string
  icon: React.ReactNode
  color: string
}) => (
  <div className="bg-black p-4 rounded-lg border shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="font-semibold text-white">{title}</h3>
    </div>
    <div className="flex items-baseline">
      <span className="text-2xl font-bold" style={{ color }}>
        {value.toFixed(1)}
      </span>
      <span className="ml-1 text-gray-400">{unit}</span>
    </div>
  </div>
)

export default function DataPage() {
  const [data, setData] = useState<SensorData[]>([])
  const [currentStress, setCurrentStress] = useState(0)
  const [userName, setUserName] = useState('John Doe')
  const [latestData, setLatestData] = useState<SensorData>(generateSampleData())
  
  const heartRateRef = useRef<SVGSVGElement>(null)
  const gsrRef = useRef<SVGSVGElement>(null)
  const cortisolRef = useRef<SVGSVGElement>(null)

  // Simulate WebSocket connection with sample data
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateSampleData()
      setLatestData(newData)
      
      setData(prevData => {
        const updatedData = [...prevData, newData].slice(-100)
        
        // Calculate stress level (weighted average)
        const stressLevel = (
          (newData.HeartRate - 55) / 40 * 100 * 0.4 +
          (newData.GSR - 7) / 10 * 100 * 0.3 +
          (newData.Cortisol - 7) / 16 * 100 * 0.3
        )
        setCurrentStress(Math.max(0, Math.min(100, stressLevel)))
        
        return updatedData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (data.length === 0) return

    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const width = 500 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [Date, Date])
      .range([0, width])

    const updateGraph = (
      ref: SVGSVGElement | null,
      dataKey: keyof SensorData,
      color: string,
      yDomain: [number, number]
    ) => {
      if (!ref) return

      const y = d3.scaleLinear()
        .domain(yDomain)
        .range([height, 0])

      const line = d3.line<SensorData>()
        .x(d => x(d.timestamp))
        .y(d => y(d[dataKey] as number))
        .curve(d3.curveMonotoneX)

      const svg = d3.select(ref)
      
      svg.selectAll('*').remove()
      
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      // Add gradient
      const gradient = g.append('defs')
        .append('linearGradient')
        .attr('id', `line-gradient-${dataKey}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', y(yDomain[0]))
        .attr('x2', 0)
        .attr('y2', y(yDomain[1]))

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.2)

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color)
        .attr('stop-opacity', 1)

      // Add area
      const area = d3.area<SensorData>()
        .x(d => x(d.timestamp))
        .y0(height)
        .y1(d => y(d[dataKey] as number))
        .curve(d3.curveMonotoneX)

      g.append('path')
        .datum(data)
        .attr('fill', `url(#line-gradient-${dataKey})`)
        .attr('d', area)

      // Add line
      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', line)

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5))

      g.append('g')
        .call(d3.axisLeft(y))

      // Add current value marker
      const latest = data[data.length - 1]
      g.append('circle')
        .attr('cx', x(latest.timestamp))
        .attr('cy', y(latest[dataKey] as number))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
    }

    updateGraph(heartRateRef.current, 'HeartRate', '#ff6b6b', [55, 95])
    updateGraph(gsrRef.current, 'GSR', '#4ecdc4', [7, 17])
    updateGraph(cortisolRef.current, 'Cortisol', '#45b7d1', [7, 23])
  }, [data])

  const generateReport = async () => {
    const pdf = new jsPDF()
    const currentDate = new Date().toLocaleString()

    // Add logo and header
    pdf.setFillColor(0, 0, 0)
    pdf.rect(0, 0, pdf.internal.pageSize.width, 40, 'F')
    
    // Add brain icon (you'll need to convert the Brain icon to a suitable format)
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.text('MindSync', 20, 25)
    
    pdf.setTextColor(128, 128, 128)
    pdf.setFontSize(10)
    pdf.text('Health Safety Report', 20, 35)

    // Add patient info section
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(14)
    pdf.text('Patient Information', 20, 60)
    
    pdf.setDrawColor(200, 200, 200)
    pdf.line(20, 65, 190, 65)
    
    pdf.setFontSize(12)
    pdf.text(`Name: ${userName}`, 20, 75)
    pdf.text(`Report Generated: ${currentDate}`, 20, 85)

    const addGraphToPDF = async (
      ref: SVGSVGElement | null,
      title: string,
      yPosition: number
    ) => {
      if (!ref) return
      // Convert SVG to a temporary HTML element
      const svgData = new XMLSerializer().serializeToString(ref)
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = svgData
      document.body.appendChild(tempDiv)
      
      const canvas = await html2canvas(tempDiv)
      document.body.removeChild(tempDiv)
      
      const imgData = canvas.toDataURL('image/png')
      
      // Add section title with accent
      pdf.setFillColor(0, 0, 0)
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(14)
      pdf.text(`${title} Safety Monitoring`, 20, yPosition)
      pdf.line(20, yPosition + 2, 190, yPosition + 2)
      
      // Add graph
      pdf.addImage(imgData, 'PNG', 20, yPosition + 10, 170, 60)
    }

    await addGraphToPDF(heartRateRef.current, 'Cardiovascular', 100)
    await addGraphToPDF(gsrRef.current, 'Stress Response', 180)
    await addGraphToPDF(cortisolRef.current, 'Hormonal Balance', 260)

    // Add summary section
    const last5DaysCortisol = data
      .filter(d => d.timestamp >= new Date(Date.now() - 5 * 24 * 60 * 60 * 1000))
      .map(d => d.Cortisol)
      .reduce((acc, val) => acc + val, 0) / 5

    pdf.addPage()
    pdf.setFontSize(16)
    pdf.text('Health Analysis Summary', 20, 30)
    pdf.line(20, 35, 190, 35)

    pdf.setFontSize(12)
    pdf.text('5-Day Hormonal Safety Analysis:', 20, 50)
    pdf.text(`• Average Cortisol Level: ${last5DaysCortisol.toFixed(2)} μg/dL`, 30, 60)
    pdf.text('• Safe Range: 9-21 μg/dL', 30, 70)
    
    // Add recommendations based on stress level
    pdf.text('Recommendations:', 20, 90)
    if (currentStress < 30) {
      pdf.text('• Maintain current healthy lifestyle', 30, 100)
      pdf.text('• Continue regular monitoring', 30, 110)
    } else if (currentStress < 70) {
      pdf.text('• Consider stress management techniques', 30, 100)
      pdf.text('• Increase relaxation activities', 30, 110)
      pdf.text('• Monitor more frequently', 30, 120)
    } else {
      pdf.text('• Immediate stress reduction recommended', 30, 100)
      pdf.text('• Consult healthcare provider', 30, 110)
      pdf.text('• Implement relaxation protocols', 30, 120)
    }

    // Add footer to all pages
    const totalPages = pdf.internal.pages.length - 1
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.setFontSize(10)
      pdf.setTextColor(128, 128, 128)
      pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: 'center' })
    }

    // Force download in browser
    const blob = pdf.output('blob')
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'mindsync-health-report.pdf'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Health Safety Monitoring</h1>
      
      <StressLevel value={currentStress} />

      <div className="grid grid-cols-3 gap-4 my-8">
        <MetricCard
          title="Heart Safety"
          value={latestData.HeartRate}
          unit="BPM"
          icon={<Heart className="h-5 w-5 text-red-500" />}
          color="#ff6b6b"
        />
        <MetricCard
          title="Stress Response"
          value={latestData.GSR}
          unit="µS"
          icon={<Activity className="h-5 w-5 text-teal-500" />}
          color="#4ecdc4"
        />
        <MetricCard
          title="Hormonal Balance"
          value={latestData.Cortisol}
          unit="μg/dL"
          icon={<Shield className="h-5 w-5 text-blue-500" />}
          color="#45b7d1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        <div className="p-4 border rounded-lg bg-black">
          <h3 className="text-xl font-bold mb-4 text-white">Cardiovascular Safety</h3>
          <svg ref={heartRateRef} width="500" height="300" style={{ background: 'black' }} />
        </div>
        
        <div className="p-4 border rounded-lg bg-black">
          <h3 className="text-xl font-bold mb-4 text-white">Stress Response Monitoring</h3>
          <svg ref={gsrRef} width="500" height="300" style={{ background: 'black' }} />
        </div>
        
        <div className="p-4 border rounded-lg bg-black">
          <h3 className="text-xl font-bold mb-4 text-white">Hormonal Safety Tracking</h3>
          <svg ref={cortisolRef} width="500" height="300" style={{ background: 'black' }} />
        </div>
      </div>

      <Button onClick={generateReport} className="mt-4">
        Generate Safety Report
      </Button>
    </div>
  )
} 