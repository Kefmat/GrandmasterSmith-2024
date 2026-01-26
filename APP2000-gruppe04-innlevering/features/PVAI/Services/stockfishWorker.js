const Worker = require("worker-loader!stockfish.js");

// Include Stockfish code here
const stockfishWorker = new Worker("stockfish.js");

// Handle messages from Stockfish
stockfishWorker.onmessage = function (event) {
  // Handle messages from Stockfish here
};

// Export Stockfish instance
export default stockfishWorker;
