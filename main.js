
// const dropdownButton = document.getElementById("dpdwn-button");
const dropdowns = Array.from(document.getElementsByClassName("dropdown-container"));
// const dropdownArrow = document.getElementById("dropdown-arrow");
// const dropdownOptions = Array.from(document.getElementsByClassName("dropdown-option"));
// const dropdownButtonChildren = Array.from(dropdownButton.childNodes);
// const dropdownContainers = Array.from(getElementsByClassName("dropdown-container"));




const toggleClass = (element, className) => {
    element.classList.toggle(className);
};

const setElementContent = (target, content) => {
    target.textContent = content;

};


dropdowns.forEach(dropdown => {
    const dropdownButton = dropdown.querySelector("#dpdwn-button");
    const dropdownArrow = dropdown.querySelector("#dropdown-arrow");
    const dropdownOptionContainer = dropdown.querySelector("#dropdown");
    const dropdownOptions = Array.from(dropdownOptionContainer.querySelectorAll(".dropdown-option"));

   
    dropdownButton.addEventListener("click", (e) => {
    e.preventDefault();
    toggleClass(dropdownOptionContainer, 'hidden');
    toggleClass(dropdownArrow, 'rotate');
    });

    dropdownOptions.forEach(element => {
        element.addEventListener("click", () => {
        setElementContent(Array.from(dropdownButton.childNodes)[0], element.textContent);
        toggleClass(dropdownOptionContainer, 'hidden');
        toggleClass(dropdownArrow, 'rotate');
        });
    });

    // TO DO: Move to outside of loop and get currently open dropdowns
    document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdownOptionContainer.classList.add('hidden');
    };
 });
 
});

    




