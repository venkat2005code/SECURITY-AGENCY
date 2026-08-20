document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check for saved theme preference, otherwise use system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icons
    themeToggles.forEach(toggle => {
      toggle.innerHTML = theme === 'dark' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    });
  };

  setTheme(getPreferredTheme());

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // --- RTL/LTR Toggle ---
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const getPreferredDir = () => {
    return localStorage.getItem('dir') || 'ltr';
  };

  const setDir = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('dir', dir);
    
    // The prompt requested: Show 'LTR' when in LTR mode, 'RTL' when in RTL mode.
    // Wait, the prompt says: "RTL/LTR toggle displaying only the active mode: Show LTR when in LTR mode. Show RTL when in RTL mode."
    // Most standard toggles show the *other* option to switch to, but if the prompt strictly says show the active one, I will do that.
    // However, usually it means the button *displays* the current state.
    rtlToggles.forEach(toggle => {
      toggle.textContent = dir === 'rtl' ? 'RTL' : 'LTR';
    });
  };

  setDir(getPreferredDir());

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      setDir(currentDir === 'rtl' ? 'ltr' : 'rtl');
    });
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = mobileMenuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // --- Highlight Active Nav Link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
      // If it's a dropdown item, also highlight the parent
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        dropdown.querySelector('.nav-link').classList.add('active');
      }
    }
  });

  // --- Dropdown Toggle for Touch Devices (Mobile/Tablet) ---
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Prevent navigation on the main dropdown link so it can open the menu instead
      e.preventDefault();
      e.stopPropagation(); // Prevent document click listener from firing
      
      const dropdownMenu = toggle.nextElementSibling;
      if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
        // Close any other open dropdowns first
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
          if (menu !== dropdownMenu) {
            menu.classList.remove('show');
          }
        });
        
        // Toggle the current one
        dropdownMenu.classList.toggle('show');
      }
    });
  });

  // Close dropdowns when clicking anywhere outside of them
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

});
