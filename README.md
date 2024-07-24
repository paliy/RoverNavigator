The Mars Rover Navigator is a React application designed to simulate the navigation of robotic rovers on a plateau on Mars. The application allows users to input rover commands and view the final positions of the rovers on a chart.

## Features

- Input the plateau size and rover navigation instructions.
- Simulate rover movements based on commands (L, R, M).
- Visualize rover paths using a chart.

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/mars-rover-navigator.git
   cd mars-rover-navigator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **_Usage_**

```bash
  Entering Input Data
    1. Open the Application
       Navigate to http://localhost:3000 in your browser.

    2. Input Data Format
      Plateau Coordinates: The first line should contain two integers representing the upper-right coordinates of the plateau. Example: 5 5.

      Rover Positions and Commands:
        2.1. Each rover's initial position is specified on a new line, followed by a line of commands.
        2.2. Initial Position: Consists of two integers (x, y) and a character indicating the direction (N, E, S, W). Example: 1 2 N.
        2.3. Commands: A string of commands where L turns the rover left, R turns the rover right, and M moves the rover forward. Example: LMLMLMLMM.

      Example Input:
        5 5
        1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMRMRRM

    3. Submitting Data
       Enter Data: Paste the input data into the textarea labeled "Enter the input data...".

       Submit: Click the "Navigate Rovers" button to process the input data.

    4. Viewing Results
       Output: The final positions and orientations of the rovers will be displayed in the "Output:" section.
       Example Output:
        1 3 N
        5 1 E

    5.Chart: A chart displaying the rover paths will appear below the output section. This visual representation helps to understand the rover's movements across the plateau.
```

4. **_Testing_**

To run the tests for the application, use the following command:

```bash
 npm test
```

This will execute the test suite and check the functionality of the rover navigation logic and UI components.

Testing Details

Components: Tests ensure that input data is processed correctly and output is displayed as expected.
Chart: The chart component is mocked during testing to focus on functional aspects.
