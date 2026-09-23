/**
 * Google Apps Script RSVP receiver.
 *
 * Create a private Google Sheet, open Extensions > Apps Script, paste this file,
 * replace the spreadsheet ID, and deploy it as a Web app. See README.md.
 */
const SPREADSHEET_ID = "REPLACE_WITH_YOUR_PRIVATE_GOOGLE_SHEET_ID";
const SHEET_NAME = "RSVPs";

function doPost(event) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" was not found.`);
  }

  sheet.appendRow([
    new Date(),
    event.parameter.meetup || "",
    event.parameter.coffee || "",
    event.parameter.comment || "",
    event.parameter.submittedAt || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
