// src/utils/stream.js

// export async function streamChatResponse(apiUrl, workspaceId, query, onToken) {
//   const response = await fetch(`${apiUrl}/api/v1/chat/stream`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json', // Required by FastAPI
//     },
//     body: JSON.stringify({
//       workspace_id: workspaceId,
//       query: query,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`);
//   }

//   // Handle stream reading
//   const reader = response.body.getReader();
//   const decoder = new TextDecoder('utf-8');

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
    
//     const token = decoder.decode(value, { stream: true });
//     onToken(token);
//   }
// }


export async function streamChatResponse(apiUrl, workspaceId, query, onToken, onSources) {
  const response = await fetch(`${apiUrl}/api/v1/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workspace_id: workspaceId,
      query: query,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    
    // Normalize newlines and split by SSE block separator
    const blocks = buffer.replace(/\r\n/g, '\n').split('\n\n');
    buffer = blocks.pop() || ''; // Hold remainder in buffer

    for (const block of blocks) {
      const lines = block.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          try {
            const rawData = trimmed.replace(/^data:\s*/, '');
            const payload = JSON.parse(rawData);

            if (payload.type === 'sources' && onSources) {
              onSources(payload.data);
            } else if (payload.type === 'text' && onToken && payload.data) {
              onToken(payload.data);
            }
          } catch (err) {
            console.error('[widget] Error parsing SSE line:', err, trimmed);
          }
        }
      }
    }
  }
}