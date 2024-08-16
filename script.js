/**
 * @author aitji
 * please don't stolen my work ok?
 */
import { addon } from "./addondataa.js"

// blur image onload
const style = document.createElement('style')
style.innerHTML = `
  .blur {
    filter: blur(10px)
    transition: filter 0.3s ease
  }
  .blur.loaded {
    filter: none
  }
`
document.head.appendChild(style)

document.addEventListener("DOMContentLoaded", function () {
    var stableFirstCheckbox = document.getElementById("stableFirstCheckbox")
    var darkModeCheckbox = document.getElementById("darkModeCheckbox")

    stableFirstCheckbox.addEventListener("change", function () {
        generate(stableFirstCheckbox.checked)
        var loadingBar = document.getElementById("loadingBar")
        loadingBar.classList.toggle("loading", stableFirstCheckbox.checked)
    })

    darkModeCheckbox.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", darkModeCheckbox.checked)
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
    img.classList.add("addon-img", "blur")
    img.src = `../img/stock/${imgSRC}`
    img.alt = title + " Image"
    img.addEventListener("load", () => img.classList.add("loaded")) // Remove blur when image is loaded
    card.appendChild(img)

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
        addons.sort((a, b) => a.isStable === b.isStable ? 0 : (a.isStable ? -1 : 1))
    }

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

/**
 * sorry for block this drag content
 * */
if (window.location.hostname !== '127.0.0.1') {
    document.body.classList.add('no-select')
    setTimeout(() => { document.querySelectorAll('img').forEach(img => { img.draggable = false }) }, 300)
    window.addEventListener('contextmenu', ev => ev.preventDefault())
    document.addEventListener('dragstart', event => { if (event.target.tagName.toLowerCase() === 'a') event.preventDefault() })
}