import Link from "next/link"
import { ArrowRight, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen flex-col mt-48">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Innovative Teams Worldwide
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Discover how companies of all sizes use Roadwise to build better products with user feedback.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/pricing">
                    Join Our Customers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Customers */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Customers
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  See how these innovative companies leverage Roadwise to transform their product development
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Customer 1 - SketchyBar Editor */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="SketchyBar Editor" />
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>SketchyBar Editor</CardTitle>
                      <CardDescription>Developer Tools</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">
                    SketchyBar Editor uses Roadwise to collect feature requests and bug reports from their community of macOS power users, helping them prioritize development efforts.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Customer 2 - Albumfy */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Albumfy" />
                      <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Albumfy</CardTitle>
                      <CardDescription>Music & Entertainment</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">
                    Albumfy transformed their product roadmap by implementing Roadwise, allowing music enthusiasts to vote on new features and integrations for their album collection platform.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Customer 3 - DevNotes */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="DevNotes" />
                      <AvatarFallback>DN</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>DevNotes</CardTitle>
                      <CardDescription>Productivity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">
                    DevNotes uses Roadwise to gather feedback from developers who use their note-taking app, resulting in a 40% increase in user satisfaction and retention.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Customer 4 - TaskFlow */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="TaskFlow" />
                      <AvatarFallback>TF</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>TaskFlow</CardTitle>
                      <CardDescription>Project Management</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">
                    TaskFlow implemented Roadwise to prioritize their development backlog, helping them focus on features that matter most to their project management users.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Customer 5 - CodeCollab */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="CodeCollab" />
                      <AvatarFallback>CC</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>CodeCollab</CardTitle>
                      <CardDescription>Developer Tools</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">
                    CodeCollab uses Roadwise to manage feature requests for their collaborative coding platform, enabling them to build a community-driven product roadmap.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Customer 6 - DesignVault */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="DesignVault" />
                      <AvatarFallback>DV</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>DesignVault</CardTitle>
                      <CardDescription>Design Tools</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">
                    DesignVault leverages Roadwise to collect feedback from designers using their asset management platform, helping them create a more intuitive and powerful tool.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Customer Success Metrics
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Real results from companies using Roadwise to improve their products
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">40%</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Average increase in user satisfaction after implementing Roadwise
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">65%</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Reduction in development time for new features
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">3x</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Increase in user engagement with product updates
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">85%</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Of customers report better alignment between teams
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Growing Community of Innovators
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Start collecting valuable user feedback today and build products your users will love.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/pricing">
                    Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/features">
                    Explore Features
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
