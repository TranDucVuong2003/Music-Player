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
const nextBtn = $('.btn-next');
const preBtn = $('.btn-prev');
const randomBtn = $('.btn-random')


const app = {
    
    currentIndex: 0, // index hiện tại của bài hát
    isPlaying: false,
    songs: [
        {
            name: ' Nơi này có Vương',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/noi_nay_co_anh.mp3',
            image: './assets/img/noi_nay_co_anh.jpg',
        }, {
            name: ' Đừng làm trái tym Vương đau',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/dung_lam_trai_tym_anh_dau.mp3',
            image: './assets/img/dung_lam_trai_tym_anh_dau.jpg',
        }, {
            name: ' Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/muon_roi_ma_sao_con.mp3',
            image: './assets/img/muon-roi-ma-sao-con.jpg',
        }, {
            name: ' Dấu mưa',
            singer: 'Trung Quân Idol',
            path: './assets/music/dau_mua.mp3',
            image: './assets/img/dau-mua.jpg',
        }, {
            name: ' Em là',
            singer: 'MONO',
            path: './assets/music/em_la.mp3',
            image: './assets/img/em-la.jpg',
        }, {
            name: ' Hẹn em ở lần yêu thứ 2',
            singer: 'Nguyenn x Đặng Tuấn Vũ',
            path: './assets/music/hen_em_o_lan_yeu_thu_2.mp3',
            image: './assets/img/hen-em-o-lan-yeu-thu-2.jpg',
        }, {
            name: ' Ngôi nhà hạnh phúc',
            singer: 'Nhật Phát',
            path: './assets/music/ngoi_nha_hanh_phuc.mp3',
            image: './assets/img/ngoi-nha-hanh-phuc.jpg',
        }, {
            name: ' Nơi này có anh ',
            singer: 'Vũ Cát Tường',
            path: './assets/music/tung_la.mp3',
            image: './assets/img/tung-la.jpg',
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

    // Định nghĩa currentSong
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },


    // Xử lí các events
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        //Xử lí CD quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, // 10s
            iterations: Infinity
        })

        cdThumbAnimate.pause();

        // console.log(cdThumbAnimate);
        


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
            cdThumbAnimate.play();
            
        }
        
        //Khi song được pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
            
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

        //Xử lí khi onclick vòa nextBtn
        nextBtn.onclick = function(){
            _this.nextSong();
            audio.play();
        }


        //Xử lí khi onclick vào preBtn
        preBtn.onclick = function(){
            _this.preSong();
            audio.play();
        }

        //Xử lí khi onclick vào random
        randomBtn.onclick = function(){
            _this.randomSong();
            audio.play();
        }
    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        audio.load();
    },

    //Nút next song
    nextSong: function (){
        this.currentIndex++
        // console.log('check',this.currentIndex , this.songs.length - 1);
        
        if(this.currentIndex >= this.songs.length ){
            this.currentIndex = 0;
        }

        this.loadCurrentSong()
    },

    //Nút pre song
    preSong: function (){
        this.currentIndex--
        // console.log('check',this.currentIndex , this.songs.length - 1);
        
        if(this.currentIndex == -1 ){
            this.currentIndex = this.songs.length -1 ;
        }
 
        this.loadCurrentSong()
    }, 

    //Nút random song
    randomSong: function(){
        this.currentIndex = Math.floor( Math.random()*this.songs.length );

        console.log('random currentIndex: ', this.currentIndex,this.songs.length );
        
        this.loadCurrentSong();
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
}

app.start();
//57:57