# Movie Theaters Management APIs

This is back end API micro-services built on Javacscript and Nodejs's modules including ExpressJS and Prisma.

The service is live with a running MySQL Database server (thanks to Docker and Digital Ocean's virtual machine): [128.199.102.253/api/QuanLyNguoiDung/LayDanhSachNguoiDung](128.199.102.253/api/QuanLyNguoiDung/LayDanhSachNguoiDung)

Video demonstrate APIs usage : https://youtu.be/2mkc9OyU4-w

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

Result: If user is not exist in the database, a new user will be created with their password being encrypted in the database. If you sign in:  
Get http://128.199.102.253:3030/api/QuanLyNguoiDung/DangNhap  
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
- Make a swagger page so users can easily test all apis without PostMan.
- Create a "login with Facebook" button for the swagger



