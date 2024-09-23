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
    });
  });
});

// Function to update the icon
function updateIcon(enabled) {
  const iconPath = enabled ? 'icon32-on.png' : 'icon32-off.png';
  chrome.action.setIcon({ path: iconPath });
}
