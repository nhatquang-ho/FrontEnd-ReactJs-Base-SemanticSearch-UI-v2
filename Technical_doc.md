# Technical Documentation: Semantic Product Search UI

This document provides a detailed overview of the frontend application built to interface with the Spring Boot JWT Semantic Search backend.

---

## 1. Project Overview

The Semantic Product Search UI is a modern, single-page web application (**SPA**) built with **React** and **TypeScript**. Its primary purpose is to provide a user-friendly interface for managing and searching a product catalog. The standout feature is its ability to perform **semantic searches**, allowing users to find products using natural language queries that describe intent or characteristics rather than just keywords.

The application also includes a complete user authentication system with **role-based access control**, allowing for distinct experiences for regular users and administrators.

---

## 2. Core Features

The application implements the full range of functionalities exposed by the backend API:

### User Authentication

* **Registration**: New users can create an account.
* **Login/Logout**: Secure session management using **JWT (JSON Web Tokens)**. Access and refresh tokens are stored in `localStorage`.
* **Authenticated Profile**: Logged-in users can view their profile details.

### Product Management

* **View Products**: All active products are displayed on the home page.
* **Semantic Search**: Users can input natural language queries (e.g., "a comfortable chair for long work hours") to find relevant products. The backend handles the embedding and similarity search.
* **Create Product**: Authenticated users (**USER** or **ADMIN**) can add new products through a modal form.
* **Delete Product**: Administrators can soft-delete products directly from the product cards.

### Admin Dashboard

* **User Management**: A dedicated "Admin" page is accessible only to users with the **ADMIN** role.
* **View All Users**: Administrators can see a list of all registered users.
* **Activate/Deactivate Users**: Administrators can toggle the `isActive` status of any user, effectively enabling or disabling their account.

---

## 3. Architecture & Technology Stack

The project is built on a modern frontend stack, emphasizing type safety, reusability, and maintainability.

* **Framework**: **React 18** is used for building the user interface with a component-based architecture. **Functional components** and **Hooks** (`useState`, `useEffect`, `useContext`, `useCallback`) are used exclusively.
* **Language**: **TypeScript** provides static typing, reducing runtime errors and improving developer experience and code maintainability.
* **Styling**: **Tailwind CSS** is used for all styling. It's a utility-first CSS framework that allows for rapid UI development directly within the JSX, ensuring a consistent design system.
* **Routing**: A simple, state-based routing mechanism is implemented in `App.tsx`. The `currentPage` state variable determines which page component to render. This is lightweight and sufficient for the current scope but could be upgraded to a library like **react-router-dom** for more complex needs (e.g., browser history, deep linking).
* **State Management**:
    * **Global State**: React's **Context API** is used for managing global authentication state (`isAuthenticated`, `user`). The `AuthProvider` wraps the entire application, and the `useAuth` custom hook provides easy, decoupled access to this state from any component.
    * **Local/Component State**: React's `useState` hook is used for managing state that is local to a single component, such as form inputs, loading indicators, and error messages.
* **API Interaction**: A dedicated API service layer (`services/api.ts`) centralizes all communication with the backend. This service abstracts the `fetch` API, automatically attaches the **JWT** authorization header to protected requests, and provides a consistent way of handling responses and errors.

---

## 4. Code Structure

The project follows a standard, feature-oriented file structure that promotes separation of concerns.

```bash
/
├── components/         # Reusable UI components (e.g., Header, ProductCard)
├── hooks/              # Custom React hooks (e.g., useAuth for auth logic)
├── pages/              # Top-level components for each "page" (e.g., HomePage)
├── services/           # Modules for external communication (e.g., api.ts)
├── App.tsx             # Root component, handles routing and layout
├── index.html          # Main HTML entry point
├── index.tsx           # Application entry, renders the React app
├── types.ts            # Centralized TypeScript types and interfaces
└── metadata.json       # Application metadata

components/: Contains small, reusable pieces of the UI. For example, ProductCard.tsx is used to display a single product and can be reused in different contexts (e.g., all products list, search results).

pages/: These components represent full views or "pages" of the application. They are responsible for fetching their own data (using the API service) and composing smaller components from the components/ directory.

hooks/useAuth.tsx: A prime example of a custom hook that encapsulates complex logic. It manages the user's authentication state, interacts with localStorage, and exposes simple functions (login, logout) to the rest of the app. This is a key design pattern for clean, reusable state logic.

services/api.ts: Decouples the application logic from the data-fetching implementation. If fetch were to be replaced with another library like axios, the changes would be confined to this one file.

types.ts: Having a single source of truth for types, which are based on the backend API's OpenAPI specification, ensures data consistency across the entire application.

```

## 5. Potential Improvements & Future Work

While the application is fully functional, several areas could be enhanced in a future iteration:

* URL-Based Routing: Replace the current state-based router with react-router-dom. This would enable shareable URLs for specific pages, browser history support (back/forward buttons), and a more conventional SPA user experience.

* Advanced Server State Management: Integrate a library like TanStack Query (formerly React Query). This would provide significant benefits over the current useEffect-based data fetching, including:

* Automatic caching and background refetching.

* Simplified handling of loading and error states.

* Optimistic UI updates for a faster perceived performance.

* Enhanced User Feedback: Implement a toast notification system (e.g., using react-hot-toast) to provide non-blocking feedback for actions like "Product created successfully" or "User status updated."

* Comprehensive Form Validation: Use a dedicated form library like react-hook-form with a schema validation library like zod for more robust and user-friendly client-side and/or server-side validation.

* Testing: Introduce a testing suite.

* Unit Tests: Use Jest and React Testing Library to test individual components and utility functions.

* End-to-End Tests: Use a framework like Cypress or Playwright to simulate user flows and ensure application integrity.

* Environment Variables: Move the hardcoded BASE_URL in services/api.ts to an environment variable (.env file) for better configuration management across different environments (development, production).