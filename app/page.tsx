import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, MessageSquare, ThumbsUp, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Roadwise
          </Link>
          <nav className="space-x-4">
            <Button variant="outline">Log in</Button>
            <Button>Sign up</Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Empower Your Product with User Feedback</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create feedback boards for your apps and let your users shape the future of your product.
          </p>
          <div className="flex justify-center space-x-4">
            <Input className="w-64" placeholder="Enter your app name" />
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Sign Up",
                  description: "Create your Roadwise account in minutes",
                  icon: <Users className="h-10 w-10 text-gray-700" />,
                },
                {
                  title: "Create Your Board",
                  description: "Set up a feedback board for your app",
                  icon: <MessageSquare className="h-10 w-10 text-gray-700" />,
                },
                {
                  title: "Gather Feedback",
                  description: "Let users submit and vote on ideas",
                  icon: <ThumbsUp className="h-10 w-10 text-gray-700" />,
                },
              ].map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{index + 1}.</span>
                      <span>{step.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center">
                      {step.icon}
                      <CardDescription className="mt-4">{step.description}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Custom feedback boards for each app",
                "User voting and commenting",
                "Prioritization tools for product teams",
                "Integration with popular project management tools",
                "Real-time updates and notifications",
                "Customizable branding options",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-gray-700 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8">
              Join thousands of product teams using Roadwise to build better products.
            </p>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Sign up for free
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Roadwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
