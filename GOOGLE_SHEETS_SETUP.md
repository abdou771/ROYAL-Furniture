# Google Sheets Setup for Order Form

Follow these steps once to connect your order form to Google Sheets.

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet.
2. Name it: **طلبات البيت الملكي**
3. In row 1, add these headers (one per column):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| التاريخ والوقت | اسم الزبون | الهاتف | العنوان | المنتج | الكمية | تاريخ التسليم | ملاحظات | الحالة |

## Step 2 — Add the Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.dateTime,
      data.customerName,
      data.phone,
      data.address,
      data.product,
      data.quantity,
      data.deliveryDate,
      data.notes,
      data.status
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Royal Home Orders API is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (Ctrl+S), name it "Royal Orders"

## Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Set:
   - **Description**: Royal Home Orders
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize when prompted (click "Allow")
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 4 — Add to your app

In Replit, open the **Secrets** panel and add:

- **Key**: `VITE_GOOGLE_SHEETS_URL`
- **Value**: *(paste the Web App URL from step 3)*

Then restart the Royal store workflow. Orders will now appear in your sheet instantly!

---

**Note**: If `VITE_GOOGLE_SHEETS_URL` is not set, the form automatically falls back to sending the order via WhatsApp.
