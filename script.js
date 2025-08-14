document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(element);
    });

    const animatedTextElements = document.querySelectorAll('.animated-text');

    animatedTextElements.forEach(textElement => {
        const text = textElement.textContent;
        textElement.innerHTML = '';
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.animationDelay = `${index * 0.03}s`;
            textElement.appendChild(span);
        });

        const observerLetters = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const letterSpans = textElement.querySelectorAll('span');
                    letterSpans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                        span.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                    });
                    observerLetters.unobserve(textElement);
                }
            });
        }, { threshold: 0.5 });

        observerLetters.observe(textElement);
    });
});
