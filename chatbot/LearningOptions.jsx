import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
    const options = [

        {
            text: "FAQ",
            handler: props.actionProvider.faq,
            id: 1,
        },
        {
            text: "About Us",
            handler: props.actionProvider.aboutUs,
            id: 2,
        },
        { text: "Shop", handler: () => { }, id: 3 },
        /*
        { text: "Security", handler: () => { }, id: 4 },
        { text: "Interview prep", handler: () => { }, id: 5 },
        */
    ];

    const optionsMarkup = options.map((option) => (
        <button
            className="learning-option-button"
            key={option.id}
            onClick={option.handler}
        >
            {option.text}
        </button>
    ));

    return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;