export const getSentenceFromCamelCase = (message: string): string => {
    let pattern = /[A-Za-z]/g;
    let messages = message.match(pattern);
    let errorMessage = "";
    if (messages !== null) {
        for (let i = 0; i < messages.length; i++) {
            errorMessage +=
                messages[i] === messages[i].toUpperCase()
                    ? " " + messages[i].toLowerCase()
                    : messages[i];
        }
    }
    return errorMessage.trim();
};

export const getRegExp = (type: string): RegExp => {
    let regex: RegExp = / /;
    switch (type) {
        case "email":
            regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
            break;
        case "password":
            regex = /^[a-z0-9A-Z]+$/;
            break;
        default:
            break;
    }
    return regex;
};

export const checkValidation = (
    errors: { [key: string]: string },
    data: { [key: string]: string | object }
): { [key: string]: string } => {

    const finalErrors: { [key: string]: string } = {};
    Object.keys(data).forEach((key) => {
        if (data[key] === "" || data[key] === {}) {
            finalErrors[key] = `Please enter ${getSentenceFromCamelCase(key)}.`;
        }
    });
    Object.keys(errors).forEach((key) => {
        if (errors[key] !== "") {
            finalErrors[key] = errors[key];
        }
    });
    return finalErrors;

};

export const getItemFromStorage = (key : string) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const setItemInStorage = (name : string, data : string) => {
    window.localStorage.setItem(name, data);
};

export const removeItemFromStorage = (name : string) => {
    window.localStorage.removeItem(name);
};
