// Sketchfab Viewer API: Start/Stop/Control Animation
var version = "1.12.1";
var uid = "6c6f6b9b63324f8b9abdcc72ed0c67cc";
var iframe = document.getElementById("api-frame");
var client = new window.Sketchfab(version, iframe);

var error = function error() {
  console.error("Sketchfab API error");
};

var _pollTime, duration;

var timeSlider;
var isSeeking;
var animationsList;
var current_anim;
var apiSkfb;
var speed = 0.5;
var pingpong = false;
var timeFactor = 1.0;

var success = function success(api) {
  apiSkfb = api;
  api.start(function () {
    api.addEventListener("viewerready", function () {
      ////////////////////////////////////////////
      // ANIMATION: WAIT FOR LOADING ////////////
      //////////////////////////////////////////
      // api.getAnimations(function (err, animations) {
      //     console.log(animations);
      //     animationsList = animations;

      //     if (animations.length > 0) {
      //     current_anim = 0;
      //     api.setCurrentAnimationByUID(animations[current_anim][0]);
      //     duration = animations[current_anim][2];
      //     isSeeking = false;

      //     }
      // });

      // Set animation at half speed
      // Set animation at half speed
      // Set animation at half speed




      api.setCycleMode('one', function (err) {
        if (!err) {
          window.console.log('Set animation cycle mode');
        }
      });


      /* INIZIO FUNZIONI ANIMAZIONE
      */
      api.getAnimations(function (err, animations) {
        if (!err) {
          //dichiaro le prime due animazioni
          var firstAnimation = animations[0][0];
          var secondAnimation = animations[1][0];
          var staticPose = "0";
          console.log(animations);
          api.setCurrentAnimationByUID("0", function (err) {
            /*   if (!err) {
                window.console.log("Set animation track to", firstAnimation);
              } */
          });

          document
            .getElementById("animV")
            .addEventListener("click", function () {
              api.setCurrentAnimationByUID(firstAnimation);
              // api.seekTo(0);
              api.play();
            });

          document
            .getElementById("animH")
            .addEventListener("click", function () {
              api.setCurrentAnimationByUID(secondAnimation);
              // api.seekTo(0);
              api.play();
            });

          document
            .getElementById("static")
            .addEventListener("click", function () {
              api.setCurrentAnimationByUID(staticPose);
            });
        }
      });
    });
  });
};



client.init(uid, {
  success: success,
  error: error,
  autostart: 1,
  preload: 1,
});
