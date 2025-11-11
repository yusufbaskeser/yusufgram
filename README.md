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
- Username (string)
- Password (string) 

**LoginResponseDto:**
- Token (string)  
- Message (string)  

**RegisterRequestDto:**
- Username (string)  
- Password (string) 
- E-mail (string)  
- DateOfBirth (date)  
- Gender (string)  

**RegisterResponseDto:**
- Token (string)  
- Message (string)  

#### Routes

`POST /auth/login`  
**Request:** `LoginRequestDto`  
**Response:** `LoginResponseDto`

`POST /auth/register`  
**Request:** `RegisterRequestDto`  
**Response:** `RegisterResponseDto`

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

`GET /user/:userId`  
**Response:** `UserDataResponseDto`

`GET /user/:username`  
**Response:** `UserDataResponseDto`

`DELETE /user/:userId`  
**Response:** `UserMessageResponseDto`

`PUT /user/:userId`  
**Request:** `UserUpdateRequestDto`  
**Response:** `UserMessageResponseDto`

`PUT /user/changePassword/:userId`  
**Request:** `UserPasswordUpdateRequestDto`  
**Response:** `UserMessageResponseDto`


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

`GET /posts/:postId`  
**Response:** `GetPostResponseDto`

`GET /posts`  
**Response:** `GetPostResponseDto`

`POST /posts`  
**Request:** `PostRequestDto`  
**Response:** `PostResponseMessageDto`

`GET /posts/:userId/posts`  
**Response:** `GetPostResponseDto`

`PUT /posts/:postId`  
**Request:** `PostUpdateRequestDto`  
**Response:** `PostResponseMessageDto`

`DELETE /posts/:postId`  
**Response:** `PostResponseMessageDto`

`GET /posts/feed`  
**Response:** `GetPostResponseDto`

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

`POST /posts/:postId/like`  
**Response:** `likeResponseMessageDto`

`DELETE /posts/:postId/like`  
**Response:** `likeResponseMessageDto`

`GET /posts/:postId/likes`  
**Response:** `likeResponseDto`


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

`POST /posts/:postID/comments`  
**Request:** `PostCommentRequestDto`  
**Response:** `PostCommentResponseDto`

`GET /posts/:postId/comments`  
**Response:** `GetCommentResponseDto`

`PUT /posts/:postID/:commentId`  
**Request:** `UpdateCommentRequestDto`  
**Response:** `PostCommentResponseDto`

`DELETE /comments/:commentId`  
**Response:** `PostCommentResponseDto`


---

## 🧱 MIDDLEWARES

- **TokenCheck**

---

## 🧰 UTILS

- **generateJwtToken**  
- **hashPassword**  
- **comparePassword**

---
