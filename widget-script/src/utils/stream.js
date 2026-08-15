export async function streamChatResponse(apiUrl, workspaceId, query, onToken) {
  const url = `${apiUrl}/api/v1/chat/stream`;
  console.log('[widget] Calling:', url);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ workspace_id: workspaceId, query }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('[widget] HTTP', response.status, text);
    throw new Error(`HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onToken(decoder.decode(value, { stream: true }));
  }
}

// export async function streamChatResponse(apiUrl, workspaceId, query, onToken) {
//   // 1. Format URL with query parameters for the GET request
//   const params = new URLSearchParams({ 
//     workspace_id: workspaceId, 
//     query: query 
//   });
//   const url = `${apiUrl}/api/v1/chat?${params.toString()}`;

//   // 2. Change to GET request
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: { 'Accept': 'text/event-stream' }
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch response: ${response.statusText}`);
//   }

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder();

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     const token = decoder.decode(value, { stream: true });
//     onToken(token);
//   }
// }