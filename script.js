/**
 * @author aitji
 * please don't stolen my work ok?
 */
// alert("this website is currently in demo and right now it building, maybe this is just concept!")

import { addon } from "./addondataa.js"

document.addEventListener("DOMContentLoaded", function () {
    var stableFirstCheckbox = document.getElementById("stableFirstCheckbox")
    var darkModeCheckbox = document.getElementById("darkModeCheckbox")

    stableFirstCheckbox.addEventListener("change", function () {
        generate(stableFirstCheckbox.checked)
        if (stableFirstCheckbox.checked) {
            var loadingBar = document.getElementById("loadingBar")
            loadingBar.classList.add("loading")
        } else {
            var loadingBar = document.getElementById("loadingBar")
            loadingBar.classList.remove("loading")
        }
    })

    darkModeCheckbox.addEventListener("change", function () {
        if (darkModeCheckbox.checked) {
            document.body.classList.add("dark-mode")
        } else {
            document.body.classList.remove("dark-mode")
        }
    })
})

function create(
    title = "unrecorded title",
    des = "unrecorded des",
    imgSRC = "../img/stock/_missing.png",
    readId = 0,
    pageHref = "#",
    isStable = false
) {
    var card = document.createElement("div")
    card.classList.add("addon-card")

    card.style.opacity = "0"
    card.style.transform = "translateY(100px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    var img = document.createElement("img")
    img.classList.add("addon-img")
    img.src = `../img/stock/${imgSRC}`
    card.appendChild(img)
    img.alt = title + " Image"

    var aTitle = document.createElement("h3")
    aTitle.classList.add("addon-title")
    aTitle.textContent = title
    card.appendChild(aTitle)

    var aDes = document.createElement("p")
    aDes.classList.add("addon-description")
    aDes.textContent = des
    card.appendChild(aDes)

    var md = document.createElement("a")
    md.classList.add("read-more")
    md.href = `../pages#${readId}`
    md.textContent = "(อ่านเพิ่มเติม)"
    md.id = readId
    card.appendChild(md)

    if (isStable) {
        var tagR = document.createElement("span")
        tagR.classList.add("addon-stable-tag")
        tagR.textContent = "@stable"
        card.appendChild(tagR)
    } else {
        var tagR = document.createElement("span")
        tagR.classList.add("addon-beta-tag")
        tagR.textContent = "@beta"
        card.appendChild(tagR)
    }

    var addonGrid = document.querySelector(".addon-grid")
    addonGrid.appendChild(card)

    setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
    }, 100)
}

function generate(stableFirst = false) {
    var addonGrid = document.querySelector(".addon-grid")
    addonGrid.innerHTML = ""
    var addons = addon
    if (stableFirst) {
        addons.sort((a, b) => {
            if (a.isStable && !b.isStable) return -1       // a comes before b
            else if (!a.isStable && b.isStable) return 1   // b comes before a
            else return 0                                  // no change in order

        })
    }
    /**
     * else {
     *     addons.sort((a, b) => {
     *         if (a.isStable && !b.isStable) return 1        // b comes before a
     *         else if (!a.isStable && b.isStable) return -1  // a comes before b
     *         else return 0                                  // no change in order
     *     })
     * }
    */

    addons.forEach((addon, index) => {
        create(addon.title, addon.description, addon.imgSrc, addon.readId, addon.pageHref, addon.isStable)
        setTimeout(() => {
            var addonCards = document.querySelectorAll(".addon-card")
            addonCards[index].style.opacity = "1"
            addonCards[index].style.transform = "translateY(0)"
        }, 100 * (index + 1))
    })
}

generate(false)

var modal = document.getElementById("settings-modal")
var settingsIcon = document.querySelector(".settings-icon")
var closeBtn = document.querySelector(".close")

function openModal() {
    modal.style.display = "block"
    document.body.classList.add('modal-open')
}
function closeModal() {
    modal.style.display = "none"
    document.body.classList.remove('modal-open')
}

settingsIcon.onclick = function () {
    if (modal.style.display === "block") closeModal()
    else openModal()
}

closeBtn.onclick = function () { closeModal() }
window.onclick = function (ev) { if (ev.target == modal) closeModal() }
window.onkeydown = function (ev) { if (ev.key === "Escape") closeModal() }

function saveSettings() {
    var stableFirst = document.getElementById("stableFirstCheckbox").checked
    var darkMode = document.getElementById("darkModeCheckbox").checked
    var lowqu = document.getElementById("lowqu").checked
    var dataCollect = document.getElementById("data_collect").checked
    var cacheImg = document.getElementById("cacheImg").checked

    document.cookie = "stableFirst=" + stableFirst
    document.cookie = "darkMode=" + darkMode
    document.cookie = "lowqu=" + lowqu
    document.cookie = "dataCollect=" + dataCollect
    document.cookie = "cacheImg=" + cacheImg
}

/** block */
if (window.location.hostname !== '127.0.0.1') {
    document.body.classList.add('no-select')
    setTimeout(() => { document.querySelectorAll('img').forEach(img => { img.draggable = false }) }, 300)
    window.addEventListener('contextmenu', function (ev) { ev.preventDefault() })
    document.addEventListener('dragstart', function (event) { if (event.target.tagName.toLowerCase() === 'a') event.preventDefault() })
}