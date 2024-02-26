// Function to bold words based on specified criteria
function boldWords() {
  chrome.storage.sync.get('isEnabled', ({ isEnabled }) => {
    if (isEnabled === true) {
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
        const words = paragraph.textContent.split(/\s+/);
        const boldedWords = words.map(word => {
          if (word.length === 1) {
            return `<span style="font-weight: bold;">${word}</span>`;
          } else {
            const halfLength = Math.ceil(word.length / 2);
            return `<span style="font-weight: bold;">${word.substring(0, halfLength)}</span>` + word.substring(halfLength); // bolds first half of word
          }
        });
        paragraph.innerHTML = boldedWords.join(' ');
      });
    }
  });
}
// function that changes the font style
function changeFont() {
  chrome.storage.sync.get('isFontEnabled', ({ isFontEnabled }) => {
    if (isFontEnabled === true) {
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
        paragraph.style.fontFamily = 'Lucida Console, Courier New, monospace';
      })
    }
  });
}
// function that changes the spacing (line height) and font size
function addSpacing() {
  chrome.storage.sync.get('isSpacingEnabled', ({ isSpacingEnabled }) => {
    if (isSpacingEnabled === true) {
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
        paragraph.style.lineHeight = '80px';
        paragraph.style.fontSize = '25px';
      });
    }
  });
}


// Apply bolding/font changing logic when the page is fully loaded
document.addEventListener('DOMContentLoaded', boldWords);
document.addEventListener('DOMContentLoaded', changeFont)
document.addEventListener('DOMContentLoaded', addSpacing)

// Listen for messages from the background script to toggle extension state
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_STATE") {
    boldWords(); // Reapply bolding based on the new state
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_FONT") {
    changeFont();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_SPACING") {
    addSpacing();
  }
});




