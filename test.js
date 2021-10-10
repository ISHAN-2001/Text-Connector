const fs = require('fs');

async function checkfile(path) {
    try {
        await fs.promises.access(path);
        console.log("Exists");
    } catch (error) {
        console.log("No file is here");
    }
}

checkfile("./static/uploads/file-1633714698735.jpeg");