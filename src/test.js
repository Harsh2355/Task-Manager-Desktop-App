const axios = require('axios')

const getData = async () => {
    try {
        const response = await axios({
            url:"http://127.0.0.1:3001/users",
            method:'post',
            data: {
                "name":"Rahul Kakar",
                "email":"rahulkakar2003@gmail.com",
                "age": 45,
                "password":"wearesist"
            }
        })
        console.log(response);
    }
    catch (error) {
       console.log(error);
    } 
} 

getData();