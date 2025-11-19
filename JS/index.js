// ==========================================================
// 1. منطق صفحة تسجيل حساب جديد (Sign Up)
// ==========================================================
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", function (e) {
        e.preventDefault();

        
        const username = document.getElementById("signupUsername").value;
        
        const emailaddress=document.getElementById("Email Address")

        const password = document.getElementById("signupPassword").value; 

       
        if (!username || !password) {
            alert("Please fill in both Username and Password.");
            return;
        }

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

        
        const userInput = document.getElementById("loginUsername").value;
        const passwordInput = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem("userData"));


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
            window.location.href = "Ai.html";
        });
    }
}

// الجزء المخصص للhome
 document.addEventListener('DOMContentLoaded', function() {
            const userInput = document.getElementById('user-input');
            const sendBtn = document.getElementById('send-btn');
            const chatContainer = document.getElementById('chat-container');
            const typingIndicator = document.getElementById('typing-indicator');
            const newChatBtn = document.getElementById('new-chat-btn');
            const toggleSidebar = document.getElementById('toggle-sidebar');
            const closeSidebar = document.getElementById('close-sidebar');
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebar-overlay');
            const suggestionChips = document.querySelectorAll('.suggestion-chip');
            const historyItems = document.querySelectorAll('.history-item');
            const uploadArea = document.getElementById('upload-area');
            const fileInput = document.getElementById('file-input');
            const dataTable = document.getElementById('data-table');
            const addRowBtn = document.getElementById('add-row-btn');
            const analyzeBtn = document.getElementById('analyze-btn');
            const clearDataBtn = document.getElementById('clear-data-btn');
            const sampleDataBtn = document.getElementById('sample-data-btn');
            
            // وظائف فتح وإغلاق الشريط الجانبي
            function openSidebar() {
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            function closeSidebarFunc() {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // إضافة معالجات الأحداث للشريط الجانبي
            toggleSidebar.addEventListener('click', openSidebar);
            closeSidebar.addEventListener('click', closeSidebarFunc);
            sidebarOverlay.addEventListener('click', closeSidebarFunc);
            
            // إغلاق الشريط الجانبي عند النقر على عنصر في السجل (للهواتف)
            historyItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        closeSidebarFunc();
                    }
                });
            });
            
            // رفع الملفات
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.style.backgroundColor = 'rgba(16, 163, 127, 0.1)';
            });
            
            uploadArea.addEventListener('dragleave', function() {
                uploadArea.style.backgroundColor = '';
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.style.backgroundColor = '';
                
                if (e.dataTransfer.files.length) {
                    handleFileUpload(e.dataTransfer.files[0]);
                }
            });
            
            fileInput.addEventListener('change', function() {
                if (fileInput.files.length) {
                    handleFileUpload(fileInput.files[0]);
                }
            });
            
            function handleFileUpload(file) {
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // بالميغابايت
                
                // محاكاة معالجة الملف
                uploadArea.innerHTML = `
                    <div class="upload-icon">
                        <i class="fas fa-check-circle" style="color: #10a37f;"></i>
                    </div>
                    <h4>تم رفع الملف بنجاح!</h4>
                    <p>${fileName} (${fileSize} MB)</p>
                    <div class="file-types">
                        <span class="file-type">جاهز للتحليل</span>
                    </div>
                `;
                
                // إظهار رسالة تأكيد
                addMessage(`تم رفع الملف "${fileName}" بنجاح. جاهز للتحليل.`, 'ai');
            }
            
            // إضافة صف جديد للجدول
            addRowBtn.addEventListener('click', function() {
                const tbody = dataTable.querySelector('tbody');
                const newRow = document.createElement('tr');
                
                newRow.innerHTML = `
                    <td><input type="text" placeholder="الشهر"></td>
                    <td><input type="number" placeholder="المبيعات"></td>
                    <td><input type="number" placeholder="التكاليف"></td>
                    <td><input type="number" placeholder="الأرباح"></td>
                `;
                
                tbody.appendChild(newRow);
            });
            
            // تحليل البيانات
            analyzeBtn.addEventListener('click', function() {
                // جمع البيانات من الجدول
                const data = [];
                const rows = dataTable.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const inputs = row.querySelectorAll('input');
                    const rowData = {};
                    
                    inputs.forEach((input, index) => {
                        const header = dataTable.querySelector('th:nth-child(' + (index + 1) + ')').textContent;
                        rowData[header] = input.value;
                    });
                    
                    if (Object.values(rowData).some(value => value.trim() !== '')) {
                        data.push(rowData);
                    }
                });
                
                if (data.length === 0) {
                    alert('يرجى إدخال بيانات للتحليل');
                    return;
                }
                
                // إخفاء رسائل الترحيب والاقتراحات
                document.querySelector('.welcome-message').style.display = 'none';
                document.querySelector('.suggestions').style.display = 'none';
                
                // إضافة رسالة المستخدم
                addMessage('أريد تحليل البيانات التالية:', 'user');
                
                // عرض البيانات في رسالة المستخدم
                setTimeout(() => {
                    let dataMessage = 'البيانات المدخلة:\n\n';
                    data.forEach(item => {
                        dataMessage += `- ${JSON.stringify(item)}\n`;
                    });
                    addMessage(dataMessage, 'user');
                    
                    // محاكاة تحليل البيانات
                    simulateDataAnalysis(data);
                }, 500);
            });
            
            // مسح البيانات
            clearDataBtn.addEventListener('click', function() {
                const inputs = dataTable.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
                });
                
                // إعادة تعيين منطقة رفع الملفات
                uploadArea.innerHTML = `
                    <div class="upload-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <h4>اسحب وأفلت ملفاتك هنا أو انقر للرفع</h4>
                    <p>يمكنك رفع ملفات Excel, CSV, JSON أو إدخال البيانات يدوياً</p>
                    <div class="file-types">
                        <span class="file-type">Excel (.xlsx, .xls)</span>
                        <span class="file-type">CSV (.csv)</span>
                        <span class="file-type">JSON (.json)</span>
                        <span class="file-type">نص (.txt)</span>
                    </div>
                `;
                
                // إعادة إرفاق معالجات الأحداث
                uploadArea.addEventListener('click', function() {
                    fileInput.click();
                });
            });
            
            // بيانات نموذجية
            sampleDataBtn.addEventListener('click', function() {
                const tbody = dataTable.querySelector('tbody');
                tbody.innerHTML = '';
                
                const sampleData = [
                    { الشهر: 'يناير', المبيعات: '15000', التكاليف: '8000', الأرباح: '7000' },
                    { الشهر: 'فبراير', المبيعات: '18000', التكاليف: '9000', الأرباح: '9000' },
                    { الشهر: 'مارس', المبيعات: '22000', التكاليف: '11000', الأرباح: '11000' },
                    { الشهر: 'أبريل', المبيعات: '25000', التكاليف: '12000', الأرباح: '13000' },
                    { الشهر: 'مايو', المبيعات: '28000', التكاليف: '13000', الأرباح: '15000' }
                ];
                
                sampleData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="text" value="${item.الشهر}"></td>
                        <td><input type="number" value="${item.المبيعات}"></td>
                        <td><input type="number" value="${item.التكاليف}"></td>
                        <td><input type="number" value="${item.الأرباح}"></td>
                    `;
                    tbody.appendChild(row);
                });
                
                addMessage('تم تحميل بيانات نموذجية. يمكنك الآن تحليلها.', 'ai');
            });
            
            // محاكاة تحليل البيانات
            function simulateDataAnalysis(data) {
                // إظهار مؤشر الكتابة
                typingIndicator.style.display = 'flex';
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // محاكاة وقت التحليل
                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    
                    // تحليل بسيط للبيانات
                    let totalSales = 0;
                    let totalCosts = 0;
                    let totalProfits = 0;
                    
                    data.forEach(item => {
                        totalSales += parseFloat(item.المبيعات) || 0;
                        totalCosts += parseFloat(item.التكاليف) || 0;
                        totalProfits += parseFloat(item.الأرباح) || 0;
                    });
                    
                    const avgSales = totalSales / data.length;
                    const avgCosts = totalCosts / data.length;
                    const avgProfits = totalProfits / data.length;
                    
                    const analysisMessage = `
                        # تحليل البيانات
                        
                        ## النتائج الرئيسية:
                        - إجمالي المبيعات: ${totalSales.toLocaleString()} جنيه
                        - إجمالي التكاليف: ${totalCosts.toLocaleString()} جنيه
                        - إجمالي الأرباح: ${totalProfits.toLocaleString()} جنيه
                        
                        ## المتوسطات:
                        - متوسط المبيعات الشهرية: ${avgSales.toLocaleString()} جنيه
                        - متوسط التكاليف الشهرية: ${avgCosts.toLocaleString()} جنيه
                        - متوسط الأرباح الشهرية: ${avgProfits.toLocaleString()} جنيه
                        
                        ## التوصيات:
                        - يمكن زيادة الأرباح عن طريق خفض التكاليف بنسبة 10%
                        - التركيز على الأشهر ذات الأداء الأفضل لتعزيز المبيعات
                        - مراجعة الهوامش الربحية لتحسين الأداء المالي
                    `;
                    
                    addMessage(analysisMessage, 'ai');
                }, 3000);
            }
            
            // ضبط ارتفاع حقل الإدخال تلقائياً
            userInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
                
                // تفعيل/تعطيل زر الإرسال
                sendBtn.disabled = this.value.trim() === '';
            });
            
            // إرسال الرسالة عند الضغط على زر الإرسال
            sendBtn.addEventListener('click', sendMessage);
            
            // إرسال الرسالة عند الضغط على Enter (بدون Shift)
            userInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            
            // زر المحادثة الجديدة
            newChatBtn.addEventListener('click', function() {
                // إخفاء رسائل الترحيب والاقتراحات
                document.querySelector('.welcome-message').style.display = 'none';
                document.querySelector('.suggestions').style.display = 'none';
                
                // مسح محتوى المحادثة
                const messages = chatContainer.querySelectorAll('.message');
                messages.forEach(msg => {
                    if (!msg.id.includes('typing-indicator')) {
                        msg.remove();
                    }
                });
                
                // إضافة رسالة ترحيبية جديدة
                addMessage('مرحباً! أنا مساعد الذكاء الاصطناعي لتحليل البيانات. كيف يمكنني مساعدتك اليوم؟', 'ai');
                
                // إظهار اقتراحات جديدة
                setTimeout(() => {
                    const newSuggestions = document.createElement('div');
                    newSuggestions.className = 'suggestions';
                    newSuggestions.innerHTML = `
                        <div class="suggestion-chip">تحليل بيانات المبيعات</div>
                        <div class="suggestion-chip">إنشاء تقرير أداء</div>
                        <div class="suggestion-chip">تحليل سلوك العملاء</div>
                        <div class="suggestion-chip">توقعات الإيرادات</div>
                    `;
                    chatContainer.appendChild(newSuggestions);
                    
                    // إعادة إرفاق معالجات الأحداث للرقاقات الجديدة
                    document.querySelectorAll('.suggestion-chip').forEach(chip => {
                        chip.addEventListener('click', function() {
                            userInput.value = this.textContent;
                            sendMessage();
                        });
                    });
                }, 500);
                
                // إغلاق الشريط الجانبي على الهواتف
                if (window.innerWidth <= 768) {
                    closeSidebarFunc();
                }
            });
            
            // معالجات الأحداث لرقاقات الاقتراح
            suggestionChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    userInput.value = this.textContent;
                    sendMessage();
                });
            });
            
            // معالجات الأحداث لعناصر السجل
            historyItems.forEach(item => {
                item.addEventListener('click', function() {
                    historyItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // محاكاة تحميل محادثة سابقة
                    document.querySelector('.welcome-message').style.display = 'none';
                    document.querySelector('.suggestions').style.display = 'none';
                    
                    const messages = chatContainer.querySelectorAll('.message');
                    messages.forEach(msg => {
                        if (!msg.id.includes('typing-indicator')) {
                            msg.remove();
                        }
                    });
                    
                    addMessage(`لقد قمت بتحميل المحادثة: "${this.querySelector('.sidebar-text').textContent}". كيف يمكنني مساعدتك في متابعة هذا التحليل؟`, 'ai');
                });
            });
            
            function sendMessage() {
                const message = userInput.value.trim();
                if (message === '') return;
                
                // إخفاء رسائل الترحيب والاقتراحات عند أول رسالة
                if (document.querySelector('.welcome-message').style.display !== 'none') {
                    document.querySelector('.welcome-message').style.display = 'none';
                    document.querySelector('.suggestions').style.display = 'none';
                }
                
                // إضافة رسالة المستخدم إلى الدردشة
                addMessage(message, 'user');
                
                // مسح حقل الإدخال
                userInput.value = '';
                userInput.style.height = '56px';
                sendBtn.disabled = true;
                
                // إظهار مؤشر الكتابة
                typingIndicator.style.display = 'flex';
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // محاكاة استجابة الذكاء الاصطناعي بعد تأخير
                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    addMessage(generateAIResponse(message), 'ai');
                }, 1500);
            }
            
            function addMessage(content, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;
                
                const avatarDiv = document.createElement('div');
                avatarDiv.className = `avatar ${sender}-avatar`;
                
                if (sender === 'user') {
                    avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
                } else {
                    avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
                }
                
                const contentDiv = document.createElement('div');
                contentDiv.className = 'message-content';
                
                // إذا كان النص يحتوي على أسطر جديدة، أضفها كفقرة منفصلة
                const paragraphs = content.split('\n');
                paragraphs.forEach(paragraph => {
                    if (paragraph.trim() !== '') {
                        const p = document.createElement('p');
                        p.textContent = paragraph;
                        contentDiv.appendChild(p);
                    }
                });
                
                messageDiv.appendChild(avatarDiv);
                messageDiv.appendChild(contentDiv);
                
                // إدراج الرسالة قبل مؤشر الكتابة
                chatContainer.insertBefore(messageDiv, typingIndicator);
                
                // التمرير إلى الأسفل
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
            
            function generateAIResponse(userMessage) {
                // محاكاة استجابات الذكاء الاصطناعي بناءً على رسالة المستخدم
                const responses = [
                    "هذا سؤال ممتاز! دعني أحلل البيانات المتاحة وأعود إليك بالنتائج قريباً.\n\nلدي بعض الأسئلة التوضيحية:\n1. ما هي الفترة الزمنية التي تريد تحليلها؟\n2. هل هناك مقاييس محددة تريد التركيز عليها؟",
                    "بناءً على البيانات التي قدمتها، إليك بعض الرؤى الأولية:\n\n- لاحظت زيادة في المبيعات بنسبة 15% خلال الربع الأخير\n- هناك تحسن في مؤشر رضا العملاء بنسبة 12%\n- التكاليف التشغيلية انخفضت بنسبة 8%\n\nهل تريد تحليلاً أكثر تفصيلاً لأي من هذه النقاط؟",
                    "لاحظت نمطاً مثيراً للاهتمام في بياناتك. دعني أوضح ذلك بمزيد من التفصيل.\n\nيبدو أن هناك علاقة قوية بين حملات التسويق وزيادة المبيعات. البيانات تشير إلى أن الحملات التي تمت في عطلات نهاية الأسبوع كانت الأكثر فعالية بنسبة 30% مقارنة بأيام الأسبوع.",
                    "يمكنني مساعدتك في ذلك. هل تريد تحليلاً مفصلاً أو ملخصاً تنفيذياً؟\n\nلتحليل أكثر دقة، أحتاج إلى:\n- بيانات المبيعات التفصيلية\n- معلومات عن العملاء\n- بيانات التكاليف والإيرادات",
                    "لقد قمت بتحليل البيانات التي طلبتها. إليك النتائج الرئيسية:\n\n1. زيادة في المبيعات بنسبة 15%\n2. انخفاض في التكاليف بنسبة 8%\n3. تحسن في رضا العملاء بنسبة 12%\n4. نمو في قاعدة العملاء بنسبة 10%\n\nهذه النتائج إيجابية بشكل عام. هل تريد التوصيات لتحسينها أكثر؟",
                    "هل يمكنك تقديم مزيد من التفاصيل حول البيانات التي تريد تحليلها؟ هذا سيساعدني في تقديم تحليل أكثر دقة.\n\nعلى سبيل المثال:\n- حجم مجموعة البيانات\n- نوع البيانات (مبيعات، عملاء، منتجات، إلخ)\n- الفترة الزمنية\n- الأهداف من التحليل"
                ];
                
                // اختيار استجابة عشوائية (في التطبيق الحقيقي، سيكون هذا اتصالاً بخدمة الذكاء الاصطناعي)
                return responses[Math.floor(Math.random() * responses.length)];
            }
            
            // تفعيل/تعطيل زر الإرسال في البداية
            sendBtn.disabled = true;
        });