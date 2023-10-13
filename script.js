// const exerciseTable = document.getElementById('exerciseTable');
// const weightTotal = document.getElementById('weightTotal');
// const repsTotal = document.getElementById('repsTotal');
// const totalTotal = document.getElementById('totalTotal');

// For Profile 🦾
// const weight = '76';
// const height = '1.80';
// For Profile 🦾


// capsuledCodeForFetch();




const table = document.querySelector("table");
const head = table.querySelector("thead");
const body = table.querySelector("tbody");
const footer = table.querySelector("tfoot");

const addButton = document.getElementById("addRow");
const removeButton = document.getElementById("removeRow");

const generateTime = function (time) {
    const date = new Date();
    time.textContent = date.toLocaleTimeString();
}

addButton.onclick = addRow;
removeButton.onclick = removeRow;

addRemoveChild();

// calculate();


function addRemoveChild() {
    table.addEventListener("click", function (e) {
        const isAdd = e.target.getAttribute("data-col") === "add-child";
        const isRemove = e.target.getAttribute("data-col") === "remove-child";
        const row = e.target.closest("tr");

        if (isAdd) {
            const cloneRow = row.cloneNode(true);
            const cloneExercice = cloneRow.querySelector("[data-col='exercise']");
            const cloneRemoveChild = cloneRow.querySelector("[data-col='add-child']");

            cloneRemoveChild.textContent = "Remove Child";
            cloneRemoveChild.setAttribute("data-col", "remove-child");
            cloneExercice.classList.add("disable");

            return insertAfter(cloneRow, row);
        }

        if (isRemove) {
            const grandTotal = table.querySelector("[data-col='grand-total']");
            const total = row.querySelector("[data-col='total']").textContent;

    
            if (total) {
                grandTotal.textContent = Number(grandTotal.textContent) - Number(total);
            }
        
            row.remove();
        }
    })
}

function addRow() {
    const template = `
    <tr>
        <td contenteditable="true" data-col="exercise">-</td>
        <td contenteditable="true" data-col="weight">-</td>
        <td contenteditable="true" data-col="reps">-</td>
        <td contenteditable="true" data-col="rpe">-</td>
        <td contenteditable="true" data-col="notes">-</td>
        <td contenteditable="true" data-col="time">-</td>
        <td class="total-cell" data-col="total"></td>
        <td class="time-tick">&#10003;</td>
        <td data-col="add-child">Add Child</td>
    </tr>
    `;
    body.insertAdjacentHTML("beforeend", template);
}

function removeRow() { 
    if (body.children.length === 1) return;

    const lastRow = body.children[body.childElementCount - 1];
    const lastRowTotal = lastRow.querySelector("[data-col='total']");
    const grandTotal = table.querySelector("[data-col='grand-total']");
    
    if (lastRowTotal.textContent) {
        grandTotal.textContent = Number(grandTotal.textContent) - Number(lastRowTotal.textContent);
    }

    lastRow.remove();
}

window.addEventListener("input", function (e) {
    const isWeight = e.target.getAttribute("data-col") === "weight";
    const isReps = e.target.getAttribute("data-col") === "reps";
        
    if (isWeight) {
        // Need better number handling when adding letters 
        const w = Number(e.target.textContent);
        if (!w) e.target.textContent = "";
        e.target.setAttribute("data-weight", w);
    }

    if (isReps) {
        // Need better number handling when adding letters 
        const reps = Number(e.target.textContent);
        if (!reps) e.target.textContent = "";
        e.target.setAttribute("data-reps", reps);
    }

    if (isWeight || isReps) {

        // Need better number handling when adding letters 
        const weight = e.target.closest("tr").querySelector("[data-col='weight']").getAttribute("data-weight");
        const reps = e.target.closest("tr").querySelector("[data-col='reps']").getAttribute("data-reps");
        const total = e.target.closest("tr").querySelector("[data-col='total']");
        const grandTotal = table.querySelector("[data-col='grand-total']");
        const time = e.target.closest("tr").querySelector("[data-col='time']");
            
        if (!weight || !reps) return;

        if (time.textContent === "-") generateTime(time);

        total.textContent = Number(weight) * Number(reps);
        total.setAttribute("data-total", total.textContent);


        const totals = document.querySelectorAll("[data-total]");
        let sum = 0;
        totals.forEach(total => sum += Number(total.textContent));

        grandTotal.textContent = sum;
    }
    
});

table.addEventListener("focusin", function (e) {
    const isWeight = e.target.getAttribute("data-col") === "weight";
    const isReps = e.target.getAttribute("data-col") === "reps";

    if (isWeight || isReps) {
        if (e.target.textContent === "-") e.target.textContent = null;
        if(e.target.textContent === "0") e.target.textContent = "";
    }
});

table.addEventListener("focusout", function (e) {
    const isWeight = e.target.getAttribute("data-col") === "weight";
    const isReps = e.target.getAttribute("data-col") === "reps";

    if (isWeight || isReps) {
        if(e.target.textContent === "") e.target.textContent = 0;
    }
});

function calculate() {
    table.addEventListener("focusin", function (e) {
        const isWeight = e.target.getAttribute("data-col") === "weight";
        const isReps = e.target.getAttribute("data-col") === "reps";

        if (isWeight || isReps) {
            if(e.target.textContent === "-") e.target.textContent = null;
        }

    });
    table.addEventListener("focusout", function (e) {
        const isWeight = e.target.getAttribute("data-col") === "weight";
        const isReps = e.target.getAttribute("data-col") === "reps";

        if (isWeight) {
            // Need better number handling when adding letters 
            const w = Number(e.target.textContent);       
            if (!w) e.target.textContent = 0;
            e.target.setAttribute("data-weight", w); 
        }

        if (isReps) {
            // Need better number handling when adding letters 
            const reps = Number(e.target.textContent);            
            if (!reps) e.target.textContent = 0;
            e.target.setAttribute("data-reps", reps); 
        }

        if (isWeight || isReps) {
            // Need better number handling when adding letters 
            const weight = e.target.closest("tr").querySelector("[data-col='weight']").getAttribute("data-weight");
            const reps = e.target.closest("tr").querySelector("[data-col='reps']").getAttribute("data-reps");
            const total = e.target.closest("tr").querySelector("[data-col='total']");
            const grandTotal = table.querySelector("[data-col='grand-total']");
            const time = e.target.closest("tr").querySelector("[data-col='time']");
            
            if (!weight || !reps) return;

            if (time.textContent === "-") generateTime(time);

            total.textContent = Number(weight) * Number(reps);
            total.setAttribute("data-total", total.textContent);


            const totals = document.querySelectorAll("[data-total]");
            let sum = 0;
            totals.forEach(total => sum += Number(total.textContent));
            grandTotal.textContent = sum;
        }

    });
}

// Helpers
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// function updateTotals() {
//     const rows = exerciseTable.rows;
//     let totalWeight = 0;
//     let totalReps = 0;
//     let totalTotalValue = 0;

//     for (let i = 1; i < rows.length - 1; i++) {
//         const row = rows[i];
//         const weight = parseFloat(row.cells[1].textContent) || 0;
//         const reps = parseInt(row.cells[2].textContent) || 0;
//         const rpe = parseFloat(row.cells[3].textContent) || 0;

//         totalWeight += weight;
//         totalReps += reps;
//         totalTotalValue += weight * reps * rpe;
//     }

//     weightTotal.textContent = totalWeight.toFixed(2);
//     repsTotal.textContent = totalReps;
//     totalTotal.textContent = totalTotalValue.toFixed(2);
// }

// exerciseTable.addEventListener('input', updateTotals);

// exerciseTable.addEventListener('click', function (event) {
//     if (event.target.classList.contains('time-tick')) {
//         const row = event.target.parentNode;
//         const timeCell = row.cells[5];
//         const currentTime = new Date().toLocaleTimeString();
//         timeCell.textContent = currentTime;
//         updateTotals();
//     }
// });

// function resetTable() {
//     const rows = exerciseTable.rows;
//     for (let i = rows.length - 2; i >= 1; i--) {
//         rows[i].remove();
//     }
//     updateTotals();
// }

// document.getElementById('addRowButton').addEventListener('click', addRow);
// document.getElementById('resetTableButton').addEventListener('click', resetTable);

// exerciseTable.addEventListener('focusout', function (event) {
//     const cell = event.target;
//     const rpe = parseFloat(cell.textContent) || 0;
//     cell.classList.remove('mild-color', 'strong-color', 'red-color');

//     if (rpe >= 1 && rpe < 3) {
//         cell.classList.add('mild-color');
//     } else if (rpe >= 3 && rpe < 6) {
//         cell.classList.add('strong-color');
//     } else if (rpe >= 6 && rpe <= 10) {
//         cell.classList.add('red-color');
//     }
// });

// Initial row
// addRow();



function capsuledCodeForFetch() {
    
    const imageElement = document.getElementById("image");
    const fetchButton = document.getElementById("fetchButton");
    const apiKey = "rg0lJYli0IbUu0tD_XFh2XBZP1h33TOgSxUjtxlxlug";
    const searchQuery = "landscape"; // Change this to your desired search query
    let currentImageIndex = 0;
    let images = [];

    async function fetchImages() {
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10&client_id=${apiKey}`
    );
    const data = await response.json();
    images = data.results.map(result => result.urls.regular);
    }

    function showNextImage() {
    if (images.length === 0) {
        return;
    }

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    const imageUrl = images[currentImageIndex];
    imageElement.src = imageUrl;
    currentImageIndex++;

    // Reset the image transform to its original state
    imageElement.style.transform = "none";

    // Add a class to trigger a CSS animation
    void imageElement.offsetWidth; // This line is needed to trigger a reflow for the animation
    imageElement.style.transform = "scale(1.1)";

    setTimeout(showNextImage, 10000); // Show the next image after 10 seconds
    }

    fetchButton.addEventListener("click", async () => {
    await fetchImages();
    showNextImage();
    });

}

   