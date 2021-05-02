// ActionProvider starter code
import React from "react";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet(){
        const message = this.createChatBotMessage(
            "Hi there!");

        this.updateChatbotState(message);
    }

    faq = () => {
        const message = this.createChatBotMessage(
            "Fantastic, I've got the link to the FAQ here:",
            {
                widget: "faqLink",
            }
        );
        this.updateChatbotState(message);
    }

    aboutUs = () => {
        const message = this.createChatBotMessage(
            "Fantastic, I've got the link to the about us here:",
            {
                widget: "aboutUs",
            }
        );
        this.updateChatbotState(message);
    }
    signup = () => {
        const message = this.createChatBotMessage(
            "Fantastic, I've got the link to Register Page here:",
            {
                widget: "signUp",
            }
        );
        this.updateChatbotState(message);
    }

    handleJavascriptList = () => {
        const message = this.createChatBotMessage(
            "Fantastic, I've got the following resources for you on Javascript:",
            {
                widget: "javascriptLinks",
            }
        );

        this.updateChatbotState(message);
    };

    updateChatbotState(message) {
        // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;