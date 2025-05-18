# Notification Service 

This is a simple Node.js-based Notification Service that supports sending notifications via **Email**, **SMS**, and **In-App** messages.

## Features

- Send Email notifications using **Nodemailer**
- Send SMS notifications using **Vonage**
- Store in-app notifications in memory for each user
- Auto-generate a unique `userId` for each notification
- Expose REST API endpoints for sending and retrieving notifications

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aayushj19/notification-generator.git
cd notification-generator
```
---

### 2. Install Dependencies 
```bash
npm install
```
### 3. Configure Environment Variables 
Create a .env file in the root directory and add the following:
```
PORT=5000
VONAGE_API_KEY= your_key
VONAGE_API_SECRET= your_secret
EMAIL_ID = your_email@gmail.com
EMAIL_app_PASS= your_email_password
```
### 4.Start the server
```bash
node index.js
```

## API Endpoints

Use Postman or another tool for API testing

 ### Send a Notification
Method: POST
Body (raw JSON):
```bash
URL: http://localhost:5000/notifications
```
### Request Body
```
json
Copy
Edit
{
  "type": "gmail",           // Options: "gmail", "sms", "in-app"
  "title": "Hello!",
  "message": "This is a test notification.",
  "recipient": "example@gmail.com" // or phone number for SMS
}
```
### Sample Response

```
{
  "success": true,
  "message": "Notification sent",
  "id": "b726cfd4-0fd4-4c50-a1ae-5413a6e0b1fa"
}
```
## Retrieve Notifications
METHOD: GET
```bash
GET http://localhost:5000/users/:id/notifications
```
Replace :id with the UUID returned from the POST request.

### Response 
```
json
[
  {
    "title": "Hello!",
    "message": "This is a test notification."
  }
]
```
## Assumptions Made
- In-app notifications are stored in memory using a JavaScript object.
- Unique userId is auto-generated on each request using uuid.
- For simplicity, notifications are not persisted in any external database.
- Email and SMS credentials (like Gmail password or Vonage API keys) are hardcoded for demo purposes. Use environment variables in production.

## Dependencies
- Express - Web framework
- nodemailer - Email service
- @vonage/server-sdk - SMS service
- uuid - Unique ID generator
- body-parser - Middleware for request parsing
- dotenv - Load environment variables

## Author
Developed by Aayush (https://github.com/aayushj19)
