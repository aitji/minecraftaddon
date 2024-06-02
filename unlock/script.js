import { addon, find_me, lastest_ver } from "../new/addondataa.js"
var hash = window.location.hash.substr(1)
var get = addon.find(key => key.readId.toLocaleLowerCase() === hash.toLowerCase())
try { get.imgSrc }
catch { window.location.href = '../new' }

window.onload = function () {
    checkSub()
    const cookieRe = document.querySelector(".recycle-bin")
    cookieRe.addEventListener("click", () => resetCookies())
}

document.addEventListener('DOMContentLoaded', (event) => {
    const banner = `../img/stock/${get.imgSrc}`
    document.getElementById('dynamic_banner').src = banner
    document.getElementById('dynamic_text').innerHTML = `เพื่อปลดล็อกแอดออน <a>${get.title} </a> กดติดตามเราหน่อยน้า~!<a id="back"
    href="../pages/#${get.readId}"> (ย้อนกลับไปดูแอดออนอื่น) </a>`
})


function checkSub() {
    var buttonContainer = document.getElementById("buttonContainer")
    if (document.cookie.includes("subscribed=true")) {
        document.getElementById('dynamic_text').innerHTML = `คุณสามารถโหลดแอดออน <a>${get.title} </a> ได้เลย~!<a id="back"
    href="../pages/#${get.readId}"> (โหลดแล้วสามารถกดย้อนกลับที่นี่) </a>`
        buttonContainer.innerHTML = "<p>ดูเหมือนว่ากดติดตามอยู่แล้วนิหน่า งั้นโหลดได้เลย ๆ</p><button id='subed'>โหลดแอดออน! 📥</button>"
        const button = document.getElementById("subed")

        button.addEventListener("click", () => redirectToAddon())
    }
}

document.getElementById("subscribeBtn").addEventListener("click", function () {
    if (!document.cookie.includes("subscribed=true")) {
        simulateLoading()
        setTimeout(function () {
            if (!document.cookie.includes("subscribed=true")) document.cookie = "subscribed=true; expires=Fri, 31 Dec 9999 23:59:59 GMT"
            checkSub()
            window.location.href = "https://www.youtube.com/@aitji.?sub_confirmation=1"
        }, 3000)
        checkSub()
    }
})

function simulateLoading() {
    var loadingBar = document.querySelector(".loading-bar")
    loadingBar.style.width = "0%"
    var width = 0
    var interval = setInterval(function () {
        width += (100 - width) / 95
        if (width >= 100) clearInterval(interval)
        loadingBar.style.width = width + "%"
    }, 10)
}

function redirectToAddon() {
    var url = find_me.find(finder => get.readId.toLocaleLowerCase().includes(finder.url.toLowerCase())).link.replace("_ver_", lastest_ver)
    window.location.href = url

    setTimeout(function () { window.location.href = `../pages#${get.readId}` }, 32000)
}

function resetCookies() {
    if (document.cookie.length <= 0) {
        alert(`🍪 เรายังไม่ได้เก็บคุ๊กกี้คุณเลย`)
        return
    }
    if (confirm(`🍪 จะให้ลบข้อมูลคุ๊กกี้จริง ๆ หรอเราไม่ได้ใช้ 3rd คุ๊กกี้เลยนะ ;c\nข้อมูลคุ๊กกี้มีเพียง ${document.cookie.length} รายการ: ${document.cookie}`)) {
        document.cookie = "subscribed=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        alert("✅ All cookie data has been reset.\nReFresh Pages NOW!")
    }
}