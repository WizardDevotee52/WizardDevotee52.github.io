/* ===== Modales: abrir/cerrar ===== */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('hidden');
  document.documentElement.style.overflow = 'hidden';
  setTimeout(() => m.querySelector('h3')?.focus?.(), 0);
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('hidden');
  document.documentElement.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m =>
      !m.classList.contains('hidden') && m.classList.add('hidden')
    );
    document.documentElement.style.overflow = '';
  }
});

/* ========= CARRUSEL SERVICIOS — SWIPER CONTINUO ========= */

document.addEventListener("DOMContentLoaded", function () {

  // Swiper solo como contenedor
  const swiper = new Swiper("#servicesSwiper", {
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 16,
    allowTouchMove: false
  });

  const wrapper = swiper.wrapperEl;

  // 1. Duplicar slides suficientes
  wrapper.innerHTML += wrapper.innerHTML;
  wrapper.innerHTML += wrapper.innerHTML;

  // 2. Calcular ancho original
  const originalWidth = wrapper.scrollWidth / 4;

  // 3. Movimiento continuo controlado
  let offset = 0;
  const speed = 0.5;
  let paused = false;            // ← se pausa en hover
  let forcePaused = false;       // ← se pausa al voltear tarjeta

  function mover() {
    if (!paused && !forcePaused) {
      offset -= speed;
      wrapper.style.transform = `translateX(${offset}px)`;

      if (Math.abs(offset) >= originalWidth + 5) {
        offset = 0;
      }
    }

    requestAnimationFrame(mover);
  }

  mover();

  // === DETENER EN HOVER ===
  const swiperContainer = document.getElementById("servicesSwiper");

  swiperContainer.addEventListener("mouseenter", () => {
    if (!forcePaused) paused = true;
  });

  swiperContainer.addEventListener("mouseleave", () => {
    if (!forcePaused) paused = false;
  });

  // === DETENER CUANDO UNA TARJETA SE VOLTEA ===
  document.addEventListener("click", (e) => {
    const flipped = document.querySelector(".flip-inner.flipped");

    if (flipped) {
      forcePaused = true;     // bloquear movimiento aunque salga el mouse
      paused = true;
    } else {
      forcePaused = false;    // no hay tarjetas volteadas → permitir movimiento
      paused = false;
    }
  });

});



/* ===== Flip cards ===== */

const servicesTrack = document.getElementById('servicesSwiper');

function unflipAll(exceptInner) {
  document
    .querySelectorAll('.flip-inner')
    .forEach(el => {
      if (el !== exceptInner) el.classList.remove('flipped');
    });

  document
    .querySelectorAll('.service-pill[aria-expanded="true"]')
    .forEach(b => b.setAttribute('aria-expanded', 'false'));
}

if (servicesTrack) {
  servicesTrack.addEventListener('click', (e) => {
    const pill  = e.target.closest('.service-pill');
    if (!pill) return;

    const inner  = pill.querySelector('.flip-inner');
    const isOpen = inner.classList.contains('flipped');

    if (isOpen) {
      inner.classList.remove('flipped');
      pill.setAttribute('aria-expanded','false');
    } else {
      unflipAll(inner);
      inner.classList.add('flipped');
      pill.setAttribute('aria-expanded','true');
    }
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#servicesSwiper')) {
    unflipAll();
  }
});

