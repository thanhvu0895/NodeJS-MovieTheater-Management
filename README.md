# Movie Theaters Management APIs

This is back end API micro-services built on Javacscript and Nodejs's modules including ExpressJS and Prisma.

![](https://media.npr.org/assets/img/2020/05/05/plazamarqueeduringclosure_custom-965476b67c1a760bdb3e16991ce8d65098605f62-s1100-c50.jpeg)




### Usage

The service is live with a running MySQL Database server (thanks to Docker and Digital Ocean's virtual machine). A sample link to get sample data is: [Get list of movie](http://128.199.102.253:3030/api/QuanLyPhim/LayDanhSachPhim)

I also create this Swagger for API documentation and testing: https://movienew.cybersoft.edu.vn/swagger/index.html

Bearer Token for testing with the swagger: 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjMiLCJIZXRIYW5TdHJpbmciOiIyNC8wMS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzQ1MTg0MDAwMDAiLCJuYmYiOjE2NTc2NDUyMDAsImV4cCI6MTY3NDY2NjAwMH0.tMpP9vQGyw0easJhkJFDbghtZNpnB7aQjlSyjqVoNRI
```

Login Info:

```
username: abc123
password: 123456789
```

![Youtube](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube) APIs usage demonstration with POSTMAN: https://youtu.be/2mkc9OyU4-w

### List of API:  

1. USER MANGEMENT API  

For example, with Signing Up:  
POST http://128.199.102.253:3030/api/QuanLyNguoiDung/DangKy  
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
GET http://128.199.102.253:3030/api/QuanLyNguoiDung/DangNhap  
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

3. Ticket management:

sers can generate film tickets for customers, or create a showtime for the theater.  


### Idea for this project: 
- Create a "login with Facebook" button for the swagger



