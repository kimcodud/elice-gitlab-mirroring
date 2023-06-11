import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
