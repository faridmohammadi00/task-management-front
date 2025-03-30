# Task Management Frontend

A modern task management application built with Vue 3 and Vuetify, featuring user authentication and comprehensive task management capabilities.

## Technologies

### Core
- Vue 3 - Progressive JavaScript framework
- Vite - Next generation frontend tooling
- Vuetify 3 - Material Design component framework
- Pinia - State management
- Vue Router - Official router for Vue.js

### Additional Dependencies
- Axios - HTTP client for API requests
- @mdi/font - Material Design Icons
- date-fns (optional) - Modern JavaScript date utility library

## Features

### Authentication
- User registration
- User login/logout
- Token-based authentication
- Protected routes
- Automatic token validation

### Task Management
- Create new tasks
- View task list
- Edit existing tasks
- Delete tasks
- Filter tasks by status
- Search tasks
- Task status tracking

### UI/UX
- Responsive design
- Material Design components
- Loading states
- Error handling
- User-friendly forms
- Interactive notifications

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/faridmohammadi00/task-management-front.git

# Navigate to project directory
cd task-management-front

# Install dependencies
npm install
# or
yarn install
```

### Configuration
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8000
```

### Development
```bash
# Start development server
npm run dev
# or
yarn dev
```

### Build for Production
```bash
# Build for production
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Vue components
│   ├── auth/        # Authentication components
│   └── tasks/       # Task-related components
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
│   ├── auth.js      # Authentication store
│   └── task.js      # Task management store
├── App.vue          # Root component
└── main.js         # Application entry point
```

## API Integration

The frontend integrates with a RESTful API with the following endpoints:

### Authentication
- POST /api/register - User registration
- POST /api/login - User login
- POST /api/logout - User logout
- GET /api/check-token - Token validation

### Tasks
- GET /api/tasks - List all tasks
- POST /api/tasks - Create new task
- GET /api/tasks/:id - Get single task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token added to all subsequent API requests
5. Token validated on protected route access
6. Auto-logout on token expiration

## State Management

Pinia stores manage:
- User authentication state
- Task data
- Loading states
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Best Practices

- Component composition using Vue 3 Composition API
- Proper error handling and loading states
- Consistent code style (ESLint + Prettier)
- Responsive design principles
- Secure authentication implementation
- Clean and maintainable code structure

## Security Considerations

- Token-based authentication
- Protected routes
- Secure storage of sensitive data
- API error handling
- Input validation
- XSS protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE.md for details

## Contact

Farid Mohammadi - ssky3530@gmail.com
Project Link: https://github.com/faridmohammadi00/task-management-front
```

This README provides:
1. Clear technology stack overview
2. Setup instructions
3. Project structure
4. API integration details
5. Authentication flow
6. Contributing guidelines
7. Security considerations
8. Browser support
9. License information

You can customize it further based on your specific needs or additional features you implement.