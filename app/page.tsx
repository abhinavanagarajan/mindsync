import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Activity, Heart, Shield } from "lucide-react"
import Link from "next/link"

const features = [
  {
    name: "Real-time Monitoring",
    description: "Track stress levels and vital signs in real-time with advanced sensors.",
    icon: Activity,
  },
  {
    name: "AI-Powered Analysis",
    description: "97.8% accurate ML model for stress detection and personalized recommendations.",
    icon: Brain,
  },
  {
    name: "Emergency Response",
    description: "Automatic emergency services notification in critical situations.",
    icon: Shield,
  },
  {
    name: "Personalized Care",
    description: "Tailored relaxation techniques and stress management strategies.",
    icon: Heart,
  },
]

const testimonials = [
  {
    content: "MindSync has completely transformed how I manage my anxiety. The real-time monitoring gives me peace of mind.",
    author: "Sarah J., Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "As a healthcare provider, I've seen remarkable improvements in my patients using MindSync.",
    author: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              AI-Powered Personal Safety and Mental Health Monitoring for Threat Protection
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              MindSync is a revolutionary non-invasive system that uses advanced AI to monitor and improve your mental health. With real-time stress tracking and personalized support, we're here to help you maintain optimal mental wellness.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/register">
                <Button size="lg">Start Monitoring</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="MindSync Dashboard"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Advanced Technology</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to monitor your mental health
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our comprehensive system combines cutting-edge sensors with advanced AI to provide you with the best mental health monitoring solution.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.name} className="p-6">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by thousands of users worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <p className="text-lg leading-7">{testimonial.content}</p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.image}
                      alt=""
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold">{testimonial.author}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}