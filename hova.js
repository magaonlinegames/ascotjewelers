

function GET_VISITOR_INFO(){
    // This code retrieves the IP address of the user's device
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
    const ipAddress = data.ip;
    console.log('IP Address:', ipAddress);
    console.log('IP data:', data);
    // You can now use the IP address as needed
    })
    .catch(error => {
    console.error('Error:', error);
    });

}