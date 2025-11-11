# 🧠 YUSUFGRAM

A social media app allowing users to register, log in, share images with captions, interact via likes and comments, and personalize their profile with a picture and bio.

---

## ⚙️ Technologies

- **NestJS** → Backend framework  
- **Express** → HTTP server (used under NestJS)  
- **MySQL** → Database  
- **TypeORM** → ORM (between NestJS and database)  
- **dotenv** → Environment variable management  
- **bcrypt** → Password hashing  
- **jsonwebtoken (JWT)** → Authentication / token management  
- **class-validator** → DTO validation  
- **class-transformer** → DTO and entity transformation  

---

## 🧩 ENTITIES

### **User**
| Field | Type | Description |
|-------|------|-------------|
| userId | Generated primary key |  |
| username | string |  |
| password | string |  |
| email | string |  |
| DateOfBirth | date |  |
| Gender | string |  |
| profilePicture | Optional default |  |
| Bio | Optional string |  |
| createdAt | datetime |  |
| updatedAt | datetime |  |

---

### **Post**
| Field | Type | Description |
|-------|------|-------------|
| postId | Generated primary key |  |
| userId | foreign key |  |
| imageUrl | string |  |
| caption | string |  |
| createdAt | datetime |  |
| updatedAt | datetime |  |

---

### **Comment**
| Field | Type | Description |
|-------|------|-------------|
| commentId | Generated primary key |  |
| postId | foreign key |  |
| userId | foreign key |  |
| content | string |  |
| createdAt | datetime |  |
| updatedAt | datetime |  |

---

### **Like**
| Field | Type | Description |
|-------|------|-------------|
| likeId | Generated primary key |  |
| postId | foreign key |  |
| userId | foreign key |  |
| createdAt | datetime |  |
| updatedAt | datetime |  |

---

### **Category**
| Field | Type | Description |
|-------|------|-------------|
| categoryId | Generated primary key |  |
| updatedAt | datetime |  |

---

### **PostCategory**
| Field | Type | Description |
|-------|------|-------------|
| postId | primary key, foreign key |  |
| categoryId | primary key, foreign key |  |
| updatedAt | datetime |  |

---

## 🚀 ENDPOINTS

### **AUTH**

#### DTOs

**LoginRequestDto:**
- Username  
- Password  

**LoginResponseDto:**
- Token (string)  
- Message (string)  

**RegisterRequestDto:**
- Username  
- Password  
- E-mail  
- DateOfBirth  
- Gender  

**RequestResponseDto:**
- Token (string)  
- Message (string)  

#### Routes

`POST /auth/login`  
**Request:** `LoginDto`  
**Response:** token, "User logined successfully"

`POST /auth/register`  
**Request:** `RegisterDto`  
**Response:** token, "User registered successfully"

---

### **USER**

**UserDataResponseDto:**  
userId, username, password, email, DateOfBirth, Gender, profilePicture, Bio  

**UserMessageResponseDto:**  
Message (string)  

**UserUpdateRequestDto:**  
- Username?  
- Bio?  
- profilePicture?  

**UserPasswordUpdateRequestDto:**  
- oldPassword  
- newPassword  

#### Routes

`GET /user/:userId` → `UserDataResponseDto`  
`GET /user/:username` → `UserDataResponseDto`  
`DELETE /user/:userId` → `UserMessageResponseDto`  
`PUT /user/:userId` → `UserUpdateRequestDto` → `UserMessageResponseDto`  
`PUT /user/changePassword/:userId` → `UserPasswordUpdateRequestDto` → `UserMessageResponseDto`

---

### **POST**

**PostRequestDto:**  
- imageUrl  
- caption?  

**PostResponseMessageDto:**  
- Message (string)  

**GetPostResponseDto:**  
- postId, userId, imageUrl, caption, createdAt, updatedAt  

**PostUpdateRequestDto:**  
- imageUrl?  
- caption?  

#### Routes

`GET /posts/:postId` → `GetPostResponseDto`  
`GET /posts` → `GetPostResponseDto`  
`POST /posts` → `PostRequestDto` → `PostResponseMessageDto`  
`GET /posts/:userId/posts` → `GetPostResponseDto`  
`PUT /posts/:postId` → `PostUpdateRequestDto` → `PostResponseMessageDto`  
`DELETE /posts/:postId` → `PostResponseMessageDto`  
`GET /posts/feed` → `GetPostResponseDto`

---

### **LIKE**

**likeResponseMessageDto:**  
- Message (string)  

**likeResponseDto:**  
- likeId  
- postId  
- userId  
- createdAt  
- updatedAt  

#### Routes

`POST /posts/:postId/like` → `likeResponseMessageDto`  
`DELETE /posts/:postId/like` → `likeResponseMessageDto`  
`GET /posts/:postId/likes` → `likeResponseDto`

---

### **COMMENTS**

**PostCommentRequestDto:**  
- Content  

**PostCommentResponseDto:**  
- Message (string)  

**GetCommentResponseDto:**  
- commentId  
- postId  
- userId  
- content  
- createdAt  
- updatedAt  

**UpdateCommentRequestDto:**  
- Content?  

#### Routes

`POST /posts/:postID/comments` → `PostCommentRequestDto` → `PostCommentResponseDto`  
`GET /posts/:postId/comments` → `GetCommentResponseDto`  
`PUT /posts/:postID/:commentId` → `UpdateCommentRequestDto` → `PostCommentResponseDto`  
`DELETE /comments/:commentId` → `PostCommentResponseDto`

---

## 🧱 MIDDLEWARES

- **TokenCheck**

---

## 🧰 UTILS

- **generateJwtToken**  
- **hashPassword**  
- **comparePassword**

---
