document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('[data-link]');
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerBtn = document.getElementById('burger-btn');

    // Функция загрузки страниц
    async function loadPage(pageName) {
        try {
            appContent.style.opacity = '0.5'; // Эффект загрузки

            // Загружаем HTML файл из папки pages
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error('Страница не найдена');
            
            const html = await response.text();
            
            // Вставляем контент
            appContent.innerHTML = html;
            appContent.style.opacity = '1';

            // Обновляем активный класс в меню
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-link') === pageName) {
                    link.classList.add('active');
                }
            });

            // Закрываем мобильное меню после клика
            mobileMenu.classList.remove('active');

            // Скролл наверх
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<div class="container section"><h2>Ошибка 404. Страница не найдена.</h2></div>';
        }
    }

    // Ловим клики по всем ссылкам с data-link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-link');
            loadPage(pageName);
        });
    });

    // Мобильное меню
    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Загружаем главную по умолчанию
    loadPage('home');
});

document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            // Переключаем классы
            burgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Блокируем скролл страницы, когда меню открыто (опционально)
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
});