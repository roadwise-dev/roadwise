import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="mt-32 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="mb-8">
        <p className="font-medium">
          <strong>Effective Date:</strong> May 22, 2025
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
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-4">
          Your privacy matters. This Privacy Policy explains how we collect, use, and protect your personal data on{" "}
          <strong>Roadwise</strong>, a platform where users can vote on features and subscribe to updates from app
          owners.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What We Collect</h2>
        <p className="mb-4">We collect personal data in the following ways:</p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">1. Feature Upvotes</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email address</li>
            <li>Feature voted for</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. Newsletter Subscriptions</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email address</li>
            <li>Name</li>
          </ul>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How We Use Your Data</h2>
        <p className="mb-4">We collect this data to:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Show feedback to app owners who use Roadwise to manage their product feature boards.</li>
          <li>Help app owners understand which features matter most to their users.</li>
          <li>Send newsletters or updates (only if you subscribe).</li>
        </ul>
        <p>
          We <strong>do not</strong> sell your data or share it with third parties outside of Roadwise and the app
          owners using our platform.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Who Can See Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>App owners</strong> can see feedback related to their app, including the name and email addresses of
            users who voted for features.
          </li>
          <li>
            <strong>Jakub Mazur</strong> (the developer of Roadwise) has access to user data for support and platform
            maintenance.
          </li>
        </ul>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Where and How Your Data Is Stored</h2>
        <p>
          Your data is stored securely in <strong>Supabase</strong>, a managed backend platform. While data is protected
          by Supabase&apos;s security measures, it may <strong>not be encrypted at rest</strong>, and you should be aware of
          this if you have heightened privacy concerns.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>
            <strong>Access</strong> the personal data we store about you
          </li>
          <li>
            <strong>Correct</strong> any inaccurate information
          </li>
          <li>
            <strong>Request deletion</strong> of your data at any time
          </li>
        </ul>
        <p>
          To exercise these rights, email us at{" "}
          <Link href="mailto:contact@roadwiseapp.com" className="hover:underline">
            contact@roadwiseapp.com
          </Link>
          .
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
        <p className="mb-4">We keep your data as long as:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>You remain subscribed to a newsletter, or</li>
          <li>Your upvote remains associated with a feature on an app&apos;s feedback board.</li>
        </ul>
        <p>You can request removal at any time.</p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
          effective date.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      <section>
        <p className="mb-2">
          If you have questions or concerns about this Privacy Policy or how your data is handled, please contact:
        </p>
        <p className="font-medium">
          <strong>Jakub Mazur</strong>
          <br />
          <Link href="mailto:contact@roadwiseapp.com" className="hover:underline">
            contact@roadwiseapp.com
          </Link>
        </p>
      </section>
    </div>
  )
}
