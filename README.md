# Auto-Deleting Emails Using Google Apps Script
## Overview

This project provides a Google Apps Script to automate the management of Gmail emails. The script is designed to:

- Delete all emails from the Promotions and Social categories.
- Delete emails older than one week from the Primary category.
- Exclude starred emails and user-defined emails or labels from deletion.

The script runs daily at midnight to keep your inbox clean and organized.

## Features

### Deletes:
- All emails from the Promotions and Social categories.
- Emails older than one week from the Primary category.

### Excludes:
- Starred emails.
- User-defined email addresses and labels.

## Setup Instructions

### 1. Open Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/).
2. Click on `New Project` to create a new script or open an existing one.

### 2. Create and Configure the Script

1. Delete any default code in the script editor.
2. Copy and paste the provided script code into the editor.
3. Replace `'your-email@example.com'` with your actual email address in the `MailApp.sendEmail` function to receive error notifications.
4. Modify the `excludeEmails` and `excludeLabels` arrays with the email addresses and labels you want to exclude from deletion.
5. Save the project with a meaningful name, such as “AutoDeleteEmails”.

### 3. Authorize the Script

1. Click on the play button (triangle icon) in the toolbar to run the script manually.
2. A dialog box will appear asking for authorization. Follow the prompts to grant the necessary permissions to access your Gmail account.

### 4. Set Up a Time-Driven Trigger

1. Click on the clock icon (Triggers) in the toolbar, or go to `Edit` > `Current project's triggers`.
2. Click on `+ Add Trigger` at the bottom right of the Triggers page.
3. Set the following options in the trigger setup form:
   - **Choose which function to run:** `deleteOldEmails`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `Time-driven`
   - **Select type of time-based trigger:** `Day timer`
   - **Select time of day:** `Midnight to 1am`
4. Click “Save”.

### 5. Verify the Trigger

`![image](https://github.com/user-attachments/assets/4d4a2009-352c-4045-962a-9eeaf681a98a).png`

1. Ensure that the trigger is listed on the Triggers page and is correctly configured to run `deleteOldEmails` daily.


## Monitoring and Testing

### 1. Check the Logs

1. Go to `View` > `Logs` in the script editor to see the logs.
2. Review the logs for entries indicating the number of threads moved to Trash or if any errors occurred.

### 2. Verify Deleted Emails

1. Check the Trash folder in your Gmail to ensure that emails from the Promotions and Social categories, as well as emails older than one week from the Primary category, are being deleted as intended.
2. Verify that starred emails and excluded email addresses/labels are preserved.

### 3. Adjust Batch Size (if necessary)

1. If you encounter quota limits or performance issues, adjust the `batchSize` variable in the script to a smaller value.

## Error Handling

- **Script Errors:** If an error occurs, the script logs the error and sends an email notification to the specified address. Check the logs for details.
- **Quota Limits:** Google imposes limits on the number of emails that can be processed. If you encounter quota issues, consider adjusting the batch size or checking your account's usage limits.

## Exclusions Configuration

To ensure that specific emails or labels are not deleted, you can configure user-defined exclusions in the script.

### Updating Exclusions

In the script, update the `excludeEmails` and `excludeLabels` arrays as follows:

```javascript
// User-defined exclusions
var excludeEmails = ['example1@example.com', 'example2@example.com']; // List of email addresses to exclude
var excludeLabels = ['Important', 'Work']; // List of labels to exclude
```

- **`excludeEmails`**: An array of email addresses that should be excluded from deletion.
- **`excludeLabels`**: An array of labels that should be excluded from deletion.

### Example

If you want to exclude emails from `john.doe@example.com` and `jane.smith@example.com`, and keep emails labeled as `Family` or `Project`, configure the arrays as follows:

```javascript
var excludeEmails = ['john.doe@example.com', 'jane.smith@example.com'];
var excludeLabels = ['Family', 'Project'];
```

---

This section provides instructions on how to configure the script to exclude specific email addresses and labels, including an example for clarity.
### SAMPLE OUTPUT 
# UPON CODE EXECUTION
![Alt text]('images\run-script.png')
# OUT PUT FROM THE EMAIL DIFFERENT SECTIONS

## Additional Considerations

- **Testing:** Thoroughly test the script to ensure it behaves as expected before relying on it for regular use.
- **Manual Review:** Periodically review the Trash folder to ensure that only the intended emails are being deleted.
- **Script Limitations:** Be aware of Google’s [quota limits](https://developers.google.com/apps-script/guides/services/quotas) for Gmail and Apps Script.

---

This README file provides a clear and structured guide to setting up, configuring, and using the auto-deleting email script, including important details about handling errors and considering limitations.
