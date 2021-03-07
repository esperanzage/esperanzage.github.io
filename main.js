const dropdowns = Array.from(
    document.getElementsByClassName("dropdown-container")
);
const sliderGroup = Array.from(document.getElementsByClassName("slider-group"));
const personBubbles = Array.from(document.querySelectorAll(".bubble.person"));
const orgBubbles = Array.from(document.querySelectorAll(".bubble.org"));
const mspBubbles = Array.from(document.querySelectorAll(".bubble.msp"));
const userAvatar = document.querySelector("#avatar-user");
const botAvatar = document.querySelector("#avatar-bot");

// General Functions


let state = {
    userType: '',
    size: 0,
    users: 0,
    from: '',
    to: ''
}


const setState = (key, value) => {
    state[key] = value;
}

const toggleOpacityAnimation = (element, hide) => {
    if (hide) {
        element.classList.remove("animateOpacity");
        element.classList.add("animateOpacityOut");

    } else {
        element.classList.remove("animateOpacityOut");
        element.classList.add("animateOpacity");
    }

};

const toggleClass = (element, className) => element.classList.toggle(className);

const setElementContent = (target, content) => (target.textContent = content);

const getMoveBotPricing = (size, users) => ((size * 0.4) + (users * 0.01)).toFixed(0);

const getCompetitorPricing = (size, users) => ((size * 0.4 * 1.3) + (users * 0.01)).toFixed(0);

const updatePricingBoxes = () => {

    const pricingBoxes = Array.from(
        document.querySelectorAll(".pricing-container")
    );

    pricingBoxes.forEach((box) => {
        let priceNumber = box.querySelector(".price");

        if (box.classList.contains("competitor")) {
            setElementContent(priceNumber, "$" + getCompetitorPricing(state.size, state.users));
        } else {
            setElementContent(priceNumber, "$" + getMoveBotPricing(state.size, state.users));
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
            output.textContent = outputValue.toFixed(1) + " TB";
        }
        setState('size', valueFromPosition);
        updatePricingBoxes();
    };
    updateSlider();
    slider.oninput = updateSlider;

};

const renderBubblesByUser = () => {
    switch (state.userType) {
        case 'select-person':
            orgBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble, 'hide');
                bubble.classList.add("hidden");

            });
            mspBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble, 'hide');
                bubble.classList.add("hidden");

            });
            personBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble);
                bubble.classList.remove("hidden");

            });
            setAvatar();
            break
        case 'select-org':
            personBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble, 'hide');
                bubble.classList.add("hidden")

            });
            mspBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble, 'hide');
                bubble.classList.add("hidden")

            });
            orgBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble);
                bubble.classList.remove("hidden");

            });
            setAvatar();
            break
        case 'select-msp':
            personBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble, 'hide');
                bubble.classList.add("hidden")
            });
            orgBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble, 'hide');
                bubble.classList.add("hidden")
            });
            mspBubbles.forEach((bubble) => {
                toggleOpacityAnimation(bubble);
                bubble.classList.remove("hidden")
            });
            setAvatar();
    }

};

const setAvatar = () => {

    switch (state.userType) {
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
            setState('users', rangeSlider.value);
            updatePricingBoxes();
        };
    }
});

// Dropdown behaviors

const createDropdownOptions = () => {

}

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
            if (dropdown.classList.contains('user-type')) {
                setState('userType', element.id);
                renderBubblesByUser();
            }
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