// Initialize the state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: false }, () => {
    updateIcon(false); // Set initial state to 'off'
  });
});

// Handle icon click
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get('enabled', (data) => {
    const isEnabled = !data.enabled; // Toggle the state
    chrome.storage.local.set({ enabled: isEnabled }, () => {
      updateIcon(isEnabled); // Update the icon based on the new state
      handleToggleAction(isEnabled); // Reload or run code based on toggle state
    });
  });
});

// Function to update the icon
function updateIcon(enabled) {
  const iconPath = enabled ? 'icon32-on.png' : 'icon32-off.png';
  chrome.action.setIcon({ path: iconPath });
}

// Function to reload page (if off) or run code (if on)
function handleToggleAction(enabled) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    
    if (!enabled) {
      // Reload the current page
      chrome.tabs.reload(tabId);
    } else {
      // Inject content script or execute your code
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['contentScripts.js'] // Assuming your code is in 'content.js'
      });
    }
  });
}
