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
    to: '',
    theMatrix: false,
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
        element.classList.add("animateOpacityIn");
    }

};

const toggleClass = (element, className) => element.classList.toggle(className);

const setElementContent = (target, content) => (target.textContent = content);

const getMoveBotPricing = () => ((state.size * 0.4) + (state.users * 0.01)).toFixed(0);

const getCompetitorPricing = () => ((state.size * 0.4 * 1.3) + (state.users * 0.01)).toFixed(0);

const updatePricingBoxes = () => {

    //TO DO Format pricing number to avoid really long ones.

    const pricingBoxes = Array.from(
        document.querySelectorAll(".pricing-container")
    );

    pricingBoxes.forEach((box) => {
        let priceNumber = box.querySelector(".price");
        let moveBotPrice = getMoveBotPricing();
        let competitorPrice = getCompetitorPricing();


        if (moveBotPrice > 9999) {
            priceNumber.classList.add('small-price');
        } else {
            priceNumber.classList.remove('small-price');
        }

        competitorPrice = new Intl.NumberFormat().format(competitorPrice);
        moveBotPrice = new Intl.NumberFormat().format(moveBotPrice);

        if (box.classList.contains("competitor")) {
            setElementContent(priceNumber, "$" + competitorPrice);
        } else {
            setElementContent(priceNumber, "$" + moveBotPrice);
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

        if (valueFromPosition < 1000) {
            output.textContent = valueFromPosition.toFixed(0) + " GB";
        } else {
            outputValue = valueFromPosition / 1000;
            output.textContent = outputValue.toFixed(1) + " TB";
        }
        setState('size', valueFromPosition);
        updatePricingBoxes();
        renderHeavyLiftAppliance();
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
            setCompetitor('MultCloud', 'CloudFuse');
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
            setCompetitor('BitTitan', 'CloudFuse');
            break
        case 'the-matrix':
        case 'select-tech':
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
                bubble.classList.remove("hidden");
            });
            setAvatar();
            setCompetitor('CloudM', 'CloudFastPath');
            break
    }

};

const setAvatar = () => {

    if (state.theMatrix) {
        userAvatar.src = 'personas/morpheus.svg'
        botAvatar.src = 'personas/neo.svg'
    } else {
        switch (state.userType) {
            case 'select-person':
                userAvatar.src = 'personas/sophie.svg'
                botAvatar.src = 'personas/jim.svg'
                break
            case 'select-org':
                userAvatar.src = 'personas/anne.svg'
                botAvatar.src = 'personas/ted.svg'
                break
            case 'select-tech':
            case 'select-msp':
                userAvatar.src = 'personas/ollie.svg'
                botAvatar.src = 'personas/jed.svg'
                break
        }
    }



}

const setCompetitor = (firstCompetitor, secondCompetitor) => {
    const competitor1 = document.querySelector('#competitor-1');
    const competitor2 = document.querySelector('#competitor-2');

    competitor1.textContent = firstCompetitor;
    competitor2.textContent = secondCompetitor;
}

const updateStateByUserType = (userType) => {
    setState('userType', userType);

    // TO DO - Set state for size and users when changing user type

    // switch (userType){
    //   case 'select-person':

    //     break
    // case 'select-org':

    //     break
    // case 'select-tech':
    // case 'select-msp':

    //     break
    // }

    // setState('size', )
}

const renderHeavyLiftAppliance = () => {
    const heavyLiftOption = document.querySelector('#heavylift')
    if (state.size > 10000) {
        heavyLiftOption.classList.remove('hidden');
    } else {
        heavyLiftOption.classList.add('hidden');
    }
}

const renderTransferMethod = () => {
    const transferMethodBubble = document.querySelector('.transfer-method');

    if (state.from === 'local-server') {
        transferMethodBubble.classList.remove('hidden');

    } else {
        transferMethodBubble.classList.add('hidden');
    }
}

const renderTheMatrix = () => {

    if (state.from === 'wasabi' || state.to === 'wasabi') {
        setState('theMatrix', true);
    } else {
        setState('theMatrix', false);
    }

    setAvatar();


}

//Slider Behavior

sliderGroup.forEach((group) => {
    const rangeSlider = group.querySelector("#myRange");
    const outputContainer = group.querySelector(".size-output");

    if (rangeSlider.classList.contains("size-person")) {
        makeLogSlider(rangeSlider, outputContainer, 0, 2 * 1024);
    } else if (rangeSlider.classList.contains("size-org")) {
        makeLogSlider(rangeSlider, outputContainer, 0, 200 * 1024);
    } else if (rangeSlider.classList.contains("size-msp")) {
        makeLogSlider(rangeSlider, outputContainer, 0, 500 * 1024);
    } else {
        rangeSlider.oninput = () => {
            outputContainer.textContent = rangeSlider.value;
            setState('users', rangeSlider.value);
            updatePricingBoxes();
        };
    }
});

// Dropdown behaviors

//TO DO  Create dropdown options from array to clean-up html
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
                updateStateByUserType(element.id);
                renderBubblesByUser();
            } else if (dropdown.classList.contains('from')) {
                setState('from', element.id);
                renderTransferMethod();
                renderTheMatrix();
            } else if (dropdown.classList.contains('to')) {
                setState('to', element.id);
                renderTheMatrix();
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