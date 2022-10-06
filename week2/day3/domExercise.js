// 1

function findAndChange(tagName) {
    let x = document.getElementsByTagName(tagName);
    for (const p of x) {
        p.style.fontStyle = "italic";
        p.style.fontWeight = "bold";
        p.style.textDecoration = "underline";
    }
}

findAndChange("article");

//2

function getElements(className) {
    let ele = document.getElementsByClassName(className);
    ele = Array.from(ele);
    return ele;
}

console.log(getElements("box"));

//3

function insertElement() {
    document.body.innerHTML = "<h1 id='h1'>AWESOME</h1>";
    // alternative html and then remove the js code below
    //"<h1 id='h1' style='z-index:2147483647; left: 20px; top: 100px; font-size: 200px'>AWESOME</h1>";

    let h1 = document.getElementById("h1");

    h1.style.position = "fixed";
    h1.style.zIndex = "2147483647";
    h1.style.left = "20px";
    h1.style.top = "100px";
    h1.style.fontSize = "200px";
}

insertElement();
