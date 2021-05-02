// Config starter code
import { createChatBotMessage } from 'react-chatbot-kit';

import React from "react";
import LearningOptions from "./LearningOptions";
import LinkList from "./LinkList";




const config = {
    botName: "LearningBot",
    initialMessages: [
        createChatBotMessage("Hi, I'm here to help. What do you want to learn?", {
            widget: "learningOptions",
        }),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#5ccc9d",
            color: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
        chatMessage: {
            font: "Times New Roman",
            fontsize: "9px",
        },
        chatContainer: {
            position: "relative",
        },
    },
    widgets: [
        {
            widgetName: "learningOptions",
            widgetFunc: (props) => <LearningOptions {...props} />,
        },
        {
            widgetName: "faqLink",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                    {
                        text: "FAQ Page",
                        url: "http://localhost:3000/FAQ",
                        id: 1,
                    }
                ]
            },
        },
        {
            widgetName: "aboutUs",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                    {
                        text: "About Us",
                        url: "http://localhost:3000/About",
                        id: 1,
                    }
                ]
            },
        },
        {
            widgetName: "SignUp",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                    {
                        text: "SignUp",
                        url: "http://localhost:3000/Register",
                        id: 1,
                    }
                ]
            },
        },
        {
            widgetName: "javascriptLinks",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                    {
                        text: "Introduction to JS",
                        url:
                            "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
                        id: 1,
                    },
                    {
                        text: "Mozilla JS Guide",
                        url:
                            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                        id: 2,
                    },
                    {
                        text: "Frontend Masters",
                        url: "https://frontendmasters.com",
                        id: 3,
                    },
                ],
            },
            
            
        },
    ],
}

export default config