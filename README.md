# Blog Project (Fun Exploration 🚀)

This is a personal fun project built to explore **Appwrite**, **React**, and other cool tools.  
It’s a simple blogging platform with:

- 🔑 Authentication & email verification  
- ✍️ Create, Read, Update, Delete (CRUD) blog posts  
- 👤 User-specific posts (active/inactive states)  
- 🖋️ Rich text editor with **TinyMCE**  
- 🎨 Styled with **TailwindCSS**  
- 🧩 HTML parsing with **htmlparser**  
- ⚡ Written in **TypeScript** for type safety  

---

## 🛠️ Tech Stack
- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Appwrite](https://appwrite.io/)  
- [TinyMCE](https://www.tiny.cloud/)  
- [htmlparser2](https://github.com/fb55/htmlparser2)  

---

## 🔑 Features
- User authentication (login/signup/logout)  
- Email verification before accessing features  
- Full CRUD operations for blog posts  
- Active/Inactive state for user posts  
- Rich text editing with TinyMCE  
- Clean UI with TailwindCSS  

---

## ⚙️ Environment Variables
Create a `.env` file in the root directory with:

```env
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
VITE_RTE_API_KEY=""

# 🚀 Getting Started

### Clone the repo
```bash
git clone <repo-url>
cd <repo-name>
### Install dependencies
```bash
npm install
###Add your .env file and Run the app:
```bash
npm run dev

# 📌 Notes
This is just a fun exploration project to learn and experiment with Appwrite, authentication, and content editing.
