import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

let chatgptWindow: WebviewWindow | null = null;
let deepseekWindow: WebviewWindow | null = null;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("chatgpt-btn")?.addEventListener("click", openChatGPT);
  document.getElementById("deepseek-btn")?.addEventListener("click", openDeepSeek);
});

function createWindow(label: string, url: string): WebviewWindow {
  const win = new WebviewWindow(label, { url });
  win.once("tauri://created", () => {});
  win.once("tauri://error", () => {
    if (label === "chatgpt") chatgptWindow = null;
    else deepseekWindow = null;
  });
  return win;
}

async function openChatGPT() {
  if (!chatgptWindow) {
    chatgptWindow = createWindow("chatgpt", "https://chat.openai.com");
  } else {
    try {
      await chatgptWindow.show();
      await chatgptWindow.setFocus();
    } catch {
      chatgptWindow = createWindow("chatgpt", "https://chat.openai.com");
    }
  }
}

async function openDeepSeek() {
  if (!deepseekWindow) {
    deepseekWindow = createWindow("deepseek", "https://chat.deepseek.com");
  } else {
    try {
      await deepseekWindow.show();
      await deepseekWindow.setFocus();
    } catch {
      deepseekWindow = createWindow("deepseek", "https://chat.deepseek.com");
    }
  }
}
