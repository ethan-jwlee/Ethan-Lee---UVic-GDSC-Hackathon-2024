chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
    chrome.tabs.sendMessage(tabId, { type: "TOGGLE_STATE" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
    chrome.tabs.sendMessage(tabId, { type: "TOGGLE_FONT" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
    chrome.tabs.sendMessage(tabId, { type: "TOGGLE_SPACING" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_STATE") {
    chrome.storage.sync.set({ isEnabled: message.isEnabled });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_FONT") {
    chrome.storage.sync.set({ isFontEnabled: message.isFontEnabled });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_SPACING") {
    chrome.storage.sync.set({ isSpacingEnabled: message.isSpacingEnabled });
  }
});




