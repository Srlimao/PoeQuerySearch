document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('showUrlButton').addEventListener('click', function () {
      // Get the active tab's information
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0].url;
  
        generateQueryURL(currentUrl)
            .then(finalUrl => {
                navigator.clipboard.writeText(finalUrl);
            })
      });
    });
  });
  

  function generateQueryURL(url) {
    const currentUrl = url;
    const modifiedUrl = currentUrl.replace('www.pathofexile.com', 'www.pathofexile.com/api');
    return fetch(modifiedUrl)
      .then(response => response.json())
      .then(data => {
        delete data.id;
        const dataText = JSON.stringify(data);
        const replacedDataText = dataText.replace(/"/g, '%22');
        const finalUrl = 'https://www.pathofexile.com/trade/search/Crucible?q=' + replacedDataText;
        return finalUrl;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }