// service.js
const { google } = require('googleapis');
const path = require('path');

const getDriveService = () => {
    try{
        const KEYFILEPATH = path.join(__dirname,'../service.json');
        const SCOPES = ['https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly'];
        const auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
        const driveService = google.drive({ version: 'v3', auth });
        return driveService;
    }catch(err){
            throw err
        }
  
};


module.exports = getDriveService;