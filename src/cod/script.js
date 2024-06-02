import { addon, find_me, lastest_ver } from "../../addondataa.js";

const finding = window.location.search.substring(1).split('&');
const display = document.getElementById('output');
let key = ''
let value = ''

finding.forEach(param => {
    const keyValue = param.split('=');
    key = keyValue[0];
    value = keyValue[1];
    const span = document.createElement('span');
    span.innerHTML = `Finding 🗝️ and 🧰, to download a pack.`;
    span.textContent = `🗝️ Key: ${key} • 🧰 Value: ${value}`;
    display.appendChild(document.createElement('br'));
    let find_url = find_me.findIndex(finder => value.toLowerCase().includes(finder.url.toLowerCase()));
    if (find_url >= 0) {
        let data = addon.find(data => data.readId === find_me[find_url].url);

        if (data) {
            var a = data.readId
            console.log(`redirect ../../pages#${a}`);
            window.location.href = `../../pages#${a}`;
            return;
        } else {
            let reDir = find_me[find_url].link;
            if (key.startsWith("ver")) {
                reDir = reDir.replace("_ver_", key.split('ver')[1]);
            } else if (key.includes("lastest") || key.includes("latest")) {
                reDir = reDir.replace("_ver_", lastest_ver);
            }
            if (reDir.includes("/main/Stable/")) {
                span.innerHTML += `<br>⠀⠀⠀⠀| Downloading files from: <a href="${reDir}">@aitji Github</a> (THIS ADDON IS @STABLE SUPPORT NO NEED RE DOWNLOADING)`;
            } else {
                span.innerHTML += `<br>⠀⠀⠀⠀| Downloading files from: <a href="${reDir}">@aitji Github</a>`;
            }
            window.location.href = reDir;
        }
    } else {
        span.innerHTML += `<br>⠀⠀⠀⠀| Couldn't find 🗝️ or 🧰`;
    }
    display.appendChild(span);
    display.appendChild(document.createElement('br'));
});
