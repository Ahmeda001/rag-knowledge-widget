import { streamChatResponse } from './utils/stream.js';
import styles from './styles/widget.css';

(function () {
  // 1. Get current script tag & data attributes
  const currentScript = document.currentScript || document.querySelector('script[data-workspace-id]');
  const workspaceId = currentScript?.getAttribute('data-workspace-id');
  const apiUrl = currentScript?.getAttribute('data-api-url') || 'http://127.0.0.1:8000';

  if (!workspaceId) {
    console.error('Widget Script Error: Missing data-workspace-id attribute.');
    return;
  }

  // 2. Create host div and attach Shadow DOM
  const host = document.createElement('div');
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: 'open' });

  // 3. Inject CSS
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  shadow.appendChild(styleTag);

  // 4. Inject HTML structure
  const container = document.createElement('div');
  container.className = 'widget-container';
  container.innerHTML = `
    <div class="chat-box" id="chat-box">
      <div class="chat-header">AI Support Assistant</div>
      <div class="chat-messages" id="messages"></div>
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="input" placeholder="Ask a question..." />
        <button class="chat-submit" id="send-btn">Send</button>
      </div>
    </div>
    <div class="chat-bubble" id="bubble">💬</div>
  `;
  shadow.appendChild(container);

  // 5. Query elements inside Shadow DOM
  const bubble = shadow.querySelector('#bubble');
  const chatBox = shadow.querySelector('#chat-box');
  const messages = shadow.querySelector('#messages');
  const input = shadow.querySelector('#input');
  const sendBtn = shadow.querySelector('#send-btn');

  // 6. Toggle Open / Close
  bubble.addEventListener('click', () => {
    chatBox.classList.toggle('open');
  });

  // 7. Send Query & Render Stream
  async function handleSend() {
    const query = input.value.trim();
    if (!query) return;

    input.value = '';

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = query;
    messages.appendChild(userMsg);

    // Append Empty Bot Message Container
    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;

    try {
      await streamChatResponse(apiUrl, workspaceId, query, (token) => {
        botMsg.textContent += token;
        messages.scrollTop = messages.scrollHeight;
      });
    } catch (err) {
      console.error('[widget] Chat error:', err);   // 👈 now prints the real reason
      botMsg.textContent = 'Sorry, an error occurred while generating a response.';
    }
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
})();