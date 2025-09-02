import { BarChart3, Bell, Globe, MessageSquare, Moon, Users } from 'lucide-react'

import { CallToAction } from "@/components/landing/cta"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Features'
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col w-full max-container padding-container">
      <main className="flex flex-col gap-20">
        {/* Feature Categories */}
        <section className="w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features to Transform Your Product Development
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Discover all the tools and capabilities that make Roadwise the ultimate platform for collecting and acting on user feedback.
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
        </section>

        <CallToAction
          title="Ready to Transform Your Product Development?"
          description="Join thousands of product teams using Roadwise to build better products."
          buttons={[
            {
              text: "Start for Free",
              href: "/pricing",
            },
            {
              text: "See Who Uses Roadwise",
              href: "/customers",
            }
          ]}
        />
      </main>
    </div >
  )
}
