const dropdowns = Array.from(
    document.getElementsByClassName("dropdown-container")
);
const sliderGroup = Array.from(document.getElementsByClassName("slider-group"));
const pricingBoxes = Array.from(
    document.querySelectorAll(".pricing-container")
);
const personBubbles = Array.from(document.querySelectorAll(".bubble.person"));
const orgBubbles = Array.from(document.querySelectorAll(".bubble.org"));
const mspBubbles = Array.from(document.querySelectorAll(".bubble.msp"));
const userAvatar = document.querySelector("#avatar-user");
const botAvatar = document.querySelector("#avatar-movebot");


// General Functions

const toggleOpacityAnimation = (element) => {
    if (element.classList.contains("hidden")) {
        element.classList.toggle("animateOpacityOut")
        element.classList.remove("animateOpacity")
    } else {
        element.classList.remove("animateOpacityOut")
        element.classList.add("animateOpacity")
    }

}

const toggleClass = (element, className) => element.classList.toggle(className);

const setElementContent = (target, content) => (target.textContent = content);

const getMoveBotPricing = (gigas) => (gigas * 0.4).toFixed(0);

const getCompetitorPricing = (gigas) => (gigas * 0.4 * 1.3).toFixed(0);

const updatePricingBoxes = (value) => {
    pricingBoxes.forEach((box) => {
        let priceNumber = box.querySelector(".price");

        if (box.classList.contains("competitor")) {
            setElementContent(priceNumber, "$" + getCompetitorPricing(value));
        } else {
            setElementContent(priceNumber, "$" + getMoveBotPricing(value));
        }
    });
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

        updatePricingBoxes(valueFromPosition);
    };
    updateSlider();
    slider.oninput = updateSlider;

    // output.oninput = () => {
    //     console.log("output.oninput")
    //     let inputValue = output.value;
    //     let positionFromValue = minpos + (Math.log(inputValue) - minlval) / scale;

    //     slider.value = positionFromValue;
    //     updatePricingBoxes(positionFromValue);

    // }
};

const renderBubblesByUser = (optionValue) => {
    switch (optionValue) {
        case 'select-person':
            orgBubbles.forEach((bubble) => bubble.classList.add("hidden"));
            mspBubbles.forEach((bubble) => {
                bubble.classList.add("animateOpacityOut", "hidden")
            });
            personBubbles.forEach((bubble) => {
                bubble.classList.remove("hidden")
                bubble.classList.add("animateOpacity")
            });
            setAvatar('person');
            break
        case 'select-org':
            personBubbles.forEach((bubble) => {
                bubble.classList.add("hidden")
                toggleOpacityAnimation(bubble);
            });
            mspBubbles.forEach((bubble) => {
                bubble.classList.add("hidden")
                toggleOpacityAnimation(bubble);
            });
            orgBubbles.forEach((bubble) => {
                bubble.classList.remove("hidden");
                toggleOpacityAnimation(bubble);
            });
            setAvatar('org');
            break
        case 'select-msp':
            personBubbles.forEach((bubble) => bubble.classList.add("hidden"));
            orgBubbles.forEach((bubble) => bubble.classList.add("hidden"));
            mspBubbles.forEach((bubble) => bubble.classList.remove("hidden"));
            setAvatar('msp');
    }


    // if (optionValue === "select-person") {
    //     orgBubbles.forEach((bubble) => bubble.classList.add("hidden"));
    //     mspBubbles.forEach((bubble) => bubble.classList.add("hidden"));
    //     personBubbles.forEach((bubble) => bubble.classList.remove("hidden"));
    //     setAvatar('person');
    // } else if (optionValue === "select-org") {
    //     personBubbles.forEach((bubble) => bubble.classList.add("hidden"));
    //     mspBubbles.forEach((bubble) => bubble.classList.add("hidden"));
    //     orgBubbles.forEach((bubble) => bubble.classList.remove("hidden"));
    //     setAvatar('org');
    // } else if (optionValue === "select-msp") {
    //     personBubbles.forEach((bubble) => bubble.classList.add("hidden"));
    //     orgBubbles.forEach((bubble) => bubble.classList.add("hidden"));
    //     mspBubbles.forEach((bubble) => bubble.classList.remove("hidden"));
    //     setAvatar('msp');
    // }

};

const setAvatar = (userType) => {

    switch (userType) {
        case 'person':
            userAvatar.src = 'personas/sophie.svg'
            botAvatar.src = 'personas/jim.svg'
            break
        case 'org':
            userAvatar.src = 'personas/anne.svg'
            botAvatar.src = 'personas/ted.svg'
            break
        case 'msp':
            userAvatar.src = 'personas/ollie.svg'
            botAvatar.src = 'personas/jed.svg'

    }

}


// State


//Slider Behavior

sliderGroup.forEach((group) => {
    const rangeSlider = group.querySelector("#myRange");
    const outputContainer = group.querySelector(".size-output");

    if (rangeSlider.classList.contains("size-person")) {
        makeLogSlider(rangeSlider, outputContainer, 0, 2 * 1024);
    } else if (rangeSlider.classList.contains("size-org")) {
        makeLogSlider(rangeSlider, outputContainer, 0, 50 * 1024);
    } else {
        rangeSlider.oninput = () => {
            outputContainer.textContent = rangeSlider.value;
        };
    }
});

// Dropdown behaviors

dropdowns.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector("#dpdwn-button");
    const dropdownArrow = dropdown.querySelector("#dropdown-arrow");
    const dropdownOptionContainer = dropdown.querySelector("#dropdown");
    const dropdownOptions = Array.from(
        dropdownOptionContainer.querySelectorAll(".dropdown-option")
    );

    dropdownButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleClass(dropdownOptionContainer, "hidden");
        toggleClass(dropdownOptionContainer, "animateOpacity");
        toggleClass(dropdownArrow, "rotate");
    });

    dropdownOptions.forEach((element) => {
        element.addEventListener("click", () => {
            setElementContent(
                Array.from(dropdownButton.childNodes)[0],
                element.textContent
            );
            renderBubblesByUser(element.id);
            toggleClass(dropdownOptionContainer, "hidden");
            toggleClass(dropdownOptionContainer, "animateOpacity");
            toggleClass(dropdownArrow, "rotate");
        });
    });

    // TO DO: Move to outside of loop and get currently open dropdowns
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdownOptionContainer.classList.add("hidden");
            dropdownArrow.classList.remove("rotate");
        }
    });
});