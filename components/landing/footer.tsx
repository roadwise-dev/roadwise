export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {currentYear} Roadwise. All rights reserved.</p>
      </div>
    </footer>
  );
}
