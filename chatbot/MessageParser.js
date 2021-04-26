class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("hello")) {
            this.actionProvider.greet();
        }

        if (lowerCaseMessage.includes("javascript")) {
            this.actionProvider.handleJavascriptList();
        }

        if (lowerCaseMessage.includes("faq")) {
            this.actionProvider.faq();
        }

        if (lowerCaseMessage.includes("about")) {
            this.actionProvider.aboutUs();
        }

        /*
        const lowerCaseMessage = message.toLowerCase()
        switch (lowerCaseMessage) {
            case lowerCaseMessage.includes("hello"):
                this.actionProvider.greet();
            case lowerCaseMessage.includes("javascript"):
                this.actionProvider.handleJavascriptList();
            case lowerCaseMessage.includes("faq"):
                this.actionProvider.faq();
        }
        */

        
    }
}

export default MessageParser;