import { importAll } from '@/utils';
import './index.scss';

importAll(require.context('.', true, /\.svg$/));