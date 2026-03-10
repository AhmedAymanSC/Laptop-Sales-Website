# Laptop Sales Website

## **Overview** 


This project is a **full-stack web application for selling laptops**. The website allows users to browse available laptops, view detailed information about each product, and make purchases.

The application uses modern technologies and provides a seamless user experience.

## **Features** 

   - User-friendly interface for browsing laptops.
   - **Interactive Product Display:** Seamless crossfade hover effect for product images.
   - Search and filter functionality to find laptops by brand, price, or specifications.
   - Secure user authentication for login and registration.
   - Shopping cart for managing selected items.
   - Order history for tracking past purchases.
   - Admin panel for managing inventory, orders, and users.

## **Technologies Used**
## *Frontend*

   - HTML, CSS, and JavaScript for building the user interface.
   - React.js for creating dynamic and responsive components.

## *Backend*

   - Node.js and Express.js for handling server-side operations.
   - MongoDB for database management.

## *Tools and Utilities*

   - Postman for API testing.
   - Git for version control.

## **Installation**
## *Clone the repository:*

    ```bash
    git clone https://github.com/kareempogba0/CS309-Fall2024-Project
    cd CS309-Fall2024-Project
    ```

## **Install dependencies:**

    npm install

## **Set up the environment variables:**

   - Create a .env file in the root directory.
    Add the following variables:

    DATABASE_URL=<your-mongodb-url>
    JWT_SECRET=<your-jwt-secret>
    PORT=<your-port>

## **Start the application:**

    npm start

## **Usage**

   - Navigate to the homepage to view available laptops.
   - Log in or sign up to add items to your cart.
   - Proceed to checkout to complete a purchase.
   - Access the **Admin Panel** at `http://localhost:3000/admin` using:
      - **Email:** `admin@example.com`
      - **Password:** `password123`

## **Future Enhancements**

   - Adding reviews and ratings for products.
   - Implementing payment gateway integration.
   - Offering discounts and promotional codes.

## **Contributing**

We welcome contributions! Please submit a pull request or open an issue for any suggestions or improvements.