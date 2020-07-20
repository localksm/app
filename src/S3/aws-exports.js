import Amplify from 'aws-amplify';

const awsconfig = Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:ac81512a-5835-4d71-87c3-bda08ce50471', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1'        
    },
    Storage: {
        AWSS3: {
            bucket: 'kusamaappdev', //REQUIRED -  Amazon S3 bucket
            region: 'us-east-1', //OPTIONAL -  Amazon service region
        }
    }
});


export default awsconfig;