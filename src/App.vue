<script setup lang="ts">
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import YoutubeAPI from './services/YoutubeAPI';

const videos = ref<gapi.client.youtube.PlaylistItem[]>([]);
const player = ref({});

async function execute() {
  const response = await YoutubeAPI.get('/playlistItems', {
    params: {
      playlistId: 'UUKiSOLXbf8zVdDJ6VfiPzgA',
    },
  });

  videos.value = response.data.items;
}

execute();

watch(videos, () => {
  if (videos.value.length > 0) {
    player.value = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: videos.value[0].contentDetails?.videoId,
      events: {},
    });
  }
});

function formatDate(date: string | undefined) {
  return date ? format(new Date(date), 'dd/MM/yyyy') : date;
}

</script>

<template>
  <div class="videos">
    <div class="video" >
      <span>
      {{
        formatDate(
          videos.length > 0 ?
          videos[0]?.contentDetails?.videoPublishedAt :
          ''
        )
      }} | {{videos.length > 0 ? videos[0].snippet?.title : ''}}</span>
      <div id="player"></div>
      <div class="controls">
        <button @click="player.playVideo()">
          <i class='bx bx-play bx-lg'></i>
        </button>
        <button @click="player.pauseVideo()">
          <i class='bx bx-pause bx-lg'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;

  padding: 16px;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #2c3e50;
  color: #ffffff;

  .videos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    .video {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      span {
        font-weight: 700;
        text-align: center;
      }

      .controls {
        button {
          border: 0;
          background: none;
          color: #fff;

          transition: all 0.2s ease-in-out;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
