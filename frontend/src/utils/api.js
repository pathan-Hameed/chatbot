/**
 * Simulates an AI response with a 1.5s delay
 * @param {Array} messages - Chat history
 * @returns {Promise<string>} AI response
 */
export async function getAIResponse(messages) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return dummy response
  const responses = [
    "That's an interesting question! I'm here to help you explore ideas and answer questions on a wide range of topics.",
    "I can help you with that. Could you provide a bit more detail about what you're looking for?",
    "Great question! Here are a few things to consider:\n\n1. **First point** - This is important\n2. **Second point** - Also relevant\n3. **Third point** - Worth thinking about\n\nWould you like me to dive deeper into any of these?",
    "I understand. Let me break that down for you in a few steps:\n\n```javascript\nconst example = () => {\n  return 'This is a code example';\n};\n```\n\nThis demonstrates the basic structure.",
    "That's a thoughtful question. The answer depends on several factors, but generally speaking, it's important to consider both the context and the specific use case you're dealing with.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Future implementation example for real API integration:
 *
 * export async function getAIResponse(messages, onChunk) {
 *   const response = await fetch('YOUR_API_ENDPOINT', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${YOUR_API_KEY}`
 *     },
 *     body: JSON.stringify({ messages })
 *   });
 *
 *   if (!response.ok) throw new Error(`API error: ${response.status}`);
 *
 *   // For streaming responses:
 *   const reader = response.body.getReader();
 *   const decoder = new TextDecoder();
 *   let text = '';
 *
 *   while (true) {
 *     const { done, value } = await reader.read();
 *     if (done) break;
 *     const chunk = decoder.decode(value);
 *     text += chunk;
 *     if (onChunk) onChunk(chunk);
 *   }
 *
 *   return text;
 * }
 */
