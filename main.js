const dropdowns = Array.from(document.getElementsByClassName("dropdown-container"));
const sliderGroup = Array.from(document.getElementsByClassName("slider-group"));
const pricingBoxes = Array.from(document.querySelectorAll(".pricing-container"));




// General Functions

const toggleClass = (element, className) => element.classList.toggle(className);

const setElementContent = (target, content) => target.textContent = content;

const getMoveBotPricing = (gigas) => (gigas * 0.4).toFixed(0);

const getCompetitorPricing = (gigas) => (gigas * 0.4 * 1.3).toFixed(0);

const updateBoxes = (value) => {
    console.log(value);
    pricingBoxes.forEach(box => {
        let priceNumber = box.querySelector(".price");

        if (box.classList.contains('competitor')) {
            setElementContent(priceNumber, ("$" + getCompetitorPricing(value)))
        } else {
            setElementContent(priceNumber, ("$" + getMoveBotPricing(value)));
        }
    })
};

const makeLogSlider = (slider, output, minval, maxval) => {
    const minpos = slider.min || 0;
    const maxpos = slider.max || 100;
    const minlval = Math.log(minval || 50);
    const maxlval = Math.log(maxval || 100000);
    const scale = (maxlval - minlval) / (maxpos - minpos);

    const updateSlider = () => {
        let position = slider.value;
        let valueFromPosition = Math.exp((position - minpos) * scale + minlval);


        if (valueFromPosition < 1024) {
            output.textContent = valueFromPosition.toFixed(0) + " GB";
        } else {
            outputValue = valueFromPosition / 1024;
            output.textContent = outputValue.toFixed(0) + " TB";
        }


        updateBoxes(valueFromPosition);


    };
    updateSlider();
    slider.oninput = updateSlider;

    // output.oninput = () => {
    //     console.log("output.oninput")
    //     let inputValue = output.value;
    //     let positionFromValue = minpos + (Math.log(inputValue) - minlval) / scale;

    //     slider.value = positionFromValue;
    //     updateBoxes(positionFromValue);

    // }

}


//Slider Behavior


sliderGroup.forEach(group => {
    // const sliderInput = group.querySelector("#number-input");
    const rangeSlider = group.querySelector("#myRange");
    const outputContainer = group.querySelector(".size-output")

    if (rangeSlider.classList.contains('size')) {

        makeLogSlider(rangeSlider, outputContainer, 0, 50 * 1024);

    } else {
        rangeSlider.oninput = () => {
            sliderInput.value = rangeSlider.value;
        };
    }

    // sliderInput.oninput = () => {
    //     rangeSlider.value = sliderInput.value;
    // };

});

// Dropdown behaviors

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
            dropdownArrow.classList.remove('rotate');
        };
    });

});


// Pricing