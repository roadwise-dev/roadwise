import { Button } from "../ui/button";

export function CallToAction() {
  return (
    <section className="py-20 bg-gray-900 text-white rounded-xl">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-xl mb-8">
          Join thousands of product teams using Roadwise to build better
          products.
        </p>
        <Button variant="secondary" size="lg">Sign up for free</Button>
      </div>
    </section>

  )
}
