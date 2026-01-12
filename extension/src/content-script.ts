// Content Script for Personal Website Blocker
// Runs on all web pages to monitor and provide blocking functionality

const BLOCKED_MESSAGE_ID = 'website-blocker-message'
const CHECK_INTERVAL = 2000 // Check every 2 seconds

// Initialize content script
initializeContentScript()

function initializeContentScript() {
  // Check if we're already on a blocked page
  if (window.location.href.includes(chrome.runtime.getURL('src/pages/blocked.html'))) {
    return
  }
  
  // Start monitoring for blocked content
  monitorCurrentSite()
  
  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.isEnabled || changes.blockedSites) {
      monitorCurrentSite()
    }
  })
}

async function monitorCurrentSite() {
  try {
    const result = await chrome.storage.sync.get(['isEnabled', 'blockedSites'])
    
    if (!result.isEnabled) {
      removeBlockedMessage()
      return
    }
    
    const blockedSites: string[] = result.blockedSites || []
    const currentHostname = window.location.hostname
    
    const isBlocked = blockedSites.some(site => 
      currentHostname.includes(site.toLowerCase())
    )
    
    if (isBlocked) {
      showBlockedMessage()
      // Note: The background script handles the actual blocking/redirect
      // This just provides immediate visual feedback
    } else {
      removeBlockedMessage()
    }
  } catch (error) {
    console.error('Content script error:', error)
  }
}

function showBlockedMessage() {
  // Remove existing message if present
  removeBlockedMessage()
  
  const message = document.createElement('div')
  message.id = BLOCKED_MESSAGE_ID
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 2147483647;
    max-width: 300px;
    border: 2px solid #dc2626;
    animation: slideIn 0.3s ease-out;
  `
  
  message.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 16px;">🚫</span>
      <span>This site is blocked by your personal blocklist</span>
    </div>
  `
  
  // Add slideIn animation
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(message)
  
  // Auto-remove after 3 seconds
  setTimeout(() => removeBlockedMessage(), 3000)
}

function removeBlockedMessage() {
  const existingMessage = document.getElementById(BLOCKED_MESSAGE_ID)
  if (existingMessage) {
    existingMessage.remove()
  }
}

// Periodically check the current site (in case of dynamic navigation)
setInterval(monitorCurrentSite, CHECK_INTERVAL)

export {}