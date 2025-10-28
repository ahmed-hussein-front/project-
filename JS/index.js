// ==========================================================
// 1. منطق صفحة تسجيل حساب جديد (Sign Up)
// ==========================================================
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // 🛑 التصحيح: البحث عن IDs حقول Sign Up الموجودة في signup.html
        const username = document.getElementById("signupUsername").value;
        // 🚨 ملاحظة: ملف signup.html لا يحتوي على حقل للإيميل (Email ID)
        // سنستخدم حقل الـ Username كـ Email للمطابقة في الدخول.
        const password = document.getElementById("signupPassword").value; 

        // التحقق من أن جميع الحقول مملوءة
        if (!username || !password) {
            alert("Please fill in both Username and Password.");
            return;
        }

        // تخزين البيانات. سنستخدم الـ username كـ email لتسهيل عملية الدخول.
        const user = { username: username, email: username, password: password };
        localStorage.setItem("userData", JSON.stringify(user));

        alert("Account created successfully! Redirecting to Login.");
        window.location.href = "index.html"; 
    });
}

// ==========================================================
// 2. منطق صفحة تسجيل الدخول (Login)
// ==========================================================
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // 🛑 التصحيح: البحث عن IDs حقول Login الموجودة في index.html
        const userInput = document.getElementById("loginUsername").value;
        const passwordInput = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem("userData"));

        // التحقق: هل المدخل يطابق الـ (Email/Username) المخزن وكلمة المرور؟
        if (savedUser && savedUser.email === userInput && savedUser.password === passwordInput) {
            alert("Login successful!");
            window.location.href = "home.html";
        } else {
            alert("Invalid username/email or password!");
        }
    });
}

// ---------------------------------------------
// 3. منطق زر Logout لصفحة Home (كما طلبته سابقًا)
// ---------------------------------------------
if (window.location.pathname.endsWith('home.html')) {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('userData'); 
            window.location.href = "index.html";
        });
    }
}