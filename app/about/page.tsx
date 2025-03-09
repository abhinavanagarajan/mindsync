import { Card } from "@/components/ui/card"
import { Brain, Activity, Heart, Shield, Cpu, Thermometer, HeartPulseIcon as PulseIcon, Gauge } from "lucide-react"

const sensors = [
  {
    name: "MAX30102",
    description: "Advanced pulse oximetry and heart-rate monitoring",
    icon: PulseIcon,
  },
  {
    name: "GSR Sensor",
    description: "Galvanic skin response for stress detection",
    icon: Gauge,
  },
  {
    name: "SpO2 Sensor",
    description: "Blood oxygen level monitoring",
    icon: Heart,
  },
  {
    name: "Temperature Sensor",
    description: "Continuous body temperature tracking",
    icon: Thermometer,
  },
]

const advantages = [
  {
    title: "Non-invasive Cortisol Detection",
    description: "First-of-its-kind system for detecting cortisol levels without blood tests",
    icon: Brain,
  },
  {
    title: "Real-time Tracking",
    description: "Continuous monitoring of vital signs and stress indicators",
    icon: Activity,
  },
  {
    title: "AI-powered Personalization",
    description: "Machine learning algorithms providing tailored recommendations",
    icon: Cpu,
  },
  {
    title: "Emergency Response",
    description: "Automated alert system for critical situations",
    icon: Shield,
  },
]

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Revolutionary Mental Health Technology
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            MindSync combines cutting-edge hardware with advanced AI to provide unprecedented insights into personal safety and threat protection.
          </p>
        </div>

        {/* Sensors Section */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Advanced Sensor Technology</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our multi-sensor approach provides comprehensive health monitoring and threat protection.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {sensors.map((sensor) => (
                <Card key={sensor.name} className="p-6">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <sensor.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {sensor.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{sensor.description}</p>
                  </dd>
                </Card>
              ))}
            </dl>
          </div>
        </div>

        {/* ML Model Section */}
        <div className="mt-24 rounded-2xl bg-primary/5 px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              97.8% Accurate ML Model
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our custom-built machine learning model is trained on a dataset of over 5,000 samples, providing industry-leading accuracy in stress detection and mental health monitoring.
            </p>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why MindSync is Revolutionary</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Transforming mental health technology with innovative features and capabilities
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {advantages.map((advantage) => (
                <Card key={advantage.title} className="p-6">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <advantage.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {advantage.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{advantage.description}</p>
                  </dd>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}