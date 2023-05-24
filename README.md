## Facebook Clone

### Description

Faithful reproduction of Facebook, built with React, NextJS, TailwindCSS, NextAuth, MongoDB, and Prisma.

---

### Table of Contents

-   [Features](#features)
-   [Live Demo](#live-demo)
-   [Installation](#installation)
-   [Screenshots](#screenshots)

---

### Features

- User Authentication
- Post feed
- Create and delete posts
- Upload photos
- Comment on posts
- Like posts
- Create and edit a user profile
- Personalize profile with cover photo and profile picture
- View other user profiles and their posts
- View user's friends
- Add and remove friends
- Suggested friends
- Notifications
- Mobile responsive design
- Dark mode

---

### Live Demo

---

### Installation

1. Clone the repo
    ```sh
    git clone git@github.com:WitchingHr/fb.git
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables
    ```sh
    DATABASE_URL=your_database_url
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    ```
    -   `DATABASE_URL` is the URL to your MongoDB database
    -   `NEXTAUTH_SECRET` is a secret string used by NextAuth
    -   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is your Cloudinary cloud name

4. Run the development server
    ```sh
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000)

---

### Screenshots

