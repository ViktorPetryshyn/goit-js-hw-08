import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(e) {
  let currentTime = e.seconds;
  localStorage.setItem(CURRENT_TIME, currentTime);
}
function playWithCurrentTime() {
  let currentTimeInStorage = localStorage.getItem(CURRENT_TIME);
  if (currentTimeInStorage) {
    player
      .setCurrentTime(currentTimeInStorage)
      .then(function (currentTimeInStorage) {
        console.log('Current time:', currentTimeInStorage);
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            console.error(
              'the time was less than 0 or greater than the video’s duration'
            );
            break;
          default:
            console.log('some other error occurred');
            break;
        }
      });
  }
}
playWithCurrentTime();
