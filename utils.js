// utils.js

// Function to toggle the extension state
const toggleExtensionState = () => {
  chrome.storage.sync.get('isEnabled', (data) => {
      const isEnabled = !data.isEnabled; // Toggle the state
      chrome.storage.sync.set({ isEnabled }, () => {
          // Send a message to content script to toggle the extension's functionality
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_STATE', isEnabled });
              chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_FONT', isEnabled });
              chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_SPACING', isEnabled });
          });
      });
  });
};

// Call the function to toggle the extension state when the extension icon is clicked
chrome.action.onClicked.addListener(toggleExtensionState);
