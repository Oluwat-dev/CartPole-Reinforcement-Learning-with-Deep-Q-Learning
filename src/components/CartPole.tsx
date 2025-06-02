import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CartPoleEnv, DQNAgent } from '../lib/cartpole';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CartPole: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rewards, setRewards] = useState<number[]>([]);
  const [episode, setEpisode] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [averageReward, setAverageReward] = useState(0);
  const environmentRef = useRef<CartPoleEnv>();
  const agentRef = useRef<DQNAgent>();

  useEffect(() => {
    environmentRef.current = new CartPoleEnv();
    agentRef.current = new DQNAgent();
    drawCartPole();
  }, []);

  const drawCartPole = () => {
    if (!canvasRef.current || !environmentRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cartWidth = 50;
    const cartHeight = 30;
    const poleWidth = 6;
    const poleLength = 100;
    
    const x = environmentRef.current.getCartPosition();
    const theta = environmentRef.current.getPoleAngle();
    
    // Convert physics coordinates to canvas coordinates
    const canvasX = (canvas.width / 2) + (x * 100);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cart
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(
      canvasX - cartWidth/2,
      canvas.height - cartHeight,
      cartWidth,
      cartHeight
    );
    
    // Draw pole
    ctx.save();
    ctx.translate(canvasX, canvas.height - cartHeight);
    ctx.rotate(-theta);
    ctx.fillStyle = '#4B5563';
    ctx.fillRect(-poleWidth/2, -poleLength, poleWidth, poleLength);
    ctx.restore();
  };

  const startTraining = async () => {
    if (!environmentRef.current || !agentRef.current) return;
    
    setIsTraining(true);
    const env = environmentRef.current;
    const agent = agentRef.current;
    
    const maxEpisodes = 100;
    const maxSteps = 500;
    
    for (let e = 0; e < maxEpisodes && isTraining; e++) {
      let state = env.reset();
      let totalReward = 0;
      
      for (let step = 0; step < maxSteps; step++) {
        const action = await agent.act(state);
        const [nextState, reward, done] = env.step(action);
        
        agent.remember(state, action, reward, nextState, done);
        await agent.replay();
        
        state = nextState;
        totalReward += reward;
        
        drawCartPole();
        await new Promise(r => setTimeout(r, 20));
        
        if (done) break;
      }
      
      setEpisode(e + 1);
      setRewards(prev => [...prev, totalReward]);
      setAverageReward(totalReward);
      
      await new Promise(r => setTimeout(r, 100));
    }
    
    setIsTraining(false);
  };

  const chartData = {
    labels: rewards.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Rewards per Episode',
        data: rewards,
        borderColor: '#0D9488',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Training Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            CartPole Reinforcement Learning
          </h2>
          
          <div className="mb-6">
            <canvas 
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-700 dark:text-slate-300">
                Episode: {episode}
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                Last Episode Reward: {averageReward.toFixed(2)}
              </p>
            </div>
            
            <button
              onClick={startTraining}
              disabled={isTraining}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTraining ? 'Training...' : 'Start Training'}
            </button>
          </div>

          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            About This Project
          </h3>
          
          <div className="prose dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300">
              This CartPole implementation uses Deep Q-Learning (DQN), a model-free reinforcement 
              learning algorithm. The agent learns to balance a pole on a moving cart 
              by choosing actions (moving left or right) based on the current state.
            </p>
            
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
              Key Components:
            </h4>
            
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>State space: Cart position, velocity, pole angle, and angular velocity</li>
              <li>Action space: Move cart left or right</li>
              <li>Reward function: +1 for each step the pole remains upright</li>
              <li>Deep Q-Network with experience replay</li>
              <li>Target network for stable training</li>
              <li>ε-greedy exploration strategy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPole;