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

    // Exclusions
    var excludeEmails = ['example1@example.com', 'example2@example.com']; // List of email addresses to exclude
    var excludeLabels = ['Important', 'Work']; // List of labels to exclude

    // Function to filter out excluded emails and labels
    function filterExclusions(threads) {
      return threads.filter(thread => {
        var messages = thread.getMessages();
        return messages.every(message => {
          var fromAddress = message.getFrom();
          var labels = message.getLabels().map(label => label.getName());
          var isExcluded = excludeEmails.some(email => fromAddress.includes(email)) || excludeLabels.some(label => labels.includes(label));
          return !isExcluded && !message.isStarred();
        });
      });
    }

    // Apply filters
    threadsPromotions = filterExclusions(threadsPromotions);
    threadsSocial = filterExclusions(threadsSocial);
    threadsPrimary = filterExclusions(threadsPrimary);

    // Move emails to trash
    processThreads(threadsPromotions);
    processThreads(threadsSocial);
    processThreads(threadsPrimary);

    Logger.log('Successfully moved ' + 
      (threadsPromotions.length + threadsSocial.length + threadsPrimary.length) + ' threads to trash.');

    // Set up a trigger to empty trash in 10 minutes
    ScriptApp.newTrigger('emptyTrash')
      .timeBased()
      .after(10 * 60 * 1000) // 10 minutes in milliseconds
      .create();
    
    Logger.log('Trigger for emptyTrash set to run in 10 minutes.');

  } catch (e) {
    Logger.log('Error: ' + e.toString());
    MailApp.sendEmail('your-email@example.com', 'Script Error: deleteOldEmails', e.toString());
  }
}

function emptyTrash() {
  try {
    var threads = GmailApp.getTrashThreads();
    for (var i = 0; i < threads.length; i += 100) {
      var batch = threads.slice(i, i + 100);
      GmailApp.deleteThreads(batch);
    }
    Logger.log('Successfully emptied trash.');
  } catch (e) {
    Logger.log('Error: ' + e.toString());
    MailApp.sendEmail('your-email@example.com', 'Script Error: emptyTrash', e.toString());
  }
}
