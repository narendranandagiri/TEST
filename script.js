document.getElementById('queryForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const query = document.getElementById('query').value;
  callApi(query)
  .then(data => {
    const generatedText = data[0].generated_text;
    document.getElementById('response').textContent = generatedText;
  })
  .catch(error => {
    document.getElementById('response').textContent = 'Error: ' + error.message;
  });
});
  
// Replace this URL with the chat bot API endpoint
const apiUrl = 'https://api-inference.huggingface.co/models/facebook/blenderbot-1B-distill';
const apiKey = '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'; 


async function callApi(query) {
  const payload = {
    inputs: query
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error('Network response was not ok: ' + JSON.stringify(errorDetails));
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
