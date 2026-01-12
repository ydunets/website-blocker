// Service Worker for Chrome Extension Background
// Handles blocking logic, storage management, and communication

chrome.runtime.onInstalled.addListener(() => {
  console.log('Personal Website Blocker installed')
  
  // Initialize default settings
  chrome.storage.sync.set({
    isEnabled: true,
    blockedSites: [],
    totalBlockedToday: 0
  })
})

// Handle tab updates to check for blocked sites
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    await checkAndBlockSite(tab.url, tabId)
  }
})

// Function to check if a site should be blocked
async function checkAndBlockSite(url: string, tabId: number) {
  try {
    const result = await chrome.storage.sync.get(['isEnabled', 'blockedSites'])
    
    if (!result.isEnabled) return
    
    const blockedSites: string[] = result.blockedSites || []
    const hostname = new URL(url).hostname
    
    const isBlocked = blockedSites.some(site => 
      hostname.includes(site.toLowerCase())
    )
    
    if (isBlocked) {
      // Redirect to blocking page
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL('src/pages/blocked.html')
      })
      
      // Update blocked count
      const countResult = await chrome.storage.sync.get(['totalBlockedToday'])
      chrome.storage.sync.set({
        totalBlockedToday: (countResult.totalBlockedToday || 0) + 1
      })
    }
  } catch (error) {
    console.error('Error checking blocked site:', error)
  }
}

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'getBlockedCount':
      chrome.storage.sync.get(['totalBlockedToday']).then(result => {
        sendResponse({ count: result.totalBlockedToday || 0 })
      })
      return true // Keep message channel open for async response
      
    case 'toggleBlocking':
      chrome.storage.sync.get(['isEnabled']).then(result => {
        const newState = !result.isEnabled
        chrome.storage.sync.set({ isEnabled: newState })
        sendResponse({ enabled: newState })
      })
      return true
      
    default:
      sendResponse({ error: 'Unknown action' })
  }
})

export {}