document.addEventListener("DOMContentLoaded", function() {
    let generateBtn = document.getElementById("createBtn");

    if (generateBtn) {
        generateBtn.addEventListener("click", function() {
            let getName = (id) => {
                let el = document.getElementById(id);
                return el ? el.value.trim() : "";
            };

            let name = getName("nameInput");
            let phone = getName("phoneInput");
            let web = getName("webInput");
            let email = getName("emailInput");
            let job = getName("jobInput");
            let city = getName("cityInput");

            if (!name && !phone && !web && !email && !job && !city) {
                alert("Заполните хотя бы одно поле! 💕");
                return;
            }

            // Ультракомпактный vCard без лишних пустых параметров
            let vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
URL:${web}
END:VCARD`;

            let setTxt = (id, text) => {
                let el = document.getElementById(id);
                if (el) el.innerText = text || "—";
            };

            setTxt("vcardText", vCardData);
            setTxt("pName", name);
            setTxt("pPhone", phone);
            setTxt("pEmail", email);
            setTxt("pWeb", web);
            setTxt("pCity", city);
            setTxt("pJob", job);

            let qrContainer = document.getElementById("qrBox");
            if (qrContainer) {
                qrContainer.innerHTML = ""; 
                try {
                    new QRCode(qrContainer, {
                        text: vCardData,
                        width: 150,
                        height: 150,
                        correctLevel: QRCode.CorrectLevel.M
                    });
                } catch (error) {
                    alert("Слишком много символов для QR-кода!");
                }
            }
        });
    }
});