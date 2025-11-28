<!DOCTYPE html>
<html>
<head>
    <title>Simple Map JSON Generator</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        h2 { margin-top: 40px; }
        .box { background: white; padding: 15px; margin-bottom: 15px; border-radius: 6px; }
        label { display: block; margin-top: 5px; }
        input { padding: 5px; margin-bottom: 5px; width: 250px; }
        button { margin-top: 10px; padding: 6px 10px; cursor: pointer; }
        textarea { width: 100%; height: 400px; font-family: monospace; }
    </style>
</head>
<body>

<h1>Simple Map JSON Generator</h1>

<div class="box">
    <label>Map Name:</label>
    <input class="mapName" placeholder="powergrid1" />

    <div class="spawnPointsContainer"></div>
    <button onclick="addSpawnPoint()">+ Add Spawn Point</button>
</div>

<button onclick="addMap()">+ Add Another Map</button>
<br><br>
<button onclick="generateJSON()">Generate JSON</button>

<h2>Generated JSON</h2>
<textarea id="output"></textarea>

<script>
const container = document.body;

function addMap() {
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `
        <label>Map Name:</label>
        <input class="mapName" placeholder="powergrid1" />

        <div class="spawnPointsContainer"></div>
        <button onclick="addSpawnPointToBox(this)">+ Add Spawn Point</button>
    `;
    container.insertBefore(box, container.querySelector('button[onclick="addMap()"]'));
}

function addSpawnPoint() {
    const spawnContainer = document.querySelector('.spawnPointsContainer');
    const div = document.createElement('div');
    div.innerHTML = `
        <label>Spawn Point Name:</label>
        <input class="spawnName" placeholder="spawnPoint1" />
        <label>Coordinates (X Y Z):</label>
        <input class="coords" placeholder="0 64 0" />
    `;
    spawnContainer.appendChild(div);
}

function addSpawnPointToBox(btn) {
    const box = btn.parentElement;
    const spawnContainer = box.querySelector('.spawnPointsContainer');
    const div = document.createElement('div');
    div.innerHTML = `
        <label>Spawn Point Name:</label>
        <input class="spawnName" placeholder="spawnPoint1" />
        <label>Coordinates (X Y Z):</label>
        <input class="coords" placeholder="0 64 0" />
    `;
    spawnContainer.appendChild(div);
}

function parseCoords(str) {
    const parts = str.trim().split(/\s+/).map(Number);
    return {
        x: parts[0] || 0,
        y: parts[1] || 0,
        z: parts[2] || 0
    };
}

function generateJSON() {
    const boxes = document.querySelectorAll('.box');
    const result = {};

    boxes.forEach(box => {
        const mapName = box.querySelector('.mapName').value.trim();
        if (!mapName) return;

        const spawns = {};
        box.querySelectorAll('.spawnPointsContainer div').forEach(spawnDiv => {
            const spawnName = spawnDiv.querySelector('.spawnName').value.trim();
            const coords = parseCoords(spawnDiv.querySelector('.coords').value);
            if (spawnName) spawns[spawnName] = coords;
        });

        if (Object.keys(spawns).length > 0) {
            result[mapName] = spawns;
        }
    });

    document.getElementById('output').value = JSON.stringify(result, null, 2);
}

// Initialize first spawn point
addSpawnPoint();
</script>

</body>
</html>
