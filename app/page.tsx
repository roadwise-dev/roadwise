import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome to Roadwise</h1>
        <p className="mt-4 text-lg">
          Create, manage, and share your app's roadmap and feedback with ease.
        </p>
      </header>

      <div className="w-full max-w-md">
        <form className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your app name"
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Create App Board
          </Button>
        </form>
      </div>

      <footer className="mt-12">
        <p className="text-sm">
          Start building your app board at{" "}
          <span className="font-bold">roadwise.com/b/your-app</span>
        </p>
      </footer>
    </div>
  );
}
