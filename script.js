// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect for the name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '2px solid #fff';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                nameElement.style.borderRight = 'none';
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add enhanced counter animation for achievements
    const animateCounters = () => {
        const counters = document.querySelectorAll('.achievements li strong');
        counters.forEach(counter => {
            const text = counter.textContent;
            // Look for numbers with $, %, +, or k (for thousands)
            if (text.includes('$') || text.includes('%') || text.includes('+') || text.includes('k')) {
                const numberMatch = text.match(/(\d+(?:\.\d+)?)/);
                if (numberMatch) {
                    const originalNumber = numberMatch[1];
                    const target = parseFloat(originalNumber);
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const steps = 60;
                    const increment = target / steps;
                    const stepDuration = duration / steps;
                    
                    // Add a visual effect to the counter
                    counter.classList.add('counting');
                    counter.style.color = '#667eea';
                    counter.style.fontWeight = '700';
                    counter.style.transition = 'all 0.3s ease';
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                            // Final effect
                            counter.classList.remove('counting');
                            counter.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                counter.style.transform = 'scale(1)';
                            }, 200);
                        }
                        
                        // Format the number based on original format
                        let displayNumber;
                        if (text.includes('k')) {
                            displayNumber = (current / 1000).toFixed(1) + 'k';
                        } else if (text.includes('.')) {
                            displayNumber = current.toFixed(2);
                        } else {
                            displayNumber = Math.floor(current);
                        }
                        
                        counter.textContent = text.replace(originalNumber, displayNumber);
                    }, stepDuration);
                }
            }
        });
    };

    // Trigger counter animation when experience section is visible
    const experienceSection = document.querySelector('.section:nth-child(3)');
    if (experienceSection) {
        const experienceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 300);
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        experienceObserver.observe(experienceSection);
    }

    // Also trigger on page load for immediate effect
    setTimeout(animateCounters, 1000);

    // Add subtle 3D mouse tracking effect
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Add 3D card flip effect for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateX(5deg) rotateY(5deg) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Add smooth hover effect for skill tags (removed complex mouse tracking)
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        });
    });

    // Add 3D hover effect for sections (no vertical movement)
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(15px) rotateX(2deg)';
            this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.15)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0) rotateX(0deg)';
            this.style.boxShadow = 'none';
        });
    });

    // Add CSS for enhanced 3D effects
    const style = document.createElement('style');
    style.textContent = `
        .skill-tag {
            cursor: pointer;
            transform-style: preserve-3d;
        }
        
        .experience-item {
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .experience-item:hover .achievements li {
            transform: translateX(5px) translateZ(5px);
            transition: transform 0.3s ease;
        }
        
        .project-item {
            transform-style: preserve-3d;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .project-item:hover .project-title {
            color: #667eea;
            transform: translateZ(10px);
            transition: all 0.3s ease;
        }
        
        .award-item {
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .award-item:hover .award-title {
            transform: scale(1.05) translateZ(15px);
            transition: transform 0.3s ease;
        }
        
        .section {
            transform-style: preserve-3d;
            transition: all 0.3s ease;
        }
        
        /* 3D text effect for name */
        .name {
            text-shadow: 
                0 1px 0 #ccc,
                0 2px 0 #c9c9c9,
                0 3px 0 #bbb,
                0 4px 0 #b9b9b9,
                0 5px 0 #aaa,
                0 6px 1px rgba(0,0,0,.1),
                0 0 5px rgba(0,0,0,.1),
                0 1px 3px rgba(0,0,0,.3),
                0 3px 5px rgba(0,0,0,.2),
                0 5px 10px rgba(0,0,0,.25),
                0 10px 10px rgba(0,0,0,.2),
                0 20px 20px rgba(0,0,0,.15);
        }
        
        /* 3D button effect for theme toggle */
        .theme-toggle {
            transform-style: preserve-3d;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: translateY(-2px) rotateX(10deg);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .theme-toggle:active {
            transform: translateY(0px) rotateX(5deg);
        }
    `;
    document.head.appendChild(style);

    // Add click-to-copy functionality for contact info
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.href && this.href.startsWith('mailto:')) {
                return; // Don't interfere with mailto links
            }
            
            const text = this.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                // Show a temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #667eea;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = '50%';
                tooltip.style.top = '-30px';
                tooltip.style.transform = 'translateX(-50%)';
                
                // Show and hide tooltip
                setTimeout(() => tooltip.style.opacity = '1', 10);
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        console.log('Theme toggle button found:', themeToggle);
        
        // Ensure the button is visible and clickable
        themeToggle.style.pointerEvents = 'auto';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.userSelect = 'none';
        
        // Add a subtle pulse animation to draw attention to the toggle
        themeToggle.style.animation = 'themeTogglePulse 2s ease-in-out infinite';
        
        let isDarkMode = false;
        
        // Test click to make sure it's working
        themeToggle.addEventListener('mousedown', () => {
            console.log('Button pressed!');
        });
        
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme toggle clicked!');
            
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode');
            themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
            
            console.log('Dark mode:', isDarkMode);
            console.log('Body classes:', document.body.className);
            
            // Add a click effect
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Remove the pulse animation after 5 seconds
        setTimeout(() => {
            themeToggle.style.animation = 'none';
        }, 5000);
        
        // Test if the button is working by simulating a click after 2 seconds
        setTimeout(() => {
            console.log('Testing button click...');
            themeToggle.click();
        }, 2000);
        
    } else {
        console.error('Theme toggle button not found!');
    }

    // Add comprehensive dark mode styles
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        .dark-mode {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        .dark-mode .container {
            background: #1a1a2e;
            color: #fff;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        /* Dark mode for header */
        .dark-mode .header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        .dark-mode .name {
            background: linear-gradient(45deg, #fff, #e0e0e0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .dark-mode .title {
            color: #e0e0e0;
        }
        
        .dark-mode .contact-item {
            background: rgba(255, 255, 255, 0.1);
            color: #e0e0e0;
        }
        
        .dark-mode .contact-item:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
        }
        
        .dark-mode .avatar-image {
            border-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        
        .dark-mode .avatar-image:hover {
            border-color: rgba(255, 255, 255, 0.7);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }
        
        /* Dark mode for sections */
        .dark-mode .section {
            border-bottom-color: #2d2d44;
        }
        
        .dark-mode .section-title {
            color: #667eea;
            border-bottom-color: #3d3d54;
        }
        
        .dark-mode .section-title i {
            color: #667eea;
        }
        
        /* Dark mode for summary */
        .dark-mode .summary {
            background: #2d2d44;
            color: #e0e0e0;
            border-left-color: #667eea;
        }
        
        /* Dark mode for experience items */
        .dark-mode .experience-item,
        .dark-mode .education-item,
        .dark-mode .skill-category,
        .dark-mode .project-item,
        .dark-mode .award-item,
        .dark-mode .activities-list li {
            background: #2d2d44;
            border-color: #3d3d54;
        }
        
        .dark-mode .job-title,
        .dark-mode .degree,
        .dark-mode .project-title,
        .dark-mode .skill-category-title {
            color: #e0e0e0;
        }
        
        .dark-mode .company-name,
        .dark-mode .school-name {
            color: #667eea;
        }
        
        .dark-mode .company-description {
            color: #aaa;
        }
        
        .dark-mode .achievements li,
        .dark-mode .project-description,
        .dark-mode .award-description,
        .dark-mode .coursework {
            color: #ccc;
        }
        
        .dark-mode .achievements li::before {
            color: #667eea;
        }
        
        /* Dark mode for skill tags */
        .dark-mode .skill-tag {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        
        .dark-mode .skill-tag:hover {
            background: linear-gradient(135deg, #7c8ff0, #8a5bb8);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
        }
        
        /* Dark mode for education details */
        .dark-mode .education-details {
            background: #1a1a2e;
        }
        
        .dark-mode .gpa {
            color: #e0e0e0;
        }
        
        /* Dark mode for location and duration */
        .dark-mode .location,
        .dark-mode .duration {
            color: #aaa;
        }
        
        /* Dark mode for activities list */
        .dark-mode .activities-list li::before {
            filter: brightness(1.2);
        }
        
        /* Dark mode for counter numbers */
        .dark-mode .achievements li strong.counting {
            color: #667eea !important;
        }
        
        /* Dark mode for theme toggle */
        .dark-mode .theme-toggle {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
        }
        
        /* Dark mode for particles */
        .dark-mode .particle {
            background: rgba(255, 255, 255, 0.1);
        }
        
        /* Dark mode for ripple effect */
        .dark-mode .ripple {
            background: rgba(102, 126, 234, 0.4);
        }
        
        /* Dark mode animations */
        .dark-mode .name {
            animation: nameGlowDark 3s ease-in-out infinite alternate;
        }
        
        @keyframes nameGlowDark {
            0% {
                filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
            }
            100% {
                filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
            }
        }
        
        .dark-mode .title {
            animation: titleFloatDark 4s ease-in-out infinite;
        }
        
        @keyframes titleFloatDark {
            0%, 100% {
                transform: translateY(0px) rotateX(0deg);
            }
            50% {
                transform: translateY(-3px) rotateX(2deg);
            }
        }
        
        .dark-mode .avatar-image {
            animation: avatarFloatDark 6s ease-in-out infinite;
        }
        
        @keyframes avatarFloatDark {
            0%, 100% { 
                transform: translateY(0px) rotateX(0deg); 
            }
            50% { 
                transform: translateY(-8px) rotateX(2deg); 
            }
        }
        
        .dark-mode .container {
            animation: containerFloatDark 6s ease-in-out infinite;
        }
        
        @keyframes containerFloatDark {
            0%, 100% { 
                transform: translateY(0px) rotateX(0deg); 
            }
            50% { 
                transform: translateY(-5px) rotateX(0.5deg); 
            }
        }
    `;
    document.head.appendChild(darkModeStyles);

    // Add floating particles background
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 15 + 15}s linear infinite;
                transform: translateZ(${Math.random() * 50}px);
            `;
            particlesContainer.appendChild(particle);
        }
    };

    // Add CSS for floating particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0) translateZ(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) translateZ(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    createParticles();



    // Remove scroll-triggered vertical movement to prevent white spaces
    // Sections will only have hover effects now

    // Add magnetic effect to interactive elements (excluding skill tags and section titles)
    const magneticElements = document.querySelectorAll('.contact-item');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px) translateZ(0px)';
        });
    });

    // Add ripple effect to clicks
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: rippleEffect 0.6s ease-out;
        `;
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(40);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}); 