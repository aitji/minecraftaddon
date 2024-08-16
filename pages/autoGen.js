import { addon, find_me, lastest_ver } from "../addondataa.js"
const hash = window.location.hash.substr(1)

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("hashchange", handel)
    handel()
})

const handel = () => {
    const get = addon.reduce((acc, key) => key.readId.toLowerCase() === hash.toLowerCase() ? key : acc, '')
    if (get) gen(`${get.title}`, `${get.description}`, get)
    else window.location.href = '../'
}

/**
 * @param {string} title
 * @param {string} description
 * @param {{
*   title: string;
*   description: string;
*   longDes?: string;
*   imgSrc: string;
*   readId: string;
*   pageHref: string;
*   isStable: boolean;
* }} get
*/
function gen(title, description, get) {
    const container = document.querySelector(".container")
    const stableTag = get.isStable ? "@stable" : "@beta"
    const stableMsg = get.isStable
        ? "แอดออนตัวนี้เป็นแอดแอน @stable ฉนั้นไม่ต้องโหลดซ้ำหลังอัพเดท!"
        : "⚠️ แอดออนตัวนี้เป็นแอดออน beta หลังตัวเกมอัพเดท อาจต้องมาทำการอัพเดทแอดออนอีกครั้ง!"
    const betaApiMsg = get.isStable ? "" : "และเปิด beta api เพื่อให้แอดออนทำงาน"
    const longDes = get.longDes || "(BETA: ในอนาคตจะมาเพิ่ม description เพิ่มเติมให้แต่ละแอดออนนะ แต่ยังก่อนน)"
    const findAddon = find_me.reduce((acc, finder) => get.readId.toLowerCase().includes(finder.url.toLowerCase()) ? finder.link.replace("_ver_", lastest_ver) : acc, '')
    const url = `../unlock#${get.readId}`
    const git = findAddon.replace('/raw/', '/tree/').replace('Download.mcpack', 'Addon')

    container.innerHTML = `
    <div class="header">
        <div class="addon-grid">
            <div class="addon-card">
                <div class="banner"><img class="addon-img" src="../img/stock/${get.imgSrc}" alt="${get.title} Image"></div>
                <h3 style="font-size: 20px;">${get.title}</h3>
                <p style="font-size: 18px;">${get.description}</p>
                <a href="..">« ย้อนกลับไปหน้าแรก</a>
                <span class="${get.isStable ? 'addon-stable-tag' : 'addon-beta-tag'}">${stableTag}</span>
            </div>
        </div>
    </div>
    <div class="addon-details">
        <br><hr>
        <h2>${title}</h2>
        <p>${description}</p>
        <p>${longDes}</p>
        <p>${stableMsg}</p>
        <p>แอดออนเวอชั่น: <a>${lastest_ver}</a></p>
        <br>
        <h2>วิธีการติดตั้ง:</h2>
        <ul class="list">
            <li>กดข้อความ ${get.readId} ${lastest_ver}.mcpack ด้านล่าง</li>
            <li>หลังจากนั้น ให้กดเปิด Download.mcpack</li>
            <li>เมื่อสร้างโลกให้ใส่แอดออน${betaApiMsg}</li>
        </ul>
        <br>
        <h2>ดาวน์โหลด:</h2>
        <ul class="list">
            <li><a href="${url}" style="font-weight: bold;">${get.readId} | ${lastest_ver}.mcpack</a></li>
            <li><a href="${git}" style="font-weight: bold;">ดูโค๊ดต้นฉบับ</a></li>
        </ul>
        <hr><br>
    </div>`
}