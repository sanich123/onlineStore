import { Router } from "../router/router";

export function getUrl(string: string) {
    return string.slice(string.indexOf('#'));
}

export function hashListener() {
    window.addEventListener("hashchange", (event) => {
        window.history.pushState({ urlPath: getUrl(event.newURL) }, "", getUrl(event.newURL));
        Router(event.newURL);
    });
}