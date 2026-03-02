# Product Prediction App

A React Native mobile application built with Expo that provides AI-powered lifecycle recommendations for products based on their age, condition, and cost metrics. The app helps determine the optimal action (recycle, repair, reuse, etc.) for products to maximize circular economy benefits.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the App](#running-the-app)
- [User Flow](#user-flow)
- [Project Structure](#project-structure)
- [File Documentation](#file-documentation)
- [Architecture](#architecture)
- [API Integration](#api-integration)

---

## Overview

The **Product Prediction App** is a mobile application designed to:

- Accept product lifecycle data (material type, age, condition, repair/recycle costs, market demand)
- Submit data to an AI prediction API
- Provide actionable recommendations for each product
- Display assigned processing centers and estimated costs
- Show environmental impact metrics (waste reduction gains)

### Key Features

✅ **Multi-Product Support** – Analyze multiple products in a single session  
✅ **Real-time Validation** – Field-level validation with helpful error messages  
✅ **Smooth Animations** – Polished UI with Reanimated animations  
✅ **Type-Safe** – Full TypeScript implementation  
✅ **MVVM Architecture** – Clean separation of concerns

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **Yarn** (comes with Node.js)
   - Verify: `npm --version`

3. **Expo CLI** (installed automatically with the project)
   - Documentation: https://docs.expo.dev/

4. **Expo Go App** (for testing on physical devices)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

### Optional (for running on emulators)

5. **Android Studio** (for Android emulator)
   - Download: https://developer.android.com/studio
   - Follow setup guide: https://docs.expo.dev/workflow/android-studio-emulator/

6. **Xcode** (for iOS Simulator - macOS only)
   - Download from Mac App Store
   - Follow setup guide: https://docs.expo.dev/workflow/ios-simulator/

---

## Installation & Setup

### Step 1: Clone or Download the Project

If you haven't already, obtain the project files.

```bash
cd d:\product_prediction
```

### Step 2: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React Native 0.81.5
- Expo SDK 54
- React Navigation
- React Native Reanimated
- TypeScript definitions

### Step 3: Verify Installation

Check that everything installed correctly:

```bash
npx expo --version
```

You should see the Expo CLI version displayed.

---

## Running the App

### Option 1: Run on Physical Device (Recommended for beginners)

1. **Install Expo Go** on your iOS or Android device
2. **Start the development server:**

```bash
npm start
```

3. **Scan the QR code:**
   - **iOS**: Open the Camera app and scan the QR code
   - **Android**: Open Expo Go app and scan the QR code

4. The app will load on your device

### Option 2: Run on Android Emulator

1. **Start Android Studio and launch an emulator**
2. **In your terminal, run:**

```bash
npm run android
npx expo start --android
```

The app will automatically install and launch on the emulator.

### Option 3: Run on iOS Simulator (macOS only)

1. **Ensure Xcode is installed**
2. **In your terminal, run:**

```bash
npm run ios
```

The app will automatically launch in the iOS Simulator.

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS device/simulator |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run Jest tests |

---

## User Flow

### 1. Prediction Screen (Start)

**Initial State:**
- User sees a form to enter product information
- One product form is displayed by default

**Actions:**

#### A. Enter Product Details
For each product, the user inputs:
- **Material** (dropdown): Glass, Plastic, Electronics, or Metal
- **Age in Months** (number): How old the product is
- **Condition Score** (1-10): Product condition rating
- **Repair Cost** ($): Estimated cost to repair
- **Recycle Cost** ($): Estimated cost to recycle
- **Market Demand** (dropdown): High, Medium, or Low

#### B. Add More Products
- Click **"+ Add Product"** to analyze multiple products at once
- Each product gets its own collapsible form card

#### C. Remove Products
- Click **"Remove"** on any product card (if more than one exists)
- Confirmation dialog appears before deletion

#### D. Reset Individual Products
- Click **"Reset"** to clear a single product's fields

#### E. Reset All Products
- Click **"Reset All"** at the bottom
- Confirmation dialog appears before clearing all data

#### F. Submit for Prediction
- Click **"Get Predictions"** button
- App validates all fields
- If errors exist, inline error messages appear
- If valid, app sends data to the API

**Validation Rules:**
- Age: Must be a non-negative integer
- Condition Score: Must be an integer between 1-10
- Repair Cost: Must be a non-negative number
- Recycle Cost: Must be a non-negative number

### 2. Loading State

- Submit button shows a loading spinner
- All inputs remain visible
- User cannot interact with forms during submission

### 3. Results Screen

**Displays for each product:**

✓ **Product Number** – Matches input order  
✓ **Recommended Action** – AI decision (e.g., "Recycle", "Repair", "Reuse")  
✓ **Assigned Center** – Processing facility name  
✓ **Estimated Cost** – Cost formatted with currency  
✓ **Waste Reduction Gain** – Environmental impact percentage

**Actions:**
- View all results in a scrollable list
- Click **"← New Prediction"** to return and make another prediction
- Previous data is preserved in the form

### 4. Error Handling

**Network Errors:**
- Displays error banner with user-friendly message
- Options to retry without losing entered data

**Validation Errors:**
- Shows red error text under each invalid field
- Highlights which products need attention

---

## Project Structure

```
product_prediction/
├── app.json                    # Expo app configuration
├── App.tsx                     # Root component & navigation setup
├── index.js                    # Entry point
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
├── metro.config.js             # Metro bundler configuration
│
└── src/                        # Source code
    ├── components/             # Reusable UI components
    │   ├── AnimatedButton.tsx
    │   ├── DropdownPicker.tsx
    │   ├── FormInput.tsx
    │   ├── ProductFormCard.tsx
    │   ├── ResultCard.tsx
    │   ├── theme.ts
    │   └── index.ts
    │
    ├── model/                  # Data models & types
    │   ├── types.ts
    │   └── index.ts
    │
    ├── services/               # API & external services
    │   ├── api.ts
    │   └── index.ts
    │
    ├── view/                   # Screen components
    │   ├── PredictionScreen.tsx
    │   ├── ResultsScreen.tsx
    │   └── index.ts
    │
    └── viewmodel/              # Business logic layer
        ├── usePredictionViewModel.ts
        └── index.ts
```

---

## File Documentation

### Root Configuration Files

#### `app.json`
- **Purpose**: Expo app configuration
- **Contains**: App name, version, icon, splash screen, SDK version, platform-specific settings

#### `App.tsx`
- **Purpose**: Root component of the application
- **Key Responsibilities**:
  - Sets up navigation container with React Navigation
  - Defines navigation stack with two screens (Prediction, Results)
  - Applies dark theme to navigation bar
  - Configures header styling and animations
- **Navigation Screens**:
  - `Prediction` → PredictionScreen component
  - `Results` → ResultsScreen component

#### `index.js`
- **Purpose**: Entry point for the React Native app
- **Function**: Registers the root component with AppRegistry

#### `package.json`
- **Purpose**: Project manifest
- **Contains**: Dependencies, dev dependencies, npm scripts, engine requirements
- **Key Dependencies**:
  - `expo`: Framework for React Native apps
  - `react-navigation`: Navigation library
  - `react-native-reanimated`: Animation library
  - `typescript`: Type safety

#### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Configures**: Module resolution, JSX compilation, type checking rules

#### `babel.config.js`
- **Purpose**: Babel transpiler configuration
- **Plugins**: Reanimated plugin for worklet support

#### `metro.config.js`
- **Purpose**: Metro bundler configuration
- **Function**: Configures how JavaScript is bundled

---

### Source Code (`src/`)

#### **Components Directory** (`src/components/`)

##### `AnimatedButton.tsx`
- **Purpose**: Reusable animated button component
- **Features**:
  - Supports primary and outline variants
  - Scale animation on press (Reanimated)
  - Loading state with activity indicator
  - Disabled state handling
- **Props**:
  - `title`: Button label text
  - `onPress`: Click handler
  - `variant`: 'primary' | 'outline'
  - `loading`: Shows loading spinner
  - `disabled`: Disables interaction

##### `DropdownPicker.tsx`
- **Purpose**: Custom dropdown/select component
- **Features**:
  - Modal-based picker for iOS feel
  - Pressable dropdown UI
  - Supports Material and Market Demand selections
- **Props**:
  - `label`: Field label
  - `value`: Currently selected value
  - `options`: Array of selectable items
  - `onChange`: Selection handler

##### `FormInput.tsx`
- **Purpose**: Text input component with validation
- **Features**:
  - Label and error message display
  - Numeric keyboard for number inputs
  - Error state styling
  - Accessible design
- **Props**:
  - `label`: Input field label
  - `value`: Text value
  - `onChangeText`: Change handler
  - `error`: Validation error message
  - `keyboardType`: Input type

##### `ProductFormCard.tsx`
- **Purpose**: Complete product form with all input fields
- **Features**:
  - Collapsible/expandable card with animation
  - Contains all 6 product input fields
  - Validation error display
  - Individual product actions (remove, reset)
  - Entrance animation on mount
- **Contains**:
  - Material dropdown
  - Age months input
  - Condition score input
  - Repair cost input
  - Recycle cost input
  - Market demand dropdown
- **Props**:
  - `product`: Form state object
  - `index`: Product position in list
  - `errors`: Validation errors for this product
  - `canRemove`: Whether remove button is enabled
  - `onUpdate`: Field update handler
  - `onRemove`: Remove product handler
  - `onReset`: Reset product handler

##### `ResultCard.tsx`
- **Purpose**: Displays prediction result for one product
- **Features**:
  - Animated entrance with stagger delay
  - Color-coded by recommendation type
  - Displays all prediction data
  - Gradient background styling
- **Shows**:
  - Product number
  - Recommended action (with icon)
  - Assigned processing center
  - Estimated cost
  - Waste reduction gain

##### `theme.ts`
- **Purpose**: Design system constants
- **Exports**:
  - `Colors`: App color palette (dark theme)
  - `Spacing`: Consistent padding/margin values
  - `FontSize`: Type scale
  - `Radius`: Border radius values

##### `index.ts`
- **Purpose**: Barrel export for components
- **Function**: Simplifies imports across the app

---

#### **Model Directory** (`src/model/`)

##### `types.ts`
- **Purpose**: TypeScript type definitions for the entire app
- **Defines**:
  
  **Enums:**
  - `Material`: 'Glass' | 'Plastic' | 'Electronics' | 'Metal'
  - `MarketDemand`: 'High' | 'Medium' | 'Low'
  
  **Request Types:**
  - `ProductInput`: API payload shape (numbers)
  
  **Response Types:**
  - `Recommendation`: Single prediction result
  - `PredictionResponse`: API response envelope
  
  **Form State:**
  - `ProductFormState`: UI form state (strings)
  - `ProductValidationErrors`: Field-level errors
  
  **Navigation:**
  - `RootStackParamList`: Navigation type safety

##### `index.ts`
- **Purpose**: Barrel export for model types
- **Function**: Single import point for types

---

#### **Services Directory** (`src/services/`)

##### `api.ts`
- **Purpose**: API client for predictions
- **Main Function**: `fetchPredictions()`
  - Accepts array of `ProductInput` objects
  - Makes POST request to prediction API
  - URL: `https://circular-api-production.up.railway.app/predict/`
  - Headers: JSON content type
  - Timeout: 30 seconds
  - Error handling: Network errors, timeouts, HTTP errors
  - Returns: `PredictionResponse` object
  - Throws: Human-readable error strings

##### `index.ts`
- **Purpose**: Barrel export for services
- **Function**: Re-exports API functions

---

#### **View Directory** (`src/view/`)

##### `PredictionScreen.tsx`
- **Purpose**: Main input screen component
- **Features**:
  - Renders list of product form cards
  - Add product button
  - Submit button with loading state
  - Reset all button
  - Error banner display
  - Keyboard-aware scrolling
- **State Management**: Uses `usePredictionViewModel` hook
- **Navigation**: Navigates to Results screen on success
- **Layout**:
  - Header with title and subtitle
  - Scrollable product forms
  - Fixed action buttons at bottom

##### `ResultsScreen.tsx`
- **Purpose**: Displays prediction results
- **Features**:
  - Scrollable list of result cards
  - Header with product count
  - Back button to return to prediction screen
- **Data Source**: Receives recommendations via navigation params
- **Layout**:
  - Header section
  - Result cards grid
  - Back navigation button

##### `index.ts`
- **Purpose**: Barrel export for screens
- **Function**: Exports both screen components

---

#### **ViewModel Directory** (`src/viewmodel/`)

##### `usePredictionViewModel.ts`
- **Purpose**: Business logic layer for prediction screen
- **Architecture**: MVVM pattern (ViewModel)
- **Returns Interface**: `PredictionViewModel` with:
  
  **State:**
  - `products`: Array of product forms
  - `validationErrors`: Per-product error maps
  - `isLoading`: API request state
  - `errorMessage`: Global error message
  - `recommendations`: Last API results
  
  **Actions:**
  - `addProduct()`: Adds new blank product form
  - `removeProduct(id)`: Removes a product
  - `resetProduct(id)`: Clears one product
  - `reset()`: Clears all products
  - `updateField(id, field, value)`: Updates a field
  - `submit()`: Validates and submits to API
  
  **Internal Functions:**
  - `createEmptyProduct()`: Factory for blank forms
  - `validateProduct(form)`: Field validation logic
  - `formToInput(form)`: Converts form strings to API numbers

- **Key Logic**:
  - Manages multiple product forms
  - Client-side validation before API call
  - Error state management
  - Data transformation (strings ↔ numbers)

##### `index.ts`
- **Purpose**: Barrel export for viewmodel
- **Function**: Exports the custom hook

---

## Architecture

### MVVM Pattern

This app follows the **Model-View-ViewModel** architectural pattern:

```
┌─────────────────┐
│     View        │  ← React Components (screens, components)
│  (Presentation) │    - PredictionScreen
└────────┬────────┘    - ResultsScreen
         │             - ProductFormCard
         │             - ResultCard
         ↓
┌─────────────────┐
│   ViewModel     │  ← Business Logic
│  (Logic Layer)  │    - usePredictionViewModel
└────────┬────────┘    - Form state
         │             - Validation
         │             - Data transformation
         ↓
┌─────────────────┐
│     Model       │  ← Data & Types
│  (Data Layer)   │    - TypeScript types
└────────┬────────┘    - Interfaces
         │             - Type safety
         ↓
┌─────────────────┐
│    Services     │  ← External APIs
│  (Integration)  │    - API client
└─────────────────┘    - Network calls
```

### Benefits of This Architecture

✅ **Separation of Concerns**: Each layer has a single responsibility  
✅ **Testability**: Business logic is decoupled from UI  
✅ **Type Safety**: TypeScript ensures correctness  
✅ **Maintainability**: Easy to locate and modify code  
✅ **Scalability**: New features fit cleanly into the structure

---

## API Integration

### Endpoint

**URL**: `https://circular-api-production.up.railway.app/predict/`  
**Method**: `POST`  
**Content-Type**: `application/json`

### Request Format

```json
[
  {
    "Material": "Glass",
    "Age_months": 24,
    "Condition_Score": 7,
    "Repair_Cost": 15.5,
    "Recycle_Cost": 8.0,
    "Market_Demand": "High"
  },
  {
    "Material": "Plastic",
    "Age_months": 12,
    "Condition_Score": 9,
    "Repair_Cost": 5.0,
    "Recycle_Cost": 3.5,
    "Market_Demand": "Medium"
  }
]
```

### Response Format

```json
{
  "Recommendations": [
    {
      "Product": 1,
      "Recommended_Action": "Recycle",
      "Assigned_Center": "Center A",
      "Estimated_Cost": "$8",
      "Waste_Reduction_Gain": "+35%"
    },
    {
      "Product": 2,
      "Recommended_Action": "Reuse",
      "Assigned_Center": "Center B",
      "Estimated_Cost": "$0",
      "Waste_Reduction_Gain": "+60%"
    }
  ]
}
```

### Error Handling

The API client handles:
- **Network errors**: Shows user-friendly message
- **Timeouts**: 30-second limit with retry option
- **HTTP errors**: Extracts and displays server error messages
- **Validation errors**: Caught before API call

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development toolchain & SDK |
| **TypeScript** | Type safety & developer experience |
| **React Navigation** | Screen navigation |
| **Reanimated** | High-performance animations |
| **Fetch API** | HTTP requests (native) |

---

## Development Tips

### Hot Reloading
- Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
- Enable "Fast Refresh" for automatic updates

### Debugging
- Use React Native Debugger
- Check console logs in terminal
- Use Chrome DevTools via Expo

### Type Checking
```bash
npx tsc --noEmit
```

### Code Quality
```bash
npm run lint
```

---

## Troubleshooting

### Common Issues

**Issue**: "Metro bundler not starting"  
**Solution**: Clear cache with `npx expo start -c`

**Issue**: "Module not found"  
**Solution**: Delete `node_modules/` and run `npm install`

**Issue**: "App crashes on startup"  
**Solution**: Check that all native dependencies are compatible with Expo SDK 54

**Issue**: "API timeout"  
**Solution**: Check internet connection; API may be down

**Issue**: "Validation errors not clearing"  
**Solution**: Make sure all fields meet validation rules; reset the product if needed

---

## License

This project is for demonstration purposes.

---

## Contact & Support

For issues or questions about the app, contact your development team.

---

**Built with ❤️ using React Native & Expo**
