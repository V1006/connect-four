const fs = require("fs");
const path = require("path");

const rootDirPath = `${__dirname}/files`;

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
