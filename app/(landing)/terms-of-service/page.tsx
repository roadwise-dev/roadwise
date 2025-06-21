import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="px-4 py-8 max-container padding-container w-full">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="mb-8">
        <p className="font-medium">
          <strong>Effective Date:</strong> June 21, 2025
          <br />
          <strong>Maintained by:</strong> Jakub Mazur
          <br />
          <strong>Contact:</strong>{" "}
          <Link href="mailto:contact@roadwiseapp.com" className="hover:underline">
            contact@roadwiseapp.com
          </Link>
        </p>
      </div>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using <strong>Roadwise</strong>, you accept and agree to be bound by the terms and
          provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
        <p className="mb-4">
          Roadwise is a platform that allows users to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Submit feature requests for applications</li>
          <li>Vote on existing feature requests</li>
          <li>Subscribe to updates and newsletters from app developers</li>
          <li>View public roadmaps and development progress</li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">You agree to:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and truthful information</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not submit spam, inappropriate, or harmful content</li>
            <li>Respect other users and maintain civil discourse</li>
            <li>Not attempt to circumvent security measures</li>
          </ul>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Content and Intellectual Property</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">User Content</h3>
          <p className="mb-4">
            When you submit feature requests, comments, or other content to Roadwise, you grant us a
            non-exclusive, worldwide, royalty-free license to use, display, and distribute that content
            in connection with the service.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Platform Content</h3>
          <p className="mb-4">
            All content on the Roadwise platform, including but not limited to text, graphics, logos,
            and software, is the property of Roadwise or its licensors and is protected by copyright
            and other intellectual property laws.
          </p>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Privacy</h2>
        <p className="mb-4">
          Your privacy is important to us. Please review our{" "}
          <Link href="/privacy-policy" className="font-semibold hover:underline">
            Privacy Policy
          </Link>
          , which also governs your use of the service, to understand our practices.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">6. Disclaimers</h2>
        <p className="mb-4">
          Roadwise is provided &quot;as is&quot; without any representations or warranties. We do not guarantee
          that the service will be uninterrupted, secure, or error-free. Your use of the service is
          at your own risk.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, Roadwise shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
          whether incurred directly or indirectly.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your access to the service immediately, without prior notice or
          liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or replace these Terms at any time. If a revision is material,
          we will try to provide at least 30 days notice prior to any new terms taking effect.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us at{" "}
          <Link href="mailto:contact@roadwiseapp.com" className="font-semibold hover:underline">
            contact@roadwiseapp.com
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
