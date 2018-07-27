# iotbutton-lambda
An AWS Lambda function that sends an email on the click of an IoT button. 
Read about these great little buttons here: https://aws.amazon.com/iotbutton/

I made a few small changes to the standard AWS IoT Lambda function for SNS found here: https://github.com/aws-samples/aws-lambda-iot-button/blob/master/IoT_Button.js to allow for custom messages for "SINGLE", "DOUBLE" and "LONG" clickTypes using SES. I'm sure other (better!) examples may be found and I didn't run across one that easily worked for a novice programmer with the AWS Simple Email Service (SES). 

1. Log in to AWS Lambda, make a copy of the existing out-of-the-box index.js file associated with your new AWS IoT Button Lambda function.
2. Copy the contents of this index.js to your index.js (you did make that copy, right?) and make changes to the following lines:
   
   const EMAIL_ADDRESS = 'YOUR-EMAIL-ADDRESS'; // change to your email address
   
   const singleClick = 'THE TEXT TO DISPLAY FOR YOUR SINGLE clickType'; //change to your content within single quotes
   
   const doubleClick = 'THE TEXT TO DISPLAY FOR YOUR DOUBLE clickType';  //change to your content within single quotes
   
   const longClick = 'THE TEXT TO DISPLAY FOR YOUR LONG clickType';  //change to your content within single quotes
   
   const subject = 'YOUR-EMAIL-SUBJECT-LINE'; //change to your content within single quotes
   
   const bodyText = 'YOUR BODY TEXT MAY SPAN MULTIPLE LINES AND WILL DISPLAY THE CONTENT FOUND IN THE var nomAlert AND THE const payload FOUND ABOVE. TO DISPLAY THE CONTENT OF nomAlert, USE ${nomAlert} AND TO DISPLAY THE CONTENT OF payload USE ${payload}';  //change to your content within single quotes
 3. Save and test your new Lambda function.
 4. Be joyful!
