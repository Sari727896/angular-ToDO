# Angular Todo List Application

A feature-rich Todo List application built with Angular 19, featuring animations, internationalization, and Material UI components.

## Features

### Core Functionality
- Create new todos with title and optional description
- Mark todos as complete/incomplete
- Delete todos with confirmation dialog
- Filter todos by status (All/Complete/Incomplete)
- Form validation for todo creation
  - Required title with minimum 3 characters
  - Optional description field

### Enhanced Features
- Smooth animations for all interactions
  - Dialog entrance/exit animations
  - Content transitions
  - Delete confirmation shake effect
- Multi-language support
  - English (default)
  - Hebrew (with RTL support)
  - French
- Sound effects for completing tasks

## Technical Implementation

### Components
- `NavHeaderComponent`: Navigation bar with language switcher
- `TodoListComponent`: Main todo list with filtering
- `TodoItemComponent`: Individual todo item display
- `AddTodoComponent`: Form for creating new todos
- `DeleteConfirmationComponent`: Confirmation dialog for deletion
- `LanguageSwitcherComponent`: Language selection dropdown

### State Management & Services
- NgRx Store implementation for todo state management
  - Actions for all todo operations
  - Reducers for state updates
  - Effects for side effects
  - Selectors for state queries
- `TodoService`: Manages todo CRUD operations
- `TranslationService`: Handles i18n functionality

### Technologies Used
- Angular 19
- NgRx for state management
- Angular Material
- @angular/animations
- @ngx-translate/core
- Jest for testing

## Setup and Running

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Navigate to `http://localhost:4200`

## Testing

Run the test suite using:
```bash
npm test
```

Tests include:
- Component creation tests
- Service functionality tests
- Translation functionality tests

## Project Structure
```
src/
├── app/
│   ├── features/todo/
│   │   ├── animations/
│   │   ├── components/
│   │   ├── i18n/
│   │   ├── models/
│   │   ├── services/
│   │   ├── store/
│   │   └── styles/
│   └── app.component.(html|scss|ts)
└── public/
```

## Requirements Fulfilled

### Core Requirements ✓
- [x] Component Creation (TodoList, TodoItem, AddTodo)
- [x] CRUD Operations for Todos
- [x] Filtering Functionality
- [x] Angular Material UI Implementation
- [x] Form Validation
- [x] Unit Testing

### Bonus Features ✓
- [x] NgRx State Management Implementation
- [x] Animations for Adding/Removing Items
- [x] Multi-language Support
- [x] Enhanced UI/UX with Sound Effects
- [x] Confirmation Dialogs
- [x] RTL Support

## Notes
- Built as part of an Angular coding assessment
- Focuses on clean code architecture and best practices
- Implements standalone components
- Uses modern Angular features including control flow syntax