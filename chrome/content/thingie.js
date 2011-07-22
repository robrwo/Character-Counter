
function showCharCount(el) {
    var addonBar = document.getElementById("addon-bar");
    if (addonBar) {
	if (!document.getElementById("character-counter")) {
	    var addonBarCloseButton = document.getElementById("addonbar-closebutton");
	    addonBar.insertItem("character-counter", addonBarCloseButton.nextSibling);
	}
	var text = document.getElementById("character-counter-text");
	if (el) {
	    var count = null;
	    var tag = el.localName;
	    if (tag == "input") {
		var type = el.getAttribute("type");
		if ((type == "text") ||(type == null)) {
		    count = el.value.length;
		}

	    }
	    else if (tag == "textarea") {
		count = el.value.length;
	    }
	    else {
		count = tag;
	    }

	    if (count) {
		text.textContent = count;
		addonBar.collapsed = false;
	    } else {
		addonBar.collapsed = true;
	    }

	}
    }
};

function show(ev) {
    if (ev.target) {
	showCharCount(ev.target);
    }
    return true;
}

function hide(ev) {
    var addonBar = document.getElementById("addon-bar");
    if (addonBar) {
	addonBar.collapsed = true;
    }
    return true;
}

function addListeners(els) {
    if (els) {
	for(var i=0; i<els.length; i++) {
	    els[i].addEventListener("focus", show, false);
	    els[i].addEventListener("keyup", show, false);
	    els[i].addEventListener("blur",  hide, false);
	}
    }
}

function installHandlers(el) {
    addListeners(el.content.document.getElementsByTagName("input"));
    addListeners(el.content.document.getElementsByTagName("textarea"));
}

function onPageLoad(ev) {
    if (ev.originalTarget instanceof HTMLDocument) {
	var win = ev.originalTarget.defaultView;
	if (win.frameElement) {
	    installHandlers(win);
	    win = win.top;
	}
	installHandlers(win);
    }
}

window.addEventListener("load", function(ev) {
    gBrowser.addEventListener("load", onPageLoad, true);
}, false);
