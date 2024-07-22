import { addon, find_me, lastest_ver } from "../addondataa.js"
var hash = window.location.hash.substr(1)
var get = addon.find(key => key.readId.toLocaleLowerCase() === hash.toLowerCase())
try { get.imgSrc }
catch { window.location.href = '../' }
window.onload = () => go()

function go() {
    var id = find_me.find(f =>
        get?.readId?.toLocaleLowerCase()?.includes(f.url.toLowerCase())
    )
    document.getElementById('dynamic-text').innerHTML = `<p id="dynamic-text">กำลังโหลดแอดออน ${get.readId} หากไม่ได้กรุณารีเฟรทหน้าจอ!</p>`
    window.location.href = id?.link?.replace("_ver_", lastest_ver)
}