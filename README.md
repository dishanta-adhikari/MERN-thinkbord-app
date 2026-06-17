# MEARN-thinkbord-app

# Notes App

A modern full-stack Notes Management Application built with **React, Node.js, Express, and MongoDB**. Users can create, edit, delete, and organize notes with customizable colors while enjoying a clean and responsive user experience.

## Features

### Core Features

- Create new notes
- View all notes
- Edit existing notes
- Delete notes with confirmation
- View note details
- Responsive user interface

### Color-Coded Notes

- Choose a color while creating a note
- Each note displays its selected color using a colored border
- Colors persist in MongoDB
- Visual organization for improved productivity

Supported Colors:

- Blue
- Pink
- Green
- Yellow
- Purple
- Orange

### Rate Limiting

- API request protection using rate limiting middleware
- Prevents abuse and excessive requests
- User-friendly rate limit warning UI
- Graceful handling of HTTP 429 responses

### Additional Features

- Automatic timestamps
- Notes sorted by newest first
- Loading states
- Toast notifications
- Error handling
- Empty state UI
- Delete confirmation dialog

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- React Hot Toast
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools

- Vite
- Git
- GitHub

---

## Project Structure

```bash
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── App.jsx
│   │
│   └── vite.config.js
│
└── README.md
```

---

## Screenshots

### Home Page

- Displays all notes in a responsive grid
- Color-coded note cards
- Edit and delete actions

### Create Note

- Create notes with title and content
- Select note color

### Edit Note

- Update title and content
- View note color indicator

---

## Installation

### Clone Repository

```bash
git clone https://github.com/dishanta-adhikari/MERN-thinkbord-app.git
cd MERN-thinkbord-app
```

### Backend Setup

Create a `.env` file:

```env

MONGO_URI=your_mongodb_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL= your UPSTASH url (free to create)
UPSTASH_REDIS_REST_TOKEN= your UPSTASH REDIS token (free to create)
NODE_ENV=production

```

### Final Run

```bash
cd MERN-thinkbord-app

npm run build && npm run start
```

---

## API Endpoints

### Get All Notes

```http
GET /api/notes
```

### Get Single Note

```http
GET /api/notes/:id
```

### Create Note

```http
POST /api/notes
```

Request Body:

```json
{
  "title": "Shopping List",
  "content": "Milk, Bread, Eggs",
  "color": "purple"
}
```

### Update Note

```http
PUT /api/notes/:id
```

### Delete Note

```http
DELETE /api/notes/:id
```

---

## Database Schema

```javascript
{
  title: String,
  content: String,
  color: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Future Improvements

- Search notes
- Categories and tags
- Dark mode
- User authentication
- Rich text editor
- Pin important notes
- Archive notes
- Drag and drop organization

---

## Learning Outcomes

This project demonstrates:

- REST API development
- CRUD operations
- MongoDB integration
- React state management
- API communication with Axios
- Error handling
- Rate limiting
- Responsive UI design
- Full-stack application architecture

---

## Author

**Dishanta Adhikari**

Final Year MCA Student
Girijananda Chowdhury University

---

## License

This project is licensed under the MIT License.
