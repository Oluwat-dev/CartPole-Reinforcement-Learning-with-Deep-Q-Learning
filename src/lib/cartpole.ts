import * as tf from '@tensorflow/tfjs';

export class CartPoleEnv {
  // State variables
  private x: number = 0;
  private xDot: number = 0;
  private theta: number = 0;
  private thetaDot: number = 0;

  // Constants
  private readonly gravity = 9.8;
  private readonly cartMass = 1.0;
  private readonly poleMass = 0.1;
  private readonly totalMass = this.cartMass + this.poleMass;
  private readonly length = 0.5;
  private readonly poleMassLength = this.poleMass * this.length;
  private readonly forceMag = 10.0;
  private readonly tau = 0.02;  // seconds between state updates
  private readonly thetaThresholdRadians = 12 * 2 * Math.PI / 360;
  private readonly xThreshold = 2.4;

  constructor() {
    this.reset();
  }

  public reset(): number[] {
    this.x = Math.random() * 0.1 - 0.05;
    this.xDot = Math.random() * 0.1 - 0.05;
    this.theta = Math.random() * 0.1 - 0.05;
    this.thetaDot = Math.random() * 0.1 - 0.05;
    return this.getState();
  }

  public step(action: number): [number[], number, boolean] {
    const force = action === 1 ? this.forceMag : -this.forceMag;

    const cosTheta = Math.cos(this.theta);
    const sinTheta = Math.sin(this.theta);

    const temp = (force + this.poleMassLength * this.thetaDot ** 2 * sinTheta) / this.totalMass;
    const thetaAcc = (this.gravity * sinTheta - cosTheta * temp) / 
      (this.length * (4.0/3.0 - this.poleMass * cosTheta ** 2 / this.totalMass));
    const xAcc = temp - this.poleMassLength * thetaAcc * cosTheta / this.totalMass;

    // Update state
    this.x += this.tau * this.xDot;
    this.xDot += this.tau * xAcc;
    this.theta += this.tau * this.thetaDot;
    this.thetaDot += this.tau * thetaAcc;

    const done = 
      this.x < -this.xThreshold ||
      this.x > this.xThreshold ||
      this.theta < -this.thetaThresholdRadians ||
      this.theta > this.thetaThresholdRadians;

    const reward = done ? 0.0 : 1.0;

    return [this.getState(), reward, done];
  }

  public getState(): number[] {
    return [this.x, this.xDot, this.theta, this.thetaDot];
  }

  public getCartPosition(): number {
    return this.x;
  }

  public getPoleAngle(): number {
    return this.theta;
  }
}

export class DQNAgent {
  private model: tf.LayersModel;
  private targetModel: tf.LayersModel;
  private replayBuffer: Array<[number[], number, number, number[], boolean]> = [];
  private readonly maxBufferSize = 10000;
  private readonly batchSize = 32;
  private readonly gamma = 0.99;
  private readonly epsilon = 0.1;
  private readonly targetUpdateFreq = 10;
  private stepCount = 0;

  constructor() {
    this.model = this.createModel();
    this.targetModel = this.createModel();
    this.updateTargetModel();
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 24,
      activation: 'relu',
      inputShape: [4]
    }));
    
    model.add(tf.layers.dense({
      units: 24,
      activation: 'relu'
    }));
    
    model.add(tf.layers.dense({
      units: 2,
      activation: 'linear'
    }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    return model;
  }

  private updateTargetModel() {
    this.targetModel.setWeights(this.model.getWeights());
  }

  public async act(state: number[]): Promise<number> {
    if (Math.random() < this.epsilon) {
      return Math.random() < 0.5 ? 0 : 1;
    }

    const stateTensor = tf.tensor2d([state]);
    const prediction = await this.model.predict(stateTensor) as tf.Tensor;
    const action = (await prediction.argMax(1).data())[0];
    
    tf.dispose([stateTensor, prediction]);
    return action;
  }

  public remember(state: number[], action: number, reward: number, nextState: number[], done: boolean) {
    if (this.replayBuffer.length >= this.maxBufferSize) {
      this.replayBuffer.shift();
    }
    this.replayBuffer.push([state, action, reward, nextState, done]);
  }

  public async replay() {
    if (this.replayBuffer.length < this.batchSize) return;

    // Sample random batch
    const batch = [];
    for (let i = 0; i < this.batchSize; i++) {
      const index = Math.floor(Math.random() * this.replayBuffer.length);
      batch.push(this.replayBuffer[index]);
    }

    const states = tf.tensor2d(batch.map(([state]) => state));
    const nextStates = tf.tensor2d(batch.map(([,,,nextState]) => nextState));

    const currentQs = await this.model.predict(states) as tf.Tensor;
    const futureQs = await this.targetModel.predict(nextStates) as tf.Tensor;

    const updatedQs = await currentQs.arraySync();

    for (let i = 0; i < this.batchSize; i++) {
      const [, action, reward, , done] = batch[i];
      if (done) {
        updatedQs[i][action] = reward;
      } else {
        const futureQ = Math.max(...(futureQs.arraySync()[i]));
        updatedQs[i][action] = reward + this.gamma * futureQ;
      }
    }

    await this.model.fit(states, tf.tensor2d(updatedQs), {
      epochs: 1,
      verbose: 0
    });

    tf.dispose([states, nextStates, currentQs, futureQs]);

    this.stepCount++;
    if (this.stepCount % this.targetUpdateFreq === 0) {
      this.updateTargetModel();
    }
  }
}