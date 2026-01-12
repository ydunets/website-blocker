import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: "Personal Website Blocker",
  version: "1.0.0",
  description: "Block distracting websites and increase productivity with customizable blocklists and productivity insights.",
  permissions: [
    "activeTab",
    "storage",
    "declarativeNetRequest",
    "tabs",
    "background"
  ],
  host_permissions: [
    "<all_urls>"
  ],
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  action: {
    default_popup: "src/popup.html",
    default_title: "Personal Website Blocker"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content-script.ts"],
      run_at: "document_start"
    }
  ],
  web_accessible_resources: [
    {
      resources: ["src/pages/*"],
      matches: ["<all_urls>"]
    }
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: "block_rules",
        enabled: true,
        path: "rules.json"
      }
    ]
  }
})