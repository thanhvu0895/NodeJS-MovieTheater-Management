# Movie Theaters Management APIs

This is back end API micro-services built on Javacscript and Nodejs's modules including ExpressJS and Prisma.

The service is live with a running DataBase server (thanks to Docker and Digital Ocean's virtual machine): 128.199.102.253/api/QuanLyNguoiDung/LayDanhSachNguoiDung)

Video demonstrate APIs usage : https://youtu.be/2mkc9OyU4-w

List of API:

Sign up: 
POST http://128.199.102.253:3030/api/QuanLyNguoiDung/DangKy
Body: 
```
{
    "name": "testuser10", 
    "email": "testthemnguoidung@gmail.com",
    "phone": "0123456789",
    "pass_word": "1234" ,
    "role_id": 3
}
```

USER MANGEMENT API

### Things to improve: 
- Make a swagger page so users can easily test all apis without PostMan.
- Create a "login with Facebook" button for the swagger



