function addLinkField() {
    const newLink = document.createElement('div');
    newLink.className = 'link-input';
    newLink.innerHTML = `
        <input 
            type="url" 
            class="userLink" 
            placeholder="رابط ${document.querySelectorAll('.userLink').length + 1}"
        >
    `;
    document.getElementById('linksContainer').appendChild(newLink);
}

function generatePage() {
    // جمع البيانات
    const userName = document.getElementById('userName').value;
    const userImage = document.getElementById('userImage').value;
    const links = [...document.querySelectorAll('.userLink')].map(link => link.value);

    // التحقق من البيانات
    if (!userName || !userImage || links.some(link => !link)) {
        alert('الرجاء ملء جميع الحقول!');
        return;
    }

    // إنشاء معرف فريد
    const pageId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const pageUrl = `${window.location.href}profile.html?id=${pageId}`;

    // حفظ البيانات في localStorage
    localStorage.setItem(pageId, JSON.stringify({
        name: userName,
        image: userImage,
        links: links
    }));

    // عرض النتيجة
    showResult(pageId, pageUrl);
}

function showResult(pageId, pageUrl) {
    // إنشاء QR Code
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, {
        text: pageUrl,
        width: 200,
        height: 200,
        colorDark: "#2c3e50",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // عرض الرابط
    document.getElementById('pageLink').href = pageUrl;
    document.getElementById('result').classList.remove('hidden');
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    const link = document.createElement('a');
    link.download = 'my-qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}