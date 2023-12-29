document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll("div.code").forEach(el => {hljs.highlightElement(el);});
});