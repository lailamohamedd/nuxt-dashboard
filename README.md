# **Nuxt.js Admin Dashboard**  

## **📖 Table of Contents**  
1. [📌 Project Overview](#-project-overview)  
2. [🚀 Features & Functionality](#-features--functionality)  
   - [🔹 Layout & Navigation](#-layout--navigation)  
   - [📊 Dashboard Content](#-dashboard-content)  
   - [📡 Data Handling](#-data-handling)  
   - [🎨 UI & Responsiveness](#-ui--responsiveness)  
   - [🌙 Bonus Enhancements](#-bonus-enhancements)  
3. [📁 Project Structure](#-project-structure)  
4. [🛠️ Tech Stack](#-tech-stack)  
5. [📜 Setup & Installation](#-setup--installation)  
6. [📷 Screenshots](#-screenshots)  
   - [💻 Desktop View](#-desktop-view)  
   - [📱 Mobile View](#-mobile-view)  

---

## **📌 Project Overview**  
This project is a **modern, responsive admin dashboard** built with **Nuxt.js**. It provides an intuitive interface for monitoring key business metrics, visualizing data with charts, and managing recent orders. The design is inspired by a **Figma UI mockup**, ensuring a sleek and user-friendly experience.  

---

## **🚀 Features & Functionality**  

### **🔹 Layout & Navigation**  
✅ **Sidebar Navigation** – Provides quick access to key sections:  
- Dashboard  
- Orders  
- Items  
- Transactions  
- Reports  

✅ **Top Navbar** – Displays the app name/logo, user avatar, and optional settings/logout menu.  

### **📊 Dashboard Content**  
✅ **Analytics Cards** – Displays key business metrics:  
1. **Total Revenue** (e.g., $52.6k)  
2. **Today’s Revenue** (e.g., $1024)  
3. **Items Sold** (e.g., 251)  
4. **Active Users** (e.g., 150)  

✅ **Line Chart** – Shows revenue trends (Day/Week/Month).  
✅ **Bar Chart** – Visualizes user visits per day.  
✅ **Recent Orders Table** – Displays order details with item names, quantities, dates, and statuses.  

### **📡 Data Handling**  
✅ Uses **mock API** (static JSON or fetch API) for data retrieval.  
✅ Demonstrates best practices in **Nuxt data fetching** (e.g., `useFetch`).  

### **🎨 UI & Responsiveness**  
✅ Styled with **Tailwind CSS** for a modern and responsive design.  
✅ Fully adaptable for **mobile, tablet, and desktop**.  

---

### **📁 Project Structure**  

📦 **Project Root**
├── 📂 **pages/**    # Main dashboard and orders page
├── 📂 **layouts/**  # Reusable layout (sidebar + navbar)
├── 📂 **components/**   # UI elements like cards, charts, and tables
├── 📂 **public/**       # Static public assets
├── 📂 **plugins/**      # Nuxt plugins
├── 📜 **nuxt.config.ts** # Nuxt configuration file
├── 📜 **package.json**  # Project dependencies and scripts
└── 📜 **README.md**     # Project documentation

### 🛠️ Tech Stack  
- **Nuxt.js 3** (latest version)  
- **Tailwind CSS** (for styling)  
- **Chart.js / ApexCharts** (for data visualization)  
---

### 📜 Setup & Installation  

### 1️⃣ Clone the repository  
git clone https://github.com/your-repo/dashboard-nuxt.git
cd dashboard-nuxt

### 2️⃣ Install dependencies
npm install

### 3️⃣ Run the development server
npm run dev

### 📷 Screenshots  

### 💻 Desktop View  
![Desktop View](https://github.com/user-attachments/assets/d184d9f9-8bb1-4c56-8ac0-263448997e6a)  
![Desktop View](https://github.com/user-attachments/assets/795fa3b0-7751-479c-94d7-cc60e24e482d)  
![Desktop View](https://github.com/user-attachments/assets/1d278306-7e71-4ec2-ab5b-bc7f5615e4f7)  

### 📱 Mobile View  
![Mobile View](https://github.com/user-attachments/assets/d5409301-acd0-4cef-a9ad-20ffe07cdf66)  
![Mobile View](https://github.com/user-attachments/assets/6b3a6213-593a-4b6d-861b-8e73dd4b6d01)  

---

