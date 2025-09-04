const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="w-full max-w-7xl mx-auto text-center px-6 py-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Saylani Microfinance. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
