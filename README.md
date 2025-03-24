# Ip-Tracer

Ip-Tracer is a Next.js application that tracks a user's IP address and logs any changes. It stores the user's IP history in localStorage and displays it in a table. If the IP changes, a new entry is added.

## Features
- Retrieves the user's IP from the Next.js server.
- Stores IP history in localStorage.
- Displays a table with previous IPs and timestamps.
- Adds a new entry only when the IP changes.
- Refresh button to manually check for a new IP.
- Styled using ShadCN and Tailwind CSS.

## Installation
### Prerequisites
- Node.js (>= 18)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/farhancdr/ip-trace.git
   cd ip-tracer
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Project Structure
```
/ip-tracer
 ├── app
 │   ├── actions/ip.ts     # Action to fetch user's IP
 │   ├── components
 │   │   ├── ui           # ShadCN UI components
 │   │   ├── IpTracker.tsx # Main component for tracking IP
 │   ├── page.tsx         # Main page displaying the IP history
 ├── public
 ├── styles
 ├── package.json
 ├── README.md
```

## Usage
1. The application fetches the user's IP from the server.
2. The IP is checked against stored history in `localStorage`.
3. If the IP is different from the last recorded IP, it is added to the table.
4. Users can manually refresh to check for IP changes.

## API Endpoint
- **GET /api/ip**: Returns the user's IP address.

## Deployment
You can deploy the project on platforms like:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS / DigitalOcean**

To deploy on Vercel:
```sh
npm install -g vercel
vercel
```

## License
This project is licensed under the MIT License.

## Author
- **Your Name**
- GitHub: [@farhancdr](https://github.com/farhancdr)
