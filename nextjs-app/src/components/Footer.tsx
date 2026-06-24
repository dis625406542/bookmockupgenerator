export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-8 px-4 border-t border-gray-200 text-gray-400 text-sm">
      <p>
        © {year} MyMockupBook — Free Book Mockup Generator. All rights reserved.
      </p>
    </footer>
  );
}
