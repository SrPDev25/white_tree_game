import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  //Load .env file
  const env = loadEnv(mode, process.cwd(), '');

  //Server config
  const server = {
		port: Number(env.VITE_SERVER_PORT) || 80,
		hmr: {
			clientPort: Number(env.VITE_HMR_PORT) || 443,
			port:  Number(env.VITE_SERVER_PORT) || 80,
		},
	};

  return {
    plugins: [react()],
    define: {
      //Expose the API_URL to the client
      'import.meta.env.API_URL': JSON.stringify(env.API_URL)
    },
    server
  };
})
