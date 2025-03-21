export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold text-gray-900">Procezly</h3>
          <p className="text-gray-600 mt-2">
            Join our newsletter to stay up to date on features and releases.
          </p>
        </div>
      </div>
      <div className="w-full max-w-[1400px] mx-auto mt-10 px-6 flex justify-between items-center border-t pt-6">
        <p className="text-gray-500 text-sm">&copy; 2025 Procezly. All rights reserved.</p>
      </div>
    </footer>
  );
}
