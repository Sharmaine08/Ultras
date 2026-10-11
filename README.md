# Focus Timer

## About the Application

Focus Timer is a simple mobile timer application developed using React Native and Expo. It is designed to help users manage their time for different activities such as studying, taking breaks, and exercising.

The application allows users to choose a specific duration using hours, minutes, and seconds. Instead of repeatedly pressing buttons to set the time, users can scroll through the time picker to easily select their desired duration.

The app also provides timer modes, a countdown display, a circular progress indicator, pause and resume controls, and a recently used section for previously selected timers.

---

## Features

### 1. Time Picker
Users can select their desired timer duration using three scrollable time selectors:

- Hours
- Minutes
- Seconds

For example:

`01 : 30 : 20`

means 1 hour, 30 minutes, and 20 seconds.

### 2. Timer Modes

Users can choose from different timer modes:

- Study
- Break
- Exercise

The selected mode is displayed when the timer is running.

### 3. Countdown Timer

After pressing the **Start Timer** button, the selected time begins to count down automatically.

The timer displays:

- Hours
- Minutes
- Seconds
- Current clock time
- Selected timer duration

### 4. Circular Timer Progress

The running timer has a circular progress indicator.

As the remaining time decreases, the circle also decreases to give the user a visual representation of the remaining time.

### 5. Pause and Resume

The timer can be paused at any time.

When the timer is paused, the button changes to **Resume**, allowing the user to continue the timer from where it stopped.

### 6. Delete Timer

The **Delete** button stops the current timer and returns the user to the main timer setup screen.

### 7. Recently Used

The application records recently selected timer settings.

Each record shows:

- Timer mode
- Hours
- Minutes
- Seconds

Users can select a previous timer from the Recently Used section and use the same settings again.

### 8. See More

The main screen only displays a limited number of recent timers to keep the interface organized.

If there are more records, users can select **See More** to view additional timer records.

### 9. Current Time

The application displays the current time using a 12-hour format, including AM and PM.

Example:

`7:20 PM`

---

## Technologies Used

- React Native
- Expo
- TypeScript
- React Hooks
- `useState`
- `useEffect`
- React Native `ScrollView`
- React Native `TouchableOpacity`
- React Native `StyleSheet`
- `react-native-svg`

---

## Main React Native Concepts Used

### useState

Used to store and update information such as:

- Selected hours
- Selected minutes
- Selected seconds
- Timer status
- Timer mode
- Recently used timers
- Completed sessions

### useEffect

Used for functions that need to run automatically, such as:

- Updating the current time
- Running the countdown timer

### ScrollView

Used for the scrollable hour, minute, and second selectors.

### TouchableOpacity

Used for buttons and selectable options such as:

- Start Timer
- Pause
- Resume
- Delete
- Timer Modes
- Recently Used timers

### StyleSheet

Used to organize the application's design, including:

- Colors
- Font sizes
- Spacing
- Rounded corners
- Button styles
- Timer layout

### React Native SVG

Used to create the circular progress indicator around the running timer.

---

## How to Run the Application

### 1. Install Node.js

Make sure Node.js is installed on your computer.

### 2. Open the Project Folder

Open the project folder in Visual Studio Code.
