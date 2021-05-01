const execute = () => {
	const script = document.createElement("script");
	script.src = chrome.extension.getURL("src/injection.js");
	(document.head || documentElement).appendChild(script);
};
