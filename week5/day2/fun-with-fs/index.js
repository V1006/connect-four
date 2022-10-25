const fs = require("fs");
const path = require("path");

const rootDirPath = `${__dirname}/files`;

// exercise 1
logSizes(rootDirPath);

function logSizes(dirPath) {
    // get the content of folderName
    fs.readdir(dirPath, { withFileTypes: true }, (err, dirContent) => {
        if (err) {
            console.log("Failed loading the dir content");
            console.log(err);
            return;
        }
        // loop over them
        for (const item of dirContent) {
            // for every entry
            if (item.isFile()) {
                //get the file stats
                fs.stat(path.join(dirPath, item.name), (err, info) => {
                    if (err) {
                        console.log("Failed getting the Stats of " + item.name);
                        console.log(err);
                        return;
                    }
                    // log file name and the file size
                    console.log(`${dirPath}/${item.name} - size: ${info.size}`);
                });
            } else if (item.isDirectory()) {
                // if its a folder , repeat the process one level deeper
                logSizes(path.join(dirPath, item.name));
            }
        }
    });
}

// exercise 2

fs.writeFileSync("files.json", JSON.stringify(mapSizes(rootDirPath)));

function mapSizes(dirPath) {
    const obj = {};
    const read = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const item of read) {
        if (item.isFile()) {
            obj[item.name] = fs.statSync(path.join(dirPath, item.name)).size;
        } else if (item.isDirectory()) {
            obj[item.name] = mapSizes(path.join(dirPath, item.name));
        }
    }
    return obj;
}
