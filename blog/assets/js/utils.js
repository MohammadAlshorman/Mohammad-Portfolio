/* ========================================
   MOHAMMAD ALSHORMAN - BLOG UTILITIES
   SEO and Performance Utilities
   Advanced JavaScript Enhancements
======================================== */

// Blog Configuration
const BLOG_CONFIG = {
  author: {
    name: 'Mohammad Alshorman',
    nameArabic: 'محمد شحادة الشرمان',
    title: 'Full Stack Web Developer',
    location: 'Irbid, Jordan',
    website: 'https://mohammadalshorman.com',
    social: {
      twitter: '@mohammadalshorman',
      linkedin: 'in/mohammad-alshorman',
      github: 'mohammad-alshorman'
    }
  },
  site: {
    title: 'Mohammad Alshorman Blog',
    description: 'Professional technical blog featuring insights on ASP.NET Core, Angular, C#, and modern web development.',
    url: 'https://mohammadalshorman.com/blog',
    language: 'en',
    keywords: 'Mohammad Alshorman, Full Stack Developer, ASP.NET Core, Angular, C#, TypeScript, Web Development, Jordan'
  },
  features: {
    postsPerPage: 6,
    searchDebounce: 300,
    animationDelay: 100,
    lazyLoading: true,
    darkTheme: true,
    analytics: true
  }
};

// SEO Utilities
class SEOUtils {
  static updatePageTitle(title) {
    document.title = title ? `${title} - ${BLOG_CONFIG.site.title}` : BLOG_CONFIG.site.title;
  }

  static updateMetaDescription(description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description || BLOG_CONFIG.site.description;
  }

  static updateCanonicalUrl(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;
  }

  static generateStructuredData(type, data) {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      author: {
        '@type': 'Person',
        name: BLOG_CONFIG.author.name,
        jobTitle: BLOG_CONFIG.author.title,
        workLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Irbid',
            addressCountry: 'Jordan'
          }
        }
      }
    };

    return { ...baseData, ...data };
  }

  static injectStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  static updateOpenGraph(data) {
    const ogTags = {
      'og:title': data.title || BLOG_CONFIG.site.title,
      'og:description': data.description || BLOG_CONFIG.site.description,
      'og:image': data.image || `${BLOG_CONFIG.site.url}/assets/img/default-og.webp`,
      'og:url': data.url || window.location.href,
      'og:type': data.type || 'website',
      'og:site_name': BLOG_CONFIG.site.title
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }

  static updateTwitterCard(data) {
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:site': BLOG_CONFIG.author.social.twitter,
      'twitter:creator': BLOG_CONFIG.author.social.twitter,
      'twitter:title': data.title || BLOG_CONFIG.site.title,
      'twitter:description': data.description || BLOG_CONFIG.site.description,
      'twitter:image': data.image || `${BLOG_CONFIG.site.url}/assets/img/default-twitter.webp`
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }
}

// Performance Utilities
class PerformanceUtils {
  static preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  static preloadImages(srcs) {
    return Promise.all(srcs.map(src => this.preloadImage(src)));
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${(end - start).toFixed(2)} milliseconds`);
    return result;
  }

  static trackCoreWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let cls = 0;
      entryList.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      console.log('CLS:', cls);
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Analytics Utilities
class AnalyticsUtils {
  static trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    // Custom analytics can be added here
    console.log('Event tracked:', eventName, parameters);
  }

  static trackPageView(title, url) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: url
      });
    }
    
    this.trackEvent('page_view', {
      page_title: title,
      page_location: url
    });
  }

  static trackSearch(query, results) {
    this.trackEvent('search', {
      search_term: query,
      results_count: results
    });
  }

  static trackPostRead(postTitle, readTime) {
    this.trackEvent('post_read', {
      post_title: postTitle,
      estimated_read_time: readTime
    });
  }

  static trackShare(platform, url, title) {
    this.trackEvent('share', {
      platform: platform,
      url: url,
      title: title
    });
  }
}

// Accessibility Utilities
class AccessibilityUtils {
  static announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  static trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  static addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Mobile Utilities
class MobileUtils {
  static isMobile() {
    return window.innerWidth <= 768;
  }

  static isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  static addMobileClasses() {
    if (this.isMobile()) {
      document.body.classList.add('mobile');
    }
    
    if (this.isTouch()) {
      document.body.classList.add('touch');
    }
  }

  static handleViewportChanges() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
}

// Error Handling
class ErrorHandler {
  static handleImageError(img, fallbackSrc) {
    img.onerror = () => {
      img.src = fallbackSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjZjhmOWZhIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjI1IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4=';
    };
  }

  static handleJSONError(error, fallbackData = []) {
    console.error('JSON loading error:', error);
    AnalyticsUtils.trackEvent('error', {
      error_type: 'json_load_error',
      error_message: error.message
    });
    return fallbackData;
  }

  static showErrorMessage(message, container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <h3>Oops! Something went wrong</h3>
      <p>${message}</p>
      <button onclick="location.reload()" class="retry-btn">Try Again</button>
    `;
    
    if (container) {
      container.innerHTML = '';
      container.appendChild(errorDiv);
    }
  }
}

// Initialize utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile utilities
  MobileUtils.addMobileClasses();
  MobileUtils.handleViewportChanges();
  
  // Add accessibility features
  AccessibilityUtils.addSkipLink();
  
  // Track performance if enabled
  if (BLOG_CONFIG.features.analytics) {
    PerformanceUtils.trackCoreWebVitals();
  }
  
  // Add error handling for images
  document.querySelectorAll('img').forEach(img => {
    ErrorHandler.handleImageError(img);
  });
});

// Export utilities for global use
window.BlogUtils = {
  SEO: SEOUtils,
  Performance: PerformanceUtils,
  Analytics: AnalyticsUtils,
  Accessibility: AccessibilityUtils,
  Mobile: MobileUtils,
  Error: ErrorHandler,
  Config: BLOG_CONFIG
};
