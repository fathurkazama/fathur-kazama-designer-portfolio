/* ============================================================
  ||
  ||   Website Portfolio Fathur Kazama
  ||   Code Signature: Designed & Developed by Fathur Kazama
  ||   Contact: fathurkazama@fathurkazama.id / fb : Fathur ID
  ||   Copyright © 2025 Fathur Kazama. All Rights Reserved.
  ||
  ============================================================
*/

// fathurkazama

document.addEventListener('DOMContentLoaded', () => {

    // A. Fungsi Navigasi & Tampilan
    // ===================================
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    // Smooth scrolling super halus
    const smoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset dari header
                behavior: 'smooth'
            });
        }
    };

    // Handle klik link navigasi
    document.querySelectorAll('.nav-links a, .btn').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
                // Tutup menu mobile jika terbuka
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Toggle menu mobile biar gampang diakses
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });


    // B. Efek Visual & Animasi
    // ===================================
    
    // Animasi muncul perlahan setiap bagian
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));

    // Animasi hitungan angka stat
    const animateStats = (stat) => {
        const target = +stat.dataset.target; // Ambil nilai dari data-attribute
        let current = 0;
        const increment = target / 200; // Kecepatan hitungan
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                stat.textContent = Math.floor(current) + '+';
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 5);
    };

    // Jalankan animasi stat saat bagian hero terlihat
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(stat => {
                    animateStats(stat);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    

    // Efek parallax halus pada gambar
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image-wrapper');
        const aboutImage = document.querySelector('.about-image-wrapper');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
        }
        
        if (aboutImage) {
            aboutImage.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    // C. Logika Lain-lain
    // ===================================

    // Fitur filter portfolio
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (portfolioGrid && filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;

                portfolioGrid.querySelectorAll('.portfolio-item').forEach(item => {
                    const isFiltered = filter === 'all' || item.dataset.category === filter;
                    if (isFiltered) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Penanganan form kontak yang lebih 'friendly'
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Lagi dikirim... ✨';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                submitBtn.textContent = 'Berhasil Terkirim! 🎉';
                submitBtn.style.background = 'linear-gradient(135deg, var(--success-color) 0%, #059669 100%)';
                
                setTimeout(() => {
                    alert('Terima kasih banyak! Saya akan segera merespons pesan Anda. Ditunggu, ya! ');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'var(--gradient-soft)';
                }, 2000);
            }, 2500);
        });
    }

    // Efek transisi pada kartu saat hover
    document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });

    // Pastikan halaman tidak loading lama
    document.body.classList.remove('loading');
});
