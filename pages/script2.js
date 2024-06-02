import { addon, find_me, lastest_ver } from "../addondataa.js"
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("hashchange", handel)
    handel()
})

function handel() {
    var hash = window.location.hash.substr(1)
    var get = addon.find(key => key.readId.toLocaleLowerCase() === hash.toLowerCase())
    if (get) gen(`${get.title}`, `${get.description}`, get)
    else window.location.href = '../'
}

function gen(title, description, get) {
    var container = document.querySelector(".container")

    var header = document.createElement("div")
    header.classList.add("header")
    var imr = get.imgSrc
    header.innerHTML = `
    <div class="addon-grid">
        <div class="addon-card">
        <div class="banner"><img class="addon-img" src="../img/stock/${imr}" alt="${get.title} Image"> </div>
            <h3 style="font-size: 20px;">${get.title}</h3>
            <p style="font-size: 18px; ">${get.description}</p>
            <a href="..">« ย้อนกลับไปหน้าแรก</a>
        </div>
    </div>
    `

    var tagSpan = document.createElement("span")
    if (get.isStable) {
        tagSpan.classList.add("addon-stable-tag")
        tagSpan.textContent = "@stable"
    } else {
        tagSpan.classList.add("addon-beta-tag")
        tagSpan.textContent = "⚠️ BETA API"
    }

    header.querySelector(".addon-card").appendChild(tagSpan)
    container.appendChild(header)

    var addonDetails = document.createElement("div")
    addonDetails.classList.add("addon-details")
    var text, text2 = ''
    if (get.isStable) text = `แอดออนตัวนี้เป็นแอดแอน @stable ฉนั้นไม่ต้องโหลดซ้ำหลังอัพเดท!`
    else {
        text = `⚠️ แอดออนตัวนี้เป็นแอดออน beta หลังตัวเกมอัพเดท อาจต้องมาทำการอัพเดทแอดออนอีกครั้ง!`
        text2 = `และเปิด beta api เพื่อให้แอดออนทำงาน`
    }
    var findAddon = find_me.find(finder => get.readId.toLocaleLowerCase().includes(finder.url.toLowerCase())).link.replace("_ver_", lastest_ver)
    var url = `../unlock#${get.readId}`
    var git = findAddon.replace('/raw/', '/tree/').replace('Download.mcpack', 'Addon')
    addonDetails.innerHTML = `
        <br>
        <hr>
        <h2>${title}</h2>
        <p>${description}</p>
        <p>(BETA: ในอนาคตจะมาเพิ่ม description เพิ่มเติมให้แต่ละแอดออนนะ แต่ยังก่อนน)</p>
        <p>${text}</p>
        <p>แอดออนเวอชั่น: <a>${lastest_ver}</a></p>
        <br>
        <h2>วิธีการติดตั้ง:</h2>
        <ul class="list">
            <li>กดข้อความ ${get.readId} ${lastest_ver}.mcpack ด้านล่าง</li>
            <li>หลังจากนั้น ให้กดเปิด Download.mcpack</li>
            <li>เมื่อสร้างโลกให้ใส่แอดออน${text2}</li>
        </ul>
        <br>
        <h2>ดาวน์โหลด:</h2>
        <ul class="list">
            <li><a href="${url}" style="font-weight: bold;">${get.readId} | ${lastest_ver}.mcpack</a></li>
            <li><a href="${git}" style="font-weight: bold;">ดูโค๊ดต้นฉบับ</a></li>
        </ul>
        <hr>
        <br>
        
    `
    container.appendChild(addonDetails)
}

