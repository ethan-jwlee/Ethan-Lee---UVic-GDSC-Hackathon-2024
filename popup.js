document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const fontButton = document.getElementById('fontButton');
  const lineSpacingButton = document.getElementById('lineSpacingButton');

  chrome.storage.sync.get(['isEnabled', 'isFontEnabled', 'isSpacingEnabled'], ({ isEnabled, isFontEnabled, isSpacingEnabled }) => {
    updateButtonState(toggleButton, isEnabled);
    updateFontState(fontButton, isFontEnabled);
    updateSpacingState(lineSpacingButton, isSpacingEnabled);
  });

  toggleButton.addEventListener('click', function () {
    chrome.storage.sync.get('isEnabled', ({ isEnabled }) => {
      const newIsEnabled = !isEnabled;
      chrome.storage.sync.set({ isEnabled: newIsEnabled });
      updateButtonState(toggleButton, newIsEnabled);

      // Send a message to background script to toggle the state
      chrome.runtime.sendMessage({ type: 'TOGGLE_STATE', isEnabled: newIsEnabled });
    });
  });

  fontButton.addEventListener('click', function () {
    chrome.storage.sync.get('isFontEnabled', ({ isFontEnabled }) => {
      const newIsFontEnabled = !isFontEnabled;
      chrome.storage.sync.set({ isFontEnabled: newIsFontEnabled });
      updateFontState(fontButton, newIsFontEnabled);

      // Send a message to background script to toggle the font state
      chrome.runtime.sendMessage({ type: 'TOGGLE_FONT', isFontEnabled: newIsFontEnabled });
    });
  });

  lineSpacingButton.addEventListener('click', function () {
    chrome.storage.sync.get('isSpacingEnabled', ({ isSpacingEnabled }) => {
      const newIsSpacingEnabled = !isSpacingEnabled;
      chrome.storage.sync.set({ isSpacingEnabled: newIsSpacingEnabled });
      updateSpacingState(lineSpacingButton, newIsSpacingEnabled);

      // Send a message to background script to toggle the spacing state
      chrome.runtime.sendMessage({ type: 'TOGGLE_SPACING', isSpacingEnabled: newIsSpacingEnabled });
    });
  });

  
  function updateButtonState(button, isEnabled) {
    button.textContent = isEnabled ? 'ON' : 'OFF';
    button.style.backgroundColor = isEnabled ? 'green' : 'red';
  }
  function updateFontState(button, isFontEnabled) {
    button.textContent= isFontEnabled ? 'ON' : 'OFF'; 
    button.style.backgroundColor = isFontEnabled ? 'green' : 'red';
  }
  function updateSpacingState(button, isSpacingEnabled) {
    button.textContent = isSpacingEnabled ? 'ON' : 'OFF';
    button.style.backgroundColor = isSpacingEnabled ? 'green' : 'red';
  }
});
