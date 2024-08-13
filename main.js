function deleteOldEmails() {
    try {
      // Define batch size for processing
      var batchSize = 100;
      
      // User-defined exclusions
      var excludeEmails = ['example1@example.com', 'example2@example.com']; // List of email addresses to exclude
      var excludeLabels = ['Important', 'Work']; // List of labels to exclude
  
      // Function to process threads in batches
      function processThreads(threads) {
        for (var i = 0; i < threads.length; i += batchSize) {
          var batch = threads.slice(i, i + batchSize);
          GmailApp.moveThreadsToTrash(batch);
        }
      }
  
      // Function to filter out threads based on user-defined exclusions
      function filterThreads(threads) {
        return threads.filter(function(thread) {
          var messages = thread.getMessages();
          return !messages.some(function(message) {
            // Check if the email is in the exclude list
            if (excludeEmails.includes(message.getFrom())) {
              return true;
            }
            // Check if the thread has any labels in the exclude list
            var labels = thread.getLabels();
            return labels.some(function(label) {
              return excludeLabels.includes(label.getName());
            });
          });
        });
      }
  
      // Search for all emails in Promotions and Social categories, excluding starred emails
      var threadsPromotions = GmailApp.search('category:promotions -is:starred');
      var threadsSocial = GmailApp.search('category:social -is:starred');
  
      // Search for emails older than 1 week in Primary category, excluding starred emails
      var threadsPrimary = GmailApp.search('category:primary older_than:7d -is:starred');
  
      // Filter out excluded threads
      threadsPromotions = filterThreads(threadsPromotions);
      threadsSocial = filterThreads(threadsSocial);
      threadsPrimary = filterThreads(threadsPrimary);
  
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
  