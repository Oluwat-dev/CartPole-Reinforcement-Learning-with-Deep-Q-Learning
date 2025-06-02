# CartPole Reinforcement Learning with Deep Q-Learning

This project implements a classic reinforcement learning problem, CartPole, using a Deep Q-Network (DQN) agent built with React and TensorFlow.js. The application provides a real-time visualization of the CartPole environment and the agent's learning progress.

## Table of Contents

- [CartPole Reinforcement Learning with Deep Q-Learning](#cartpole-reinforcement-learning-with-deep-q-learning)
  - [Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [How It Works](#how-it-works)
    - [CartPole Environment](#cartpole-environment)
    - [Deep Q-Network (DQN) Agent](#deep-q-network-dqn-agent)
    - [Training Loop](#training-loop)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## About The Project

The CartPole problem is a fundamental task in reinforcement learning where an agent must balance a pole on a moving cart. The goal is to keep the pole upright for as long as possible by applying forces to the cart (moving it left or right). This project demonstrates how a Deep Q-Network (DQN) can learn to solve this problem through trial and error.

The application is built as a single-page React application, leveraging TensorFlow.js for the neural network computations and Chart.js for visualizing the training progress.

## Features

*   **Real-time CartPole Simulation**: Visualizes the cart and pole's movement as the agent interacts with the environment.
*   **Deep Q-Network (DQN) Agent**: Implements a DQN agent capable of learning optimal policies.
*   **Training Progress Visualization**: Displays a live chart of rewards per episode, allowing you to monitor the agent's learning curve.
*   **Interactive Controls**: Start and observe the training process directly from the browser.
*   **Responsive Design**: Built with Tailwind CSS for a clean and adaptive user interface.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **TensorFlow.js**: A library for machine learning in JavaScript, used for building and training the DQN's neural network.
*   **Chart.js**: A flexible JavaScript charting library for data visualization.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **Vite**: A fast build tool for modern web projects.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Lucide React**: A collection of beautiful and customizable open-source icons.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your machine.

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Oluwat-dev/CartPole-Reinforcement-Learning-with-Deep-Q-Learning
    cd cartpole-rl
    ```
  
2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    The application will typically open in your browser at `http://localhost:5173`.

## Usage

Once the application is running in your browser:

1.  **Observe the initial state**: You will see the CartPole simulation.
2.  **Start Training**: Click the "Start Training" button.
3.  **Monitor Progress**: The CartPole will start moving, and the "Rewards per Episode" chart will update in real-time, showing how well the agent is performing. The agent should learn to balance the pole within approximately 100 episodes.

## How It Works

This project combines a physics simulation of the CartPole environment with a Deep Q-Network (DQN) agent that learns to control it.

### CartPole Environment

The `CartPoleEnv` class (`src/lib/cartpole.ts`) simulates the physics of the CartPole system.
*   **State**: Defined by four continuous values: cart position, cart velocity, pole angle, and pole angular velocity.
*   **Actions**: The agent can choose one of two discrete actions: apply a force to the left (0) or apply a force to the right (1).
*   **Reward**: The agent receives a reward of +1 for each timestep the pole remains upright within the defined boundaries. If the pole falls or the cart moves too far, the episode ends, and no further reward is given for that episode.

### Deep Q-Network (DQN) Agent

The `DQNAgent` class (`src/lib/cartpole.ts`) implements the core reinforcement learning algorithm.
*   **Neural Network**: A simple feed-forward neural network (built with TensorFlow.js) is used to approximate the Q-values for each state-action pair.
*   **Experience Replay**: To stabilize training and break correlations between consecutive experiences, the agent stores its experiences (state, action, reward, next state, done) in a replay buffer. During training, mini-batches of experiences are randomly sampled from this buffer.
*   **Target Network**: A separate "target" neural network is used to calculate the target Q-values. This target network's weights are updated periodically from the main policy network, rather than every step, which significantly improves training stability.
*   **ε-greedy Exploration**: The agent uses an epsilon-greedy strategy to balance exploration (trying new actions to discover better strategies) and exploitation (using the best-known actions based on current knowledge). Epsilon (`ε`) determines the probability of choosing a random action.

### Training Loop

The `CartPole.tsx` component orchestrates the training process:
1.  **Initialization**: An instance of `CartPoleEnv` and `DQNAgent` is created.
2.  **Episode Loop**: The training runs for a predefined number of episodes.
    *   **Reset Environment**: At the start of each episode, the environment is reset to a random initial state.
    *   **Step Loop**: Within each episode, the agent takes steps until the pole falls or a maximum number of steps is reached.
        *   **Action Selection**: The agent uses its DQN to select an action based on the current state.
        *   **Environment Step**: The chosen action is applied to the environment, which returns the next state, the reward received, and whether the episode is done.
        *   **Experience Storage**: The agent stores this experience in its replay buffer.
        *   **Replay**: The agent samples a batch of experiences from the replay buffer and uses them to train its neural network.
        *   **Visualization**: The CartPole simulation is updated, and the rewards chart is refreshed.
    *   **Target Network Update**: Periodically, the weights of the target network are updated from the main policy network.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

*   [TensorFlow.js](https://www.tensorflow.org/js)
*   [React](https://react.dev/)
*   [Chart.js](https://www.chartjs.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Lucide React](https://lucide.dev/icons/)
