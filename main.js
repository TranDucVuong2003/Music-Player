/**
 * 1. Render songs
 * 2. Scroll top
 * 3. play/ pause/ seek
 * 4. cd rotate
 * 5. next/ prev
 * 6. random
 * 7. next/ repeat when ended
 * 8. active song
 * 9. scroll active song into view
 * 10. play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress')


const app = {
    
    currentIndex: 0, // index hiện tại của bài hát
    isPlaying: false,
    songs: [
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }
    ],

    // Render song
    render: function () {
        const htmls = this.songs.map((song) => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
            </div>

            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>

            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `
        })
        $('.playlist').innerHTML = htmls.join('\n');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },


    // scroll to top
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        // Xử lí phóng to, thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

           

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;

        };

        //Xử lí khi click vào nút play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            
            } else {

                audio.play();
            }
        }
        
        //Khi song được play
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add("playing");
            
        }
        
        //Khi song được pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove("playing");
            
        }

        //Thanh progress chạy khi bài hát chạy
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //Xử lí khi tua bài hát
        progress.onchange = function(e){
            const seekTime = audio.duration  / 100 * e.target.value ;
            audio.currentTime = seekTime;
        }
    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        audio.load();

        
    },


    start: function () {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties();

        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render bài hát
        this.render();
    }
    // 
}

app.start();
