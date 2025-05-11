import Link from "next/link"
import { ArrowRight, BarChart3, Bell, Globe, Moon, Users, MessageSquare } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Features'
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col mt-48">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gray-50 border rounded-2xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Features to Transform Your Product Development
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Discover all the tools and capabilities that make Roadwise the ultimate platform for collecting and acting on user feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Categories */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Core Features
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Everything you need to collect, organize, and prioritize user feedback
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {/* Feature 1 */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Feedback Boards</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create customizable feedback boards for your products. Let users submit ideas, vote on features, and engage in discussions.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gain insights into user preferences with detailed analytics. Track votes, engagement, and feature popularity over time.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-Time Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Stay updated with real-time notifications for new feedback, votes, and comments. Never miss important user insights.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Moon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Dark Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enable dark mode for better night-time usability and reduced eye strain. Customize the appearance to match your preferences.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Multi-Language Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Reach a global audience with support for multiple languages. Make your feedback boards accessible to users worldwide.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Work together with your team to manage feedback. Assign tasks, add internal notes, and coordinate feature development.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20 bg-gray-50 border rounded-2xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Product Development?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Join thousands of product teams using Roadwise to build better products.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/pricing">
                    Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/customers">
                    See Who Uses Roadwise
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  )
}
