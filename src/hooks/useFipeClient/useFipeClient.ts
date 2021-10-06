import { useRef } from 'react';
import FipeClient from '@/services/FipeClient';

const fipeClient = new FipeClient();

function useFipeClient() {
  const fipeClientRef = useRef(fipeClient);

  return fipeClientRef.current;
}

export default useFipeClient;
