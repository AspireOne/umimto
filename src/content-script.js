// Else it may run before the DOM is loaded.
window.onload = () => {
	if (document.readyState === 'loading')
		document.addEventListener('DOMContentLoaded', () => execute());
	else
		execute();
}

function execute() {
	const css = '';
	const js = chrome.extension.getURL("src/injection.js");

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    const script = document.createElement("script");

    style.type = 'text/css';
    script.type = 'text/javascript';

    style.appendChild(document.createTextNode(css));
    // Else it may run before the DOM is loaded.
    setTimeout(() => script.src = js, 300);
	
	head.appendChild(script);
	head.appendChild(style);
}