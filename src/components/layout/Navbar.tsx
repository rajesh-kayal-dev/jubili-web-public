import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Get active tab based on current pathname
  const getActiveTab = () => {
    const navItems = [
      { name: 'Home', path: '/' },
      { name: 'Search', path: '/search' },
      { name: 'Offers', path: '/offers' },
      { name: 'Cart', path: '/cart' },
      { name: 'User', path: '/user' }
    ];
    
    const activeItem = navItems.find(item => item.path === pathname);
    return activeItem ? activeItem.name : 'Home';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [pathname]);

  // Detect keyboard open/close on mobile
  useEffect(() => {
    const handleResize = () => {
      if (showSearchInput && typeof window !== 'undefined') {
        const viewport = window.visualViewport;
        if (viewport) {
          const keyboardHeight = window.innerHeight - viewport.height;
          setKeyboardOpen(keyboardHeight > 150); // Threshold for keyboard detection
        } else {
          // Fallback for browsers without Visual Viewport API
          const viewportHeight = window.innerHeight;
          const documentHeight = document.documentElement.clientHeight;
          setKeyboardOpen(documentHeight < viewportHeight * 0.75);
        }
      }
    };

    if (typeof window !== 'undefined') {
      const viewport = window.visualViewport;
      if (viewport) {
        viewport.addEventListener('resize', handleResize);
        return () => {
          viewport.removeEventListener('resize', handleResize);
        };
      } else {
        // Fallback event listener
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }
  }, [showSearchInput]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10) {
        setShow(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Custom SVG Icons
  const HomeIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 10.5L12 3l8 7.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-8z" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  );

  const SearchIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );

  const PercentIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="19" y1="5" x2="5" y2="19"/>
      <circle cx="6.5" cy="6.5" r="2.5"/>
      <circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  );

  const CartIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );

  const UserIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const CloseIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const navItems = [
    { name: 'Home', icon: HomeIcon, href: '/' },
    { name: 'Search', icon: SearchIcon, href: '/search' },
    { name: 'Offers', icon: PercentIcon, href: '/offers' },
    { name: 'Cart', icon: CartIcon, href: '/cart' },
    { name: 'User', icon: UserIcon, href: '/user' }
  ];

  const handleTabClick = (tabName: string) => {
    if (tabName === 'Search') {
      setShowSearchInput(true);
      setActiveTab(tabName);
      // Don't navigate for search, just show search input
    } else {
      setShowSearchInput(false);
      setActiveTab(tabName);
      
      // Navigate to the corresponding route
      const routes: { [key: string]: string } = {
        'Home': '/',
        'Offers': '/offers',
        'Cart': '/cart',
        'User': '/user'
      };
      
      if (routes[tabName]) {
        router.push(routes[tabName]);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchInput(false);
      console.log('Searching for:', searchQuery);
    }
  };

  const closeSearch = () => {
    setShowSearchInput(false);
    setSearchQuery('');
    setKeyboardOpen(false);
    // Don't change active tab, keep current page
  };

  // Calculate navbar position based on keyboard state
  const getNavbarPosition = () => {
    if (showSearchInput && keyboardOpen) {
      return 'top-6'; // Move to top when keyboard is open
    }
    return 'bottom-6'; // Default bottom position
  };

  return (
    <nav
      className={`fixed ${getNavbarPosition()} left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95vw] max-w-2xl md:w-auto ${
        show ? 'translate-y-0' : (showSearchInput && keyboardOpen ? '-translate-y-0' : 'translate-y-32')
      }`}
    >
      <div className={`bg-gray-900 rounded-full shadow-2xl transition-all duration-500 ease-in-out ${
        showSearchInput ? 'px-4 py-3' : 'px-6 py-4'
      }`}>
        {showSearchInput ? (
          // Search Input Mode
          <div className="flex items-center gap-3">
            <SearchIcon size={18} className="text-gray-400 flex-shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                autoFocus
              />
            </form>
            <button
              onClick={closeSearch}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex-shrink-0"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        ) : (
          // Normal Navigation Mode
          <div className="flex items-center justify-between gap-6">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              
              return (
                <div
                  key={item.name}
                  onClick={() => handleTabClick(item.name)}
                  className="cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  {isActive ? (
                    // Active state: White pill with black icon and text
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 transform transition-all duration-300 ease-out">
                      <Icon 
                        size={18} 
                        className="text-gray-900 transition-all duration-300"
                      />
                      <span className="font-medium text-sm text-gray-900 animate-fade-in">
                        {item.name}
                      </span>
                    </div>
                  ) : (
                    // Inactive state: Just the outline icon
                    <div className="p-2 transition-all duration-300">
                      <Icon 
                        size={20} 
                        className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;