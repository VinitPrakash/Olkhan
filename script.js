document.addEventListener('DOMContentLoaded', () => {
    // State
    const defaultPage = 'login-page';

    // Mock Data
    const updates = [
        { id: 1, user: 'Alice Smith', content: 'Just joined the Olkan community! Hello everyone! 😊', time: '2h ago' },
        { id: 2, user: 'Community Admin', content: 'Weekly cleanup drive happening this Saturday at the park. 🌳🧹', time: '5h ago' },
        { id: 3, user: 'Bob Jones', content: 'Anyone has a ladder I can borrow for the weekend?', time: '1d ago' }
    ];

    const events = [
        { id: 1, title: 'Summer Picnic ☀️', date: 'Aug 15, 2024', desc: 'Join us for a fun day in the sun at Central Park.' },
        { id: 2, title: 'Book Club 📚', date: 'Aug 20, 2024', desc: 'Discussing "The Alchemist" this month. Bring your notes!' }
    ];

    const news = [
        { id: 1, title: 'New Community Guidelines', summary: 'Please review the updated guidelines for respectful interaction.' },
        { id: 2, title: 'Welcome New Members', summary: 'We have 50 new members this month! Say hi!' }
    ];

    // Navigation Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const headerProfilePic = document.getElementById('header-profile-pic');
    const backBtn = document.querySelector('.back-btn');
    const navItems = document.querySelectorAll('.nav-item');
    const addFamilyBtn = document.getElementById('add-family-btn');
    const familyContainer = document.getElementById('family-members-container');
    const signupLink = document.getElementById('signup-link'); // New
    const loginLink = document.getElementById('login-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link'); // New

    // Event Listeners
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            navigateTo('home-page');
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('signup-page');
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('login-page');
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('forgot-password-page');
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate registration
            alert("Account created successfully! Welcome to Olkan.");
            navigateTo('home-page');
        });
    }

    if (addFamilyBtn) {
        addFamilyBtn.addEventListener('click', () => {
            // If hidden, show it and add first member
            if (familyContainer.classList.contains('hidden')) {
                familyContainer.classList.remove('hidden');
                addFamilyMember();
            } else {
                // If already visible, add another member
                addFamilyMember();
            }
        });
    }

    function addFamilyMember() {
        const div = document.createElement('div');
        div.className = 'family-member-input-group';
        div.innerHTML = `
            <button type="button" class="remove-member-btn" onclick="this.parentElement.remove()">×</button>
            <input type="text" placeholder="Family Member Name" style="margin-bottom:5px;" required>
            <input type="text" placeholder="Relationship (e.g. Spouse, Child)" style="margin-bottom:5px;" required>
            <input type="tel" placeholder="Mobile Number" required>
        `;
        familyContainer.appendChild(div);
    }

    // Forgot Password Logic
    const getCodeBtn = document.getElementById('get-code-btn');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const resetPasswordBtn = document.getElementById('reset-password-btn');

    if (getCodeBtn) {
        getCodeBtn.addEventListener('click', () => {
            const email = document.getElementById('reset-email').value;
            if (email) {
                alert(`Verification code sent to ${email}: 1234`);
                document.getElementById('step-email').classList.add('hidden');
                document.getElementById('step-code').classList.remove('hidden');
            } else {
                alert("Please enter your email.");
            }
        });
    }

    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', () => {
            const code = document.getElementById('verification-code').value;
            if (code === '1234') {
                document.getElementById('step-code').classList.add('hidden');
                document.getElementById('step-password').classList.remove('hidden');
            } else {
                alert("Invalid code. Please try again.");
            }
        });
    }

    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', () => {
            const p1 = document.getElementById('new-password').value;
            const p2 = document.getElementById('confirm-password').value;

            if (p1 !== p2) {
                alert("Passwords do not match!");
                return;
            }

            // Validation: 1 Cap, 1 Number, 1 Symbol
            const hasCap = /[A-Z]/.test(p1);
            const hasNum = /[0-9]/.test(p1);
            const hasSym = /[^A-Za-z0-9]/.test(p1);

            if (hasCap && hasNum && hasSym) {
                alert("Password reset successful! Redirecting to login...");
                navigateTo('login-page');
                // Reset form state for next time
                setTimeout(() => {
                    document.getElementById('step-email').classList.remove('hidden');
                    document.getElementById('step-code').classList.add('hidden');
                    document.getElementById('step-password').classList.add('hidden');
                    document.getElementById('forgot-password-form').reset();
                }, 500);
            } else {
                alert("Password must contain at least 1 Capital Letter, 1 Number, and 1 Unique Symbol.");
            }
        });
    }

    // Global function for toggle eye icon (called inline in HTML)
    window.togglePassword = function (fieldId, icon) {
        const input = document.getElementById(fieldId);
        if (input.type === "password") {
            input.type = "text";
            icon.textContent = "🙈"; // monkey or slashed eye
        } else {
            input.type = "password";
            icon.textContent = "👁️";
        }
    };

    if (headerProfilePic) {
        headerProfilePic.addEventListener('click', () => {
            navigateTo('profile-page');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('home-page');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.target;

            // Handle bottom nav active states
            navItems.forEach(nav => {
                if (nav.dataset.target === targetId) nav.classList.add('active');
                else nav.classList.remove('active');
            });

            // Switch content sections within Home Page
            if (document.getElementById('home-page').classList.contains('active')) {
                document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
                document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));

                const section = document.getElementById(targetId);
                if (section) {
                    section.classList.remove('hidden');
                    section.classList.add('active');
                }
            } else {
                // If we are on another page (like profile), go to home page first, then switch section
                navigateTo('home-page');
                setTimeout(() => {
                    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
                    const section = document.getElementById(targetId);
                    if (section) {
                        section.classList.remove('hidden');
                        section.classList.add('active');
                    }
                }, 0);
            }
        });
    });

    function navigateTo(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Render Data Functions
    function renderUpdates() {
        const container = document.getElementById('updates-feed');
        if (!container) return;

        if (updates.length === 0) {
            container.innerHTML = '<p>No updates yet.</p>';
            return;
        }

        container.innerHTML = updates.map(update => `
            <div class="card update-card">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div class="profile-pic-sm" style="background-image: url('https://placehold.co/40x40/orange/white?text=${update.user.charAt(0)}')"></div>
                    <div>
                        <strong>${update.user}</strong>
                        <div style="font-size:0.8rem; color:#888;">${update.time}</div>
                    </div>
                </div>
                <p>${update.content}</p>
            </div>
        `).join('');
    }

    function renderEvents() {
        const container = document.getElementById('events-feed');
        if (!container) return;

        container.innerHTML = events.map(event => `
            <div class="card event-card">
                <h3>${event.title}</h3>
                <div style="color:var(--primary-color); font-weight:600; margin:5px 0;">📅 ${event.date}</div>
                <p>${event.desc}</p>
                <button class="btn-secondary" style="margin-top:10px; padding:5px 15px; font-size:0.9rem;">Join Event</button>
            </div>
        `).join('');
    }

    function renderNews() {
        const container = document.getElementById('news-feed');
        if (!container) return;

        container.innerHTML = news.map(item => `
            <div class="card news-card">
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </div>
        `).join('');
    }

    // Initialize
    renderUpdates();
    renderEvents();
    renderNews();
});
