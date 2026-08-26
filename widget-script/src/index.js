// import { streamChatResponse } from './utils/stream.js';
// import styles from './styles/widget.css';

// (function () {
//   // 1. Get current script tag & data attributes
//   const currentScript = document.currentScript || document.querySelector('script[data-workspace-id]');
//   const workspaceId = currentScript?.getAttribute('data-workspace-id');
//   const apiUrl = currentScript?.getAttribute('data-api-url') || 'http://127.0.0.1:8000';

//   if (!workspaceId) {
//     console.error('Widget Script Error: Missing data-workspace-id attribute.');
//     return;
//   }

//   // 2. Create host div and attach Shadow DOM
//   const host = document.createElement('div');
//   document.body.appendChild(host);
//   const shadow = host.attachShadow({ mode: 'open' });

//   // 3. Inject CSS
//   const styleTag = document.createElement('style');
//   styleTag.textContent = styles;
//   shadow.appendChild(styleTag);

//   // 4. Inject HTML structure
//   const container = document.createElement('div');
//   container.className = 'widget-container';
//   container.innerHTML = `
//     <div class="chat-box" id="chat-box">
//       <div class="chat-header">AI Support Assistant</div>
//       <div class="chat-messages" id="messages"></div>
//       <div class="chat-input-area">
//         <input type="text" class="chat-input" id="input" placeholder="Ask a question..." />
//         <button class="chat-submit" id="send-btn">Send</button>
//       </div>
//     </div>
//     <div class="chat-bubble" id="bubble">💬</div>
//   `;
//   shadow.appendChild(container);

//   // 5. Query elements inside Shadow DOM
//   const bubble = shadow.querySelector('#bubble');
//   const chatBox = shadow.querySelector('#chat-box');
//   const messages = shadow.querySelector('#messages');
//   const input = shadow.querySelector('#input');
//   const sendBtn = shadow.querySelector('#send-btn');

//   // 6. Toggle Open / Close
//   bubble.addEventListener('click', () => {
//     chatBox.classList.toggle('open');
//   });

//   // 7. Send Query & Render Stream
//   async function handleSend() {
//     const query = input.value.trim();
//     if (!query) return;

//     input.value = '';

//     // Append User Message
//     const userMsg = document.createElement('div');
//     userMsg.className = 'msg user';
//     userMsg.textContent = query;
//     messages.appendChild(userMsg);

//     // Append Empty Bot Message Container
//     const botMsg = document.createElement('div');
//     botMsg.className = 'msg bot';
//     messages.appendChild(botMsg);
//     messages.scrollTop = messages.scrollHeight;

//     try {
//       await streamChatResponse(apiUrl, workspaceId, query, (token) => {
//         botMsg.textContent += token;
//         messages.scrollTop = messages.scrollHeight;
//       });
//     } catch (err) {
//       console.error('[widget] Chat error:', err);   // 👈 now prints the real reason
//       botMsg.textContent = 'Sorry, an error occurred while generating a response.';
//     }
//   }

//   sendBtn.addEventListener('click', handleSend);
//   input.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') handleSend();
//   });
// })();




// import cssContent from './styles/widget.css';
// import { streamChatResponse } from './utils/stream.js';


// (function () {
//   const currentScript = document.currentScript || document.querySelector('script[data-workspace-id]');
//   const workspaceId = currentScript?.getAttribute('data-workspace-id');
//   const apiUrl = currentScript?.getAttribute('data-api-url') || 'http://127.0.0.1:8000';

//   if (!workspaceId) {
//     console.error('Widget Script Error: Missing data-workspace-id attribute.');
//     return;
//   }

//   const host = document.createElement('div');
//   document.body.appendChild(host);

//   const shadow = host.attachShadow({ mode: 'open' });

//   // Inject raw CSS string into Shadow DOM
//   const styleTag = document.createElement('style');
//   styleTag.textContent = cssContent;
//   shadow.appendChild(styleTag);

//   const container = document.createElement('div');
//   container.className = 'widget-container';
//   container.innerHTML = `
//     <div class="chat-box" id="chat-box">
//       <div class="chat-header">AI Support Assistant</div>
//       <div class="chat-messages" id="messages"></div>
//       <div class="chat-input-area">
//         <input type="text" class="chat-input" id="input" placeholder="Ask a question..." />
//         <button class="chat-submit" id="send-btn">Send</button>
//       </div>
//     </div>
//     <div class="chat-bubble" id="bubble">💬</div>
//   `;
//   shadow.appendChild(container);

//   const bubble = shadow.querySelector('#bubble');
//   const chatBox = shadow.querySelector('#chat-box');
//   const messages = shadow.querySelector('#messages');
//   const input = shadow.querySelector('#input');
//   const sendBtn = shadow.querySelector('#send-btn');

//   bubble.addEventListener('click', () => {
//     chatBox.classList.toggle('open');
//   });

//   async function handleSend() {
//     const query = input.value.trim();
//     if (!query) return;

//     input.value = '';
    
//     const userMsg = document.createElement('div');
//     userMsg.className = 'msg user';
//     userMsg.textContent = query;
//     messages.appendChild(userMsg);

//     const botMsg = document.createElement('div');
//     botMsg.className = 'msg bot';
//     messages.appendChild(botMsg);
//     messages.scrollTop = messages.scrollHeight;

//     try {
//       await streamChatResponse(apiUrl, workspaceId, query, (chunk) => {
//         botMsg.textContent += chunk;
//         messages.scrollTop = messages.scrollHeight;
//       });
//     } catch (err) {
//       console.error('[widget] Chat error:', err);
//       botMsg.textContent = 'Sorry, an error occurred while generating a response.';
//     }
//   }

//   sendBtn.addEventListener('click', handleSend);
//   input.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') handleSend();
//   });
// })();



import cssContent from './styles/widget.css';
import { streamChatResponse } from './utils/stream.js';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true,
});

(function () {
  const currentScript = document.currentScript || document.querySelector('script[data-workspace-id]');
  const workspaceId = currentScript?.getAttribute('data-workspace-id');
  const apiUrl = currentScript?.getAttribute('data-api-url') || 'http://127.0.0.1:8000';

  if (!workspaceId) {
    console.error('Widget Script Error: Missing data-workspace-id attribute.');
    return;
  }

  const host = document.createElement('div');
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // Inject raw CSS string into Shadow DOM
  const styleTag = document.createElement('style');
  styleTag.textContent = cssContent;
  shadow.appendChild(styleTag);

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

  const bubble = shadow.querySelector('#bubble');
  const chatBox = shadow.querySelector('#chat-box');
  const messages = shadow.querySelector('#messages');
  const input = shadow.querySelector('#input');
  const sendBtn = shadow.querySelector('#send-btn');

  bubble.addEventListener('click', () => {
    chatBox.classList.toggle('open');
  });

  async function handleSend() {
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    
    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = query;
    messages.appendChild(userMsg);

    // Create Bot Wrapper container
    const botWrapper = document.createElement('div');
    botWrapper.className = 'bot-msg-wrapper';

    // Create Typing Indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
    botWrapper.appendChild(typingIndicator);

    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.style.display = 'none';

    const sourcesContainer = document.createElement('div');
    sourcesContainer.className = 'sources-container';

    botWrapper.appendChild(botMsg);
    botWrapper.appendChild(sourcesContainer);
    messages.appendChild(botWrapper);
    messages.scrollTop = messages.scrollHeight;

    let fullMarkdownText = '';
    let fetchedSources = []; // Store sources in memory until response finishes

    try {
      await streamChatResponse(
        apiUrl, 
        workspaceId, 
        query, 
        // 1. Token Callback
        async (chunk) => {
          if (typingIndicator.parentNode) {
            typingIndicator.remove();
          }

          if (botMsg.style.display === 'none') {
            botMsg.style.display = 'block';
          }

          fullMarkdownText += chunk;
          const parsedHtml = await marked.parse(fullMarkdownText);
          botMsg.innerHTML = parsedHtml;
          messages.scrollTop = messages.scrollHeight;
        },
        // 2. Sources Callback: Save sources array without rendering yet
        (sources) => {
          fetchedSources = sources || [];
        }
      );

      // Render sources only AFTER response generation completes
      if (fetchedSources.length > 0) {
        sourcesContainer.innerHTML = '';
        fetchedSources.forEach((src) => {
          const pill = document.createElement('div');
          pill.className = 'source-pill';
          pill.innerHTML = `
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span>Source: ${src.label}</span>
          `;
          sourcesContainer.appendChild(pill);
        });
        messages.scrollTop = messages.scrollHeight;
      }

    } catch (err) {
      console.error('[widget] Chat error:', err);
      if (typingIndicator.parentNode) typingIndicator.remove();
      botMsg.style.display = 'block';
      botMsg.textContent = 'Sorry, an error occurred while generating a response.';
    }
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
})();