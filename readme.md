# Movie Theaters Management APIs

This is back end API micro-services built on JavaScript and Node.js's modules including ExpressJS and Prisma.

![](https://media.npr.org/assets/img/2020/05/05/plazamarqueeduringclosure_custom-965476b67c1a760bdb3e16991ce8d65098605f62-s1100-c50.jpeg)

### Usage

You can use my Swagger UI for API testing: http://178.128.154.4:3030/api-docs

![SWAGGER UI](https://i.imgur.com/nCaadLp.png)

The service is live with a running MySQL Database server (thanks to Docker and Digital Ocean's virtual machine). A sample link to get sample data is: [Get list of movie](http://178.128.154.4:3030/api/movies/getFilms)
  
![Youtube](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube) APIs usage demonstration with POSTMAN: https://youtu.be/2mkc9OyU4-w

### List of API:  

1. USER MANGEMENT API  
  
For example, with Signing Up:  
POST http://178.128.154.4:3030/api/users/signup
Request Body: 
```
{
    "name": "testuser10", 
    "email": "testadduser@gmail.com",
    "phone": "0123456789",
    "pass_word": "1234" ,
    "role_id": 3
}
```
  
Result: If user is not exist in the database, a new user will be created with their password being encrypted in the database.  
  
  
If you sign in:  
GET http://178.128.154.4:3030/api/users/signin
Request body: 
```
{
    "email": "testadduser@gmail.com",
    "passWord": "1234"
}
```

Result: if the user exist in database, you will sign in successfully. A new token will be generated for that user to perform activities like deleting, modifying the data.
  
2. Film Management  
    
After signing in, you will be able to delete, update, or add more films of your choice. You can also view list of films divided by page number, and film related to theaters. You are also able to upload images as film's poster and save those images in the database

3. Ticket Management:  

Users can generate film tickets for customers, or create a showtime for the theater.  
  
4. Theater Management:  
  
Users can add theaters and their banner through the database. Those information will be saved to the database.
  
### Idea for this project:  
- Create a "login with Facebook" function
