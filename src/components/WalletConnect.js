import React, { useState, useEffect } from "react";

const WalletConnect = () => {
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError("");

      if (typeof window.ton === "undefined") {
        throw new Error(
          "TON wallet extension not found. Please install it and reload the page.",
        );
      }

      // Request wallet connection using the correct API
      const result = await window.ton.send("ton_requestAccounts");

      if (result && result.length > 0) {
        setWalletAddress(result[0]);
        setConnected(true);
      } else {
        throw new Error("No wallet addresses received");
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ton !== "undefined") {
        try {
          const accounts = await window.ton.send("ton_requestAccounts");
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setConnected(true);
          }
        } catch (err) {
          console.log("Not connected:", err);
        }
      }
    };

    checkConnection();
  }, []);

  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-black rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-white font-medium">
              Connect your TON wallet
            </span>
          </div>
          <button
            onClick={connected ? disconnectWallet : connectWallet}
            disabled={isConnecting}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              connected
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } ${isConnecting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isConnecting
              ? "Connecting..."
              : connected
                ? "Disconnect"
                : "Connect Wallet"}
          </button>
        </div>

        {connected && walletAddress && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800">
              ✓ Wallet connected: {walletAddress.slice(0, 6)}...
              {walletAddress.slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
