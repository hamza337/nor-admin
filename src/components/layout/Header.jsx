import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full px-18 sm:px-6 lg:px-18">
          <div className="flex items-center justify-between h-16 gap-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="NorDeal Logo" className="w-10 h-10" />
                <span className="text-2xl font-bold">
                  <span className="text-[#E95817]">NOR</span>
                  <span style={{color: '#009CA8'}}>DEAL</span>
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-600 p-1 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search on NorDeal"
                  className="w-full pl-16 pr-6 text-xs py-3 rounded-full focus:outline-none text-gray-700 text-base shadow-sm"
                  style={{backgroundColor: '#F2F3F5'}}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-orange-500 font-medium">Helpline</span>
                <span className="font-semibold text-gray-800">06-900-6389-00</span>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;