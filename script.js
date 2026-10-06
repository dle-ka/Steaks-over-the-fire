/**
 * EMBER — Премиальный стейк-хаус
 * Vanilla JavaScript
 * Комментарии на русском
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Прелоадер ----------
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    // Небольшая задержка, чтобы анимация пламени успела проиграться
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      // Удаляем из DOM после анимации скрытия
      setTimeout(() => {
        preloader.remove();
      }, 900);
    }, 1600);
  });

  // ---------- Шапка при скролле ----------
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ---------- Мобильное меню (бургер) ----------
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  // Закрытие меню при клике на ссылку
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Parallax на Hero ----------
  const heroBg = document.getElementById('heroBg');

  const handleParallax = () => {
    const scrollY = window.scrollY;
    // Двигаем фон медленнее скролла (эффект глубины)
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.05)`;
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ---------- IntersectionObserver — появление секций ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Можно отключить наблюдение после появления (для производительности)
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ---------- Валидация формы бронирования ----------
  const form = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  // Маска телефона (простая)
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value[0] === '8') value = '7' + value.slice(1);
      if (value[0] !== '7') value = '7' + value;
    }
    let formatted = '';
    if (value.length > 0) formatted = '+' + value[0];
    if (value.length > 1) formatted += ' (' + value.slice(1, 4);
    if (value.length > 4) formatted += ') ' + value.slice(4, 7);
    if (value.length > 7) formatted += '-' + value.slice(7, 9);
    if (value.length > 9) formatted += '-' + value.slice(9, 11);
    e.target.value = formatted;
  });

  // Установка минимальной даты (сегодня)
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  const showError = (inputId, message) => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(inputId + 'Error');
    const group = input.closest('.form-group');
    group.classList.add('is-invalid');
    errorEl.textContent = message;
  };

  const clearError = (inputId) => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(inputId + 'Error');
    const group = input.closest('.form-group');
    group.classList.remove('is-invalid');
    errorEl.textContent = '';
  };

  const validateForm = () => {
    let isValid = true;

    // Имя
    const name = document.getElementById('name').value.trim();
    if (!name) {
      showError('name', 'Введите имя');
      isValid = false;
    } else if (name.length < 2) {
      showError('name', 'Имя слишком короткое');
      isValid = false;
    } else {
      clearError('name');
    }

    // Телефон
    const phone = document.getElementById('phone').value.replace(/\D/g, '');
    if (!phone || phone.length < 11) {
      showError('phone', 'Введите корректный телефон');
      isValid = false;
    } else {
      clearError('phone');
    }

    // Дата
    const date = document.getElementById('date').value;
    if (!date) {
      showError('date', 'Выберите дату');
      isValid = false;
    } else {
      clearError('date');
    }

    // Время
    const time = document.getElementById('time').value;
    if (!time) {
      showError('time', 'Выберите время');
      isValid = false;
    } else {
      clearError('time');
    }

    // Гости
    const guests = document.getElementById('guests').value;
    if (!guests) {
      showError('guests', 'Укажите количество гостей');
      isValid = false;
    } else {
      clearError('guests');
    }

    return isValid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Здесь обычно отправка на сервер
      // Для демо просто показываем успех
      form.reset();
      formSuccess.hidden = false;

      // Скрываем сообщение через 5 секунд
      setTimeout(() => {
        formSuccess.hidden = true;
      }, 5000);

      // Прокрутка к сообщению
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Очистка ошибок при вводе
  ['name', 'phone', 'date', 'time', 'guests'].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => clearError(id));
    el.addEventListener('change', () => clearError(id));
  });

  // ---------- Плавный скролл для якорных ссылок (дополнительно к CSS) ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Слайдер отзывов ----------
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  const dotsWrap = document.getElementById('reviewsDots');

  if (track && prevBtn && nextBtn) {
    const cards = track.querySelectorAll('.review-card');
    const getScrollAmount = () => {
      const card = cards[0];
      if (!card) return 300;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 24;
      return card.offsetWidth + gap;
    };

    // Точки
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'reviews__dot' + (i === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
      dot.addEventListener('click', () => {
        track.scrollTo({ left: i * getScrollAmount(), behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
    });

    const updateNav = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 4;

      const index = Math.round(track.scrollLeft / getScrollAmount());
      dotsWrap.querySelectorAll('.reviews__dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === index);
      });
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateNav);
    }, { passive: true });

    updateNav();
  }

  // ---------- Градиент за курсором ----------
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.classList.add('is-active');
      if (!rafId) rafId = requestAnimationFrame(animate);
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      glow.classList.remove('is-active');
    });
  }
});
