




const dropdownButton = document.getElementById("dpdwn-button");
const dropdown = document.getElementById("dropdown");
const dropdownArrow = document.getElementById("dropdown-arrow");
const dropdownOptions = Array.from(document.getElementsByClassName("dropdown-option"))
const dropdownButtonChildren = Array.from(dropdownButton.childNodes)
const toggleClass = (element, thing) => {
    element.classList.toggle(thing);
};

const setElementContent = (target, content) => {
    target.textContent = content;

};

dropdownButton.addEventListener("click", (e) => {
    e.preventDefault();
    toggleClass(dropdown, 'hidden');
    toggleClass(dropdownArrow, 'rotate');

});

console.log(dropdownOptions);
    

dropdownOptions.forEach(element => {

    element.addEventListener("click", () => {
        setElementContent(Array.from(dropdownButton.childNodes)[0], element.textContent);
        toggleClass(dropdown, 'hidden');
        toggleClass(dropdownArrow, 'rotate');
    })
    
});


console.log(dropdownButton.childNodes);

