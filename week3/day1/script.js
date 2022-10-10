let lis = document.querySelectorAll(".tab-navigation li");
let sections = document.querySelectorAll("section.tab");

for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", function (event) {
        let id = event.currentTarget.children[0]
            .getAttribute("href")
            .split("#")[1];
        let selectedTab = document.getElementById(id);
        sections.forEach((id) => {
            id.classList.remove("selected");
        });
        lis.forEach((li) => {
            li.classList.remove("selected");
        });
        event.currentTarget.classList.add("selected");
        selectedTab.classList.add("selected");
    });
}

// event.currentTarget.children[0].getAttribute("href")         .split() or .replace()
//
// console.log('clicked!');
// 1 find all the lis, remove the selected class from them
// console.log('lis: ', lis);
// loop over lis and remove selected from of them
//
//

// 2 find all the sections (tabs) and remove selected class from
// console.log('tabs: ', tabs);
// loop over tabs and remove selected from all of them
//
//

// ✅3 figure out which li to add the selected class to
// we could use 'this'
// console.log('this: ', this);
// or we could use the event object
// console.log('event: ', event);
// console.log('event.target: ', event.target);
// console.log('event.currentTarget: ', event.currentTarget);
//event.currentTarget.classList.add('selected');
//
//

// 4 figure out which section (tab) to add the selected class to
// console.log('event.currentTarget.children: ', event.currentTarget.children);
//const aTag = event.currentTarget.children[0];
//console.log('aTag: ', aTag);
// now we need to access the href property
//const targetHRef = aTag.href;
// console.log('targetHRef: ', targetHRef);
// const targetHRef = aTag.getAttribute('href');
// console.log('targetHRef: ', targetHRef);
//const id = targetHRef.split('#')[1];
//console.log('id: ', id);
//const selectedTab = document.getElementById(id);
//console.log('selectedTab: ', selectedTab);
