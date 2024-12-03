# Patients Dashboard

## Introduction

The **Patients Dashboard** project is a full-stack application designed to provide a user-friendly interface for managing clinics and patients. The project consists of two parts:

1. **Backend**: A RESTful API built to serve clinic and patient data.
2. **Frontend**: A modern single-page application (SPA) designed with a mobile-first approach for an optimal user experience.

This project demonstrates the use of pagination with infinite scrolling for better performance and scalability, ensuring efficient handling of large datasets. Additionally, features like sorting and clinic selection make navigation and data exploration straightforward.

---

## Backend

### Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm i
   ```
3. Run the application in development mode:
   ```bash
   npm run dev
   ```
   Alternatively, you can start the server manually with:
   ```bash
   ts-node server.ts
   ```

### Architecture

The backend is developed using **RESTful architecture**, making it clean and easy to extend.

The backend of the patients-dashboard application is designed using RESTful architecture, which ensures a clean, modular, and scalable system. REST (Representational State Transfer) focuses on providing a clear separation between resources and their representations, making it ideal for managing entities like clinics and patients independently.

Each resource is accessed through dedicated endpoints, such as /api/v1/clinics and /api/v1/patients, promoting consistency and simplicity in client-server interactions. The stateless nature of REST eliminates the need for the server to maintain session-specific data, enhancing scalability and enabling the system to handle increased traffic seamlessly. Moreover, REST's modularity supports easy extensibility—new features or entities, like appointments or doctors, can be added as separate endpoints without disrupting existing functionality. This design approach ensures a maintainable architecture that meets the current needs and adaptable for future enhancements.

### API Endpoints

The backend exposes two key endpoints:

#### 1. Get Clinics

- **Endpoint**:  
  `http://localhost:4000/api/v1/clinics`
- **Parameters**:  
  None.
- **Response Format**:
  ```json
  {
    "statuCode": 200,
    "message": "Successfully Retrieved the data",
    "data": {
      "clinics": [] // Array of available clinics
    }
  }
  ```

#### 2. Get Patients

- **Endpoint**:  
  `http://localhost:4000/api/v1/patients`
- **Query Parameters**:
  - **Mandatory**:
    - `clinicId` (ID of the clinic for which patients need to be fetched).
  - **Optional**:
    - `sortBy` (Field for sorting the results; defaults to `id`).
    - `pageSize` (Number of items per page; defaults to `10`).
    - `currentPage` (The page number to fetch; defaults to `1`).
- **Response Format**:
  ```json
  {
    "statuCode": 200,
    "message": "Successfully Retrieved the data",
    "data": {
      "totalPage": 4,
      "currentPage": "1",
      "pageSize": 50,
      "patients": [] // Array of patients
    }
  }
  ```

---

## Frontend

### Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm i
   ```
3. Start the application:
   ```bash
   npm start
   ```
   The application will start on `http://localhost:3000`. Open this link in your browser to access the app.

### Architecture

The frontend is a **single-page application (SPA)** designed to deliver a responsive, and seamless user experience.Built using modern web technology React, it ensures a dynamic interface where users can interact with the app without requiring full-page reloads. This approach not only enhances the application's performance but also makes it feel more responsive, fostering a better user experience.

- **Mobile-first Design**
  A core principle in the application's development is the mobile-first approach. This design strategy prioritizes smaller screens, ensuring the interface is fully responsive and adapts gracefully to devices of all sizes, from smartphones to large desktop monitors. This ensures usability and accessibility for all users, regardless of their device. Components like clinic selection and patient listings are styled to fit compact screens while maintaining readability and functionality. Additional optimizations, such as touch-friendly controls, further enhance usability on mobile devices.

- **Accessibility for Visual Impairment**
  To accommodate users with visual impairments, font sizes have been carefully chosen to align with recommended standards. For large screens, the font size defaults to 16px, ensuring clear and comfortable readability. On smaller screens, a 12px font size is used, which is suitable for compact displays without sacrificing legibility. This design promotes inclusivity, ensuring that users with varying visual needs can engage with the application effortlessly.

- **Pagination with Infinite Scrolling**
  The application employs a combination of pagination and infinite scrolling to optimize both performance and user experience. When users view the list of patients, the data is fetched in manageable chunks rather than loading the entire dataset at once. This reduces the initial load time and conserves network resources, making the app especially efficient for large datasets.

  Infinite scrolling is layered on top of pagination to create a seamless browsing experience. As users scroll through the patient list, additional data is automatically fetched and displayed, eliminating the need for manual page navigation. This functionality mimics the smooth and continuous experience users expect from modern web applications, making data exploration intuitive and engaging.

### Features

1. **Sorting**:  
   Users can sort patient data by:

   - **ID**
   - **First Name**
   - **Last Name**
   - **Date of Birth**

2. **Clinic Selection**:  
   A dropdown selection is provided to choose clinics effortlessly, making navigation simple and intuitive.

---

## Summary

This project demonstrates how to effectively combine a RESTful backend with a responsive frontend for a scalable and performant dashboard. With features like sorting and clinic selection, the application provides an intuitive way to navigate and manage data efficiently.
