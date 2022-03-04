import axios from 'axios';
import { GOOGLE_API_KEY } from '../configs/Environment';

const YoutubeAPI = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet,contentDetails',
    key: GOOGLE_API_KEY,
  },
});

export default YoutubeAPI;
