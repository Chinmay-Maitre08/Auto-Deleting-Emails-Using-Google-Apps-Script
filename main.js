// Auto-Deleting Emails Using Google Apps Script
function deleteOldEmails() {
    try {
      // Define batch size for processing
      var batchSize = 100;
  
      // Function to process threads in batches
      function processThreads(threads) {
        for (var i = 0; i < threads.length; i += batchSize) {
          var batch = threads.slice(i, i + batchSize);
          GmailApp.moveThreadsToTrash(batch);
        }
      }
  
      // Search for all emails in Promotions and Social categories
      var threadsPromotions = GmailApp.search('category:promotions');
      var threadsSocial = GmailApp.search('category:social');
  
      // Search for emails older than 1 week in Primary category
      var threadsPrimary = GmailApp.search('category:primary older_than:7d');
  
      // Move Promotions emails to trash
      processThreads(threadsPromotions);
  
      // Move Social emails to trash
      processThreads(threadsSocial);
  
      // Move Primary emails older than 1 week to trash
      processThreads(threadsPrimary);
  
      Logger.log('Successfully moved ' + 
        (threadsPromotions.length + threadsSocial.length + threadsPrimary.length) + ' threads to trash.');
    } catch (e) {
      Logger.log('Error: ' + e.toString());
      MailApp.sendEmail('your-email@example.com', 'Script Error: deleteOldEmails', e.toString());
    }
  }
  