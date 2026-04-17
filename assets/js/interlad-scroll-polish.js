document.addEventListener('DOMContentLoaded', function () {
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const targets = [
		...document.querySelectorAll('.main > header'),
		...document.querySelectorAll('.main > .inner.style2 > .image.main:first-child'),
		...document.querySelectorAll('.post'),
		...document.querySelectorAll('.service-card'),
		...document.querySelectorAll('.project-card'),
		...document.querySelectorAll('#contact .inner.narrow')
	];

	if (!targets.length) return;

	if (reduceMotion || window.innerWidth <= 736) {
		targets.forEach(function (el) {
			el.classList.add('is-visible');
		});
		return;
	}

	targets.forEach(function (el, index) {
		el.classList.add('reveal-on-scroll');

		if (el.matches('.main > header, #contact .inner.narrow')) {
			el.classList.add('reveal-soft');
		}

		if (el.matches('.main > .inner.style2 > .image.main:first-child')) {
			el.classList.add('reveal-image');
		}

		el.style.setProperty('--reveal-delay', ((index % 4) * 70) + 'ms');
	});

	const observer = new IntersectionObserver(function (entries, obs) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				obs.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.14,
		rootMargin: '0px 0px -8% 0px'
	});

	targets.forEach(function (el) {
		observer.observe(el);
	});
});