# TON Wallet Connect React Application

This React application provides a simple and intuitive interface for connecting TON wallets to web applications. It features a modern UI built with Tailwind CSS and Shadcn UI components.

## Features

- Connect/disconnect TON wallets
- Display wallet connection status
- Error handling for missing wallet extensions
- Responsive design with modern UI components
- Automatic connection status checking

## Prerequisites

Before running this application, you need:

- Node.js and npm installed
- A TON wallet browser extension (like TON Wallet)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tonconnect
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

## Technology Stack

- React.js
- Tailwind CSS
- Shadcn UI Components
- TON Connect Integration

## Project Structure

```
src/
  ├── components/
  │   ├── WalletConnect.js
  │   └── ui/
  │       └── alert.jsx
  ├── lib/
  │   └── utils.js
  ├── App.js
  └── index.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
