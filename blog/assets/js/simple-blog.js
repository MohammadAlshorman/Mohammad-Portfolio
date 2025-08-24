// Mohammad Alshorman Blog - Simple JavaScript

// Sample blog posts data
const samplePosts = [
    {
        id: 1,
        title: "نظام إدارة مكتب المحاماة",
        excerpt: "نظام شامل لإدارة العمليات اليومية في مكاتب المحاماة مع إدارة العملاء والقضايا والفواتير.",
        content: "نظام إدارة مكتب المحاماة هو حل تقني متكامل يهدف إلى تبسيط وتحسين العمليات اليومية في مكاتب المحاماة...",
        date: "2024-01-15",
        readTime: "8 دقائق",
        language: "عربي",
        tags: ["ASP.NET", "SQL Server", "Bootstrap"],
        author: "محمد الشرمان",
        category: "Development",
        featured: true
    },
    {
        id: 2,
        title: "REST API Best Practices",
        excerpt: "دليل شامل لأفضل الممارسات في تطوير واجهات برمجة التطبيقات RESTful.",
        content: "في عالم التطوير الحديث، تلعب واجهات برمجة التطبيقات REST دوراً محورياً في ربط الأنظمة المختلفة...",
        date: "2024-01-10",
        readTime: "12 دقيقة",
        language: "عربي",
        tags: ["REST API", "Node.js", "Express"],
        author: "محمد الشرمان",
        category: "API",
        featured: true
    },
    {
        id: 3,
        title: "Clean Architecture in .NET",
        excerpt: "Understanding and implementing Clean Architecture principles in .NET applications.",
        content: "Clean Architecture is a software design philosophy that separates the elements of a design into ring levels...",
        date: "2024-01-05",
        readTime: "15 minutes",
        language: "English",
        tags: [".NET", "Clean Architecture", "Design Patterns"],
        author: "Mohammad Alshorman",
        category: "Architecture",
        featured: false
    },
    {
        id: 4,
        title: "Angular Performance Optimization",
        excerpt: "Advanced techniques for optimizing Angular applications performance.",
        content: "Performance optimization in Angular applications is crucial for delivering smooth user experiences...",
        date: "2024-01-01",
        readTime: "10 minutes",
        language: "English",
        tags: ["Angular", "Performance", "TypeScript"],
        author: "Mohammad Alshorman",
        category: "Frontend",
        featured: false
    }
];

class SimpleBlog {
    constructor() {
        this.posts = samplePosts;
        this.filteredPosts = [...this.posts];
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderPosts();
        this.updatePostsCount();
        console.log('Blog initialized successfully');
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }

        // Language filter
        const languageFilter = document.getElementById('languageFilter');
        if (languageFilter) {
            languageFilter.addEventListener('change', (e) => {
                this.filterByLanguage(e.target.value);
            });
        }

        // View toggle
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeView(e.target.dataset.view);
            });
        });
    }

    searchPosts(query) {
        if (!query.trim()) {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
        }
        this.renderPosts();
        this.updatePostsCount();
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.category.toLowerCase() === category.toLowerCase()
            );
        }
        this.renderPosts();
        this.updatePostsCount();
    }

    filterByLanguage(language) {
        if (language === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.language.toLowerCase().includes(language.toLowerCase())
            );
        }
        this.renderPosts();
        this.updatePostsCount();
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('Theme changed to:', newTheme);
    }

    toggleLanguage() {
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
        
        document.documentElement.setAttribute('lang', newLang);
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('language', newLang);
        console.log('Language changed to:', newLang);
    }

    changeView(view) {
        this.currentView = view;
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.renderPosts();
    }

    renderPosts() {
        const postsContainer = document.getElementById('postsGrid');
        const featuredContainer = document.getElementById('featuredGrid');
        
        if (!postsContainer) {
            console.log('Posts container not found');
            return;
        }

        // Render featured posts
        if (featuredContainer) {
            const featuredPosts = this.filteredPosts.filter(post => post.featured);
            featuredContainer.innerHTML = featuredPosts.map(post => this.createPostCard(post)).join('');
        }

        // Render all posts
        if (this.filteredPosts.length === 0) {
            postsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <h3 class="empty-state-text">لا توجد مقالات</h3>
                    <p class="empty-state-subtext">لم يتم العثور على مقالات تطابق البحث</p>
                </div>
            `;
        } else {
            postsContainer.innerHTML = this.filteredPosts.map(post => this.createPostCard(post)).join('');
        }
    }

    createPostCard(post) {
        const isArabic = post.language.includes('عربي');
        const postUrl = `posts/post-${post.id}.html`;
        
        return `
            <article class="post-card" data-id="${post.id}">
                <div class="post-image">
                    <div class="post-overlay">
                        <span class="language-badge">${post.language}</span>
                    </div>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date">
                            <i class="fas fa-calendar"></i>
                            ${this.formatDate(post.date)}
                        </span>
                        <span class="post-read-time">
                            <i class="fas fa-clock"></i>
                            ${post.readTime}
                        </span>
                    </div>
                    <h3 class="post-title">
                        <a href="${postUrl}">${post.title}</a>
                    </h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="post-footer">
                        <span class="post-author">
                            <i class="fas fa-user"></i>
                            ${post.author}
                        </span>
                        <a href="${postUrl}" class="read-more-btn">
                            ${isArabic ? 'اقرأ المزيد' : 'Read More'}
                            <i class="fas fa-arrow-${isArabic ? 'left' : 'right'}"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const locale = currentLang === 'ar' ? 'ar-SA' : 'en-US';
        
        return date.toLocaleDateString(locale, options);
    }

    updatePostsCount() {
        const countElement = document.getElementById('postsCount');
        if (countElement) {
            countElement.textContent = `${this.filteredPosts.length} مقال`;
        }
    }

    // Initialize theme and language from localStorage
    initializeSettings() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLang = localStorage.getItem('language') || 'ar';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.setAttribute('lang', savedLang);
        document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing blog...');
    
    const blog = new SimpleBlog();
    blog.initializeSettings();
    
    // Show loading state initially
    const postsContainer = document.getElementById('postsGrid');
    if (postsContainer) {
        postsContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>جاري تحميل المقالات...</p>
            </div>
        `;
        
        // Simulate loading delay
        setTimeout(() => {
            blog.renderPosts();
            blog.updatePostsCount();
        }, 1000);
    }
    
    console.log('Blog setup completed');
});

// Global blog instance
window.blog = null;

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleBlog;
}
