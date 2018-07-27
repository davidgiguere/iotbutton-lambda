/**
 * This is a sample Lambda function that sends an email on click of a
 * button. It requires these SES permissions.
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:GetIdentityVerificationAttributes",
                "ses:SendEmail",
                "ses:VerifyEmailIdentity"
            ],
            "Resource": "*"
        }
    ]
}
 *
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */
 
'use strict';

const AWS = require('aws-sdk');

const SES = new AWS.SES();
const EMAIL_ADDRESS = 'YOUR-EMAIL-ADDRESS'; // change to your email address

// Send a verification email to the given email address.
function sendVerification(email, callback) {
    SES.verifyEmailIdentity({ EmailAddress: email }, (err) => {
        callback(err || 'Verification email sent. Please verify it.');
    });
}

// Check whether email is verified. Only verified emails are allowed to send emails to or from.
function checkEmail(email, callback) {
    SES.getIdentityVerificationAttributes({ Identities: [email] }, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        const attributes = data.VerificationAttributes;
        if (!(email in attributes) || attributes[email].VerificationStatus !== 'Success') {
            sendVerification(email, callback);
        } else {
            callback(err, data);
        }
    });
}

exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);

    checkEmail(EMAIL_ADDRESS, (err) => {
        if (err) {
            console.log(`Failed to check email: ${EMAIL_ADDRESS}`, err);
            callback(err);
            return;
        }
        
        const singleClick = 'THE TEXT TO DISPLAY FOR YOUR SINGLE clickType'; //change to your content within single quotes
        const doubleClick = 'THE TEXT TO DISPLAY FOR YOUR DOUBLE clickType';  //change to your content within single quotes
        const longClick = 'THE TEXT TO DISPLAY FOR YOUR LONG clickType';  //change to your content within single quotes
        const payload = JSON.stringify(event);  //look at the top to see what is sent in the payload
        var nomAlert = singleClick;
        if(event.clickType == "DOUBLE"){
        nomAlert = doubleClick;
        }
        if(event.clickType == "LONG"){
        nomAlert = longClick;
        }
        //const payload = (event.clickType);
        const subject = `YOUR-EMAIL-SUBJECT-LINE`; //change to your content within single quotes
        const bodyText = `YOUR BODY TEXT MAY SPAN MULTIPLE LINES AND WILL DISPLAY THE
CONTENT FOUND IN THE var nomAlert AND THE const payload FOUND ABOVE. TO DISPLAY THE CONTENT 
OF nomAlert, USE ${nomAlert} AND TO DISPLAY THE CONTENT OF payload USE ${payload}`;  //change to your content within single quotes
        const params = {
            Source: EMAIL_ADDRESS,
            Destination: { ToAddresses: [EMAIL_ADDRESS] },
            Message: { Subject: { Data: subject }, Body: { Text: { Data: bodyText } } },
        };
        SES.sendEmail(params, callback);
    });
};
