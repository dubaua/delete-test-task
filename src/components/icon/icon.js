import { importAll } from '@/utils';
import './icon.scss';

importAll(require.context('.', true, /\.svg$/));