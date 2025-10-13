document.addEventListener('DOMContentLoaded', () => {
    const apiBase = 'https://localhost:7257/api';
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessageDiv = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            errorMessageDiv.textContent = '';

            try {
                const response = await fetch(`${apiBase}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login failed');
                }

                const data = await response.json();
                localStorage.setItem('token', data.token); // Token-i yadda saxla
                localStorage.setItem('fullName', data.fullName);
                window.location.href = 'index.html'; // Əsas səhifəyə yönləndir
            } catch (error) {
                errorMessageDiv.textContent = error.message;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            errorMessageDiv.textContent = '';
            
            try {
                const response = await fetch(`${apiBase}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, email, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Registration failed');
                }
                
                // Qeydiyyat uğurlu olarsa, avtomatik login et
                const loginResponse = await fetch(`${apiBase}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await loginResponse.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('fullName', data.fullName);
                window.location.href = 'index.html';

            } catch (error) {
                errorMessageDiv.textContent = error.message;
            }
        });
    }
});