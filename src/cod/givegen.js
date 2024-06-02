document.addEventListener("DOMContentLoaded", function () {
    const itemTypeInput = document.getElementById("itemType");
    const countInput = document.getElementById("count");
    const idInput = document.getElementById("id");
    const playerNameInput = document.getElementById("playerName");
    const canDestroyInput = document.getElementById("canDestroy");
    const canPlaceInput = document.getElementById("canPlace");
    const canDestroyAddButton = document.getElementById("canDestroyAddButton");
    const canPlaceAddButton = document.getElementById("canPlaceAddButton");
    const canDestroyList = document.getElementById("canDestroyList");
    const canPlaceList = document.getElementById("canPlaceList");
    const keepOnDeathCheckbox = document.getElementById("keep_on_death");
    const lockModeSelect = document.getElementById("lock_mode");
    const commandOutputTextarea = document.getElementById("commandOutput");
    const copyCommandButton = document.getElementById("copyCommandButton");

    function updateCommandOutput() {
        const itemType = itemTypeInput.value;
        const count = countInput.value;
        const id = idInput.value;
        const playerName = playerNameInput.value;

        const canDestroyBlocks = getBlockArray("canDestroyList");
        const canPlaceBlocks = getBlockArray("canPlaceList");

        let command = `give ${playerName} ${itemType} ${count} ${id} {`;

        if (canDestroyBlocks.length > 0) command += `"minecraft:can_destroy":{"blocks":${JSON.stringify(canDestroyBlocks)}},`;
        if (canPlaceBlocks.length > 0) command += `"minecraft:can_place_on":{"blocks":${JSON.stringify(canPlaceBlocks)}},`;
        if (keepOnDeathCheckbox.checked) command += `"keep_on_death":{},`;
        if (lockModeSelect.value !== "none") command += `"minecraft:item_lock":{"mode":"lock_in_${lockModeSelect.value}"},`;

        command = command.replace(/,\s*$/, "");
        command += "}";
        command = command.replace(/↑/g, '').replace(/↓/g, '');
        commandOutputTextarea.value = command;
    }

    function getBlockArray(listId) {
        const blockArray = [];
        const listItems = document.getElementById(listId).getElementsByTagName("li");
        for (const listItem of listItems) {
            let blockType = listItem.textContent.trim();
            blockType = blockType.replace(/Delete/g, "").replace(/↑/g, '').replace(/↓/g, '');
            blockArray.push(blockType);
        }
        return blockArray;
    }

    function addBlockToList(input, list, addButton) {
        const blockType = input.value.trim();
        if (blockType !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = blockType;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function (event) {
                event.preventDefault();
                listItem.remove();
                updateCommandOutput();
            });

            const moveUpButton = document.createElement("button");
            moveUpButton.innerHTML = "&#8593;";
            moveUpButton.addEventListener("click", function (event) {
                event.preventDefault();
                moveListItem(list, listItem, "up");
            });

            // const moveDownButton = document.createElement("button")
            // moveDownButton.innerHTML = "&#8595;"
            // moveDownButton.addEventListener("click", function (event) {
            //     event.preventDefault();
            //     moveListItem(list, listItem, "down")
            // })

            listItem.appendChild(deleteButton)
            listItem.appendChild(moveUpButton)
            // listItem.appendChild(moveDownButton)
            list.appendChild(listItem)
            input.value = ""
            updateCommandOutput()
        }
    }


    function moveListItem(list, listItem, direction) {
        const index = Array.from(list.children).indexOf(listItem)

        if ((direction === "up" && index > 0) || (direction === "down" && index < list.children.length - 1)) {
            const newIndex = direction === "up" ? index - 1 : index + 1
            const sibling = list.children[newIndex]

            listItem.classList.add(direction === "up" ? "moving-up" : "moving-down")
            sibling.classList.add(direction === "up" ? "moving-down" : "moving-up")

            void listItem.offsetWidth
            void sibling.offsetWidth

            list.insertBefore(listItem, sibling)
            setTimeout(() => {
                listItem.classList.remove("moving-up", "moving-down")
                sibling.classList.remove("moving-up", "moving-down")
                updateCommandOutput()
            }, 300)
        }
    }

    canDestroyAddButton.addEventListener("click", function () {
        addBlockToList(canDestroyInput, canDestroyList, canDestroyAddButton)
    })

    canPlaceAddButton.addEventListener("click", function () {
        addBlockToList(canPlaceInput, canPlaceList, canPlaceAddButton)
    })

    copyCommandButton.addEventListener("click", function () {
        commandOutputTextarea.select()
        commandOutputTextarea.setSelectionRange(0, 99999)
        document.execCommand("copy")
        commandOutputTextarea.setSelectionRange(0, 0)
        alert("Command copied to clipboard!")
    })

    itemTypeInput.addEventListener("input", updateCommandOutput)
    countInput.addEventListener("input", updateCommandOutput)
    idInput.addEventListener("input", updateCommandOutput)
    playerNameInput.addEventListener("input", updateCommandOutput)
    canDestroyInput.addEventListener("input", updateCommandOutput)
    canPlaceInput.addEventListener("input", updateCommandOutput)
    keepOnDeathCheckbox.addEventListener("change", updateCommandOutput)
    lockModeSelect.addEventListener("change", updateCommandOutput)
});