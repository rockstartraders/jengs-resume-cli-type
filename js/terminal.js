$(function() {

  $('.prompt').html('root@<span style=color:#FFFFFF;>&nbspJames</span>_is_my_name:~#');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();

});

var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'whoami', 'education', 'security', 'programming', 'interests', 'love', 'media' ,'contact', 'clear', 'help'
  ];

  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up arrow key is 38 and 40 is down   http://www.javascripter.net/faq/keycodes.htm
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'clear':
        output_.innerHTML = '';
        this.value = '' ;
        return output('');


        case 'help':
        var help0 = '<br><center><i class="far fa-question-circle fa-7x"></i></center>';
        var help1 = '<center><p style="font-size:5vw";>Help</p></center><br>';
        var result1 = '<span style=color:#3ed400;>help</span>:&nbspDisplay this menu<br><span style=color:#3ed400;>about</span>:&nbspDisplay the reason why i chose a terminal website<br><span style=color:#3ed400;>admin</span>:&nbspDisplay all my skills related to <span style=color:#FFFFAF;><i>Server Administration</i></span><br><span style=color:#3ed400;>whoami</span>:&nbspDisplay all my information<br><span style=color:#3ed400;>education</span>:&nbspDisplay all my information about my education<br><span style=color:#3ed400;>contact</span>:&nbspSay hello<br><span style=color:#3ed400;>clear</span>:&nbspClear terminal text<br><span style=color:#3ed400;>github</span>:&nbspWill redirect you to my <i><span style=color:#FFFFAF;>Github Repo</span></i><br><span style=color:#3ed400;>programming</span>:&nbspDisplay programming languages I know<br><span style=color:#3ed400;>music</span>:&nbspMy playlist and music<br><span style=color:#3ed400;>games</span>:&nbspPlay a game <br><span style=color:#3ed400;>resume-dl</span>:&nbspDownload my Resume<br><span style=color:#3ed400;>settings</span>:&nbspChange terminal Appearance<br><br>';
        output(help0 + help1 + result1);
        break;

        case 'education':
        var education = '<br><center><i class="fas fa-user-graduate fa-7x"></i></center>';
        var education1 = '<center><p style="font-size:5vw";>Education</p></center><br>';
        var education2 = '<br>If you are looking for a B.S Graduate then my apologies but I\'m not the guy you are looking for. But if you need a person who do have a 10+ years knowledge and experience dealing with technical support issues and superb communication and customer service skills then, I may be the person you need. Lastly, If you need a person who spend his free time studying pentesting, programming and a linux lover at the same time for sure that\'s me.<br><br>Please feel free to contact me if I\'m the one you need.<br><br>';
        output(education + education1 + education2 );
        break;

        case 'programming':
        var coding = '<br><br><center><i class="fas fa-terminal fa-7x"></i></center>';
        var coding1 = '<center><p style="font-size:5vw";>Programming</p></center><br>';
        var coding2 = '<br><center>HTML, CSS, JAVASCRIPT and JQUERY <br> API’s and JSON<br>Bootstrap<br>REACT JS<br>VB.NET<br>JAVA<br>SQL<br>GIT<br>Bash Scripting<br>MARKDOWN (GitHub’s .MD modification)<br></center><center>Python (In creating CLI tools with the help of a REST API)</center><br><center>Please see my <span style=color:#4183C4;>Github Repo</span> to view samples.</center><br>';
        output(coding + coding1 + coding2);
        break;

        case 'admin':
        var coding = '<br><br><center><i class="fas fa-server fa-7x"></i></center>';
        var coding1 = '<center><p style="font-size:5vw";>Administration</p></center>';
        var coding2 = '<br><center>DNS<br>DHCP<br>Windows Server 2012 and 2016<br>File Share and DFS (Distributed File System)<br>Server Deployment<br>Group Policy Object<br>Forest (New and Existing)<br>Remote Access and Connectivity<br>Virtualization (Hyper-V and VMware)<br>Active Directory (GROUPS, COMPUTERS, USERS and O.U’s)<br></center><br>';
        output(coding + coding1 + coding2);
        break;


        case 'interests':
        var result = "<h1 style=text-align:center;>Interests</h1>";
        output(result);
        break;

        case 'contact':
         var libro = '<br><br><center><i class="fas fa-mobile-alt fa-7x"></i></center>';
         var libro1 = '<center><p style="font-size:5vw";>Contact</p></center><br>';
         var result = "<p>My bad, but I decided to remove my contact information here. Due to the reason that I received tons of spam emails and multi-level marketing proposal in the past which I'm not really interested in. Please feel free to send me an email using the contact form that I created for this purpose.<br>Please type the command \"<span style=color:#32CD32;>mail</span>\" to get to that page.<br><br>Thank You.</p><br> ";
         output(libro + libro1 + result);
         break;

        case 'whoami':
        var pagkakakilanlan = '<br><br><center><i class="far fa-id-card fa-7x"></i></center>';
        var result = '<br><center><p style="font-size:5vw";><span style=color:#FFFFAF;>JAMES PAUL ESPEÑA</p></center></span><br>';
        var resultas = 'About Me ? well I am currently working on an I.T outsourcing company in Manila. I do love my work but I also love<br>programming, I do freelance work sometimes, specially if it\'s my off wherein I develop small system for small company\'s or sometimes even personal use.<br><br>I preffer using vb.net for system development and html, css, js for basic website.My future plan is to study and master python because I know that you can build a lot of stuff using that programming langguage (even hacking tools YES).<br>I want study Cybersecurity too.See I want to do a lot of things but still I want to keep programming as part of my main arsenal.<br><br>How about you?<br>' ;
        output(pagkakakilanlan + result + resultas);
        break;

        case 'github':
        var result = window.open('https://github.com/rockstartraders');
        var result1 = '<br><center><span style=color:#4183C4;><i class="fab fa-github fa-7x"></i></span></center>';
        var result2 = '<center><p style="font-size:5vw";>Github</p></center><br>';
 		    output(result1 + result2 + "Thank You So Much For Visiting My <span style=color:#4183C4;>Github Repo</span>" + "<br>");
 		    break;

        case 'time':
        var result = currentDate = new Date();
        var resulta = "The Date and Time as well as your Timezone is :" + "<br>";
        output(resulta + result);
        break;

        case 'resume':
        var profile = '<br><center><i class="fas fa-user-tie fa-7x"></i></center>';
        var biodata = '<center><p style="font-size:5vw";>Resume</p></center><br>';
        var result = "My apoligies but I\'m not comfortable in providing my personal information specially online." + "<br>" + "But please feel free to email or contact me by typing the command  \t' mail ' . \t" + "<br>" + "And I will be glad to respond back to you and have my resume sent out when that happens.<br><br>";
        output( profile + biodata + result);
        break;

        case 'mail':
        var result = window.open('https://rockstartraders.github.io/james-cli-contact/contact.html');
        var result9 = '<br><br><center><i class="fa fa-mail-bulk fa-5x"></i></center>';
        var sulat = '<center><p style="font-size:5vw";>Mail</p></center><br>';
        output( result9 + sulat + "New Tab Session .. <br>Thank you so much for visiting my \"<span style=color:#32CD32;>mail</span>\" page.<br>I will try to get back to you as soon as I can.");
  		  break;

        case 'about':
         var inpormasyon = '<br><br><center><i class="fas fa-info fa-7x"></i></center>';
         var inpormasyon1 = '<center><p style="font-size:5vw";>About</p></center><br>';
         var inpormasyon2 = '<br>I decided to use a terminal website simply because I am a <span style=color:#3ed400;>LINUX</span> fan boy, Is it obvious? Also I love the simplicy of a terminal it\'s easy to maintain and I can update it any time I wanted. I do know to how to create a GUI based website,<br>But believe it or not this is harder to build compare to a GUI one.<br><br> This website is a mix of js and jquery and html of course plus a bunch of "<span style=color:#3ed400;>case statements</span>". I\'am not a fan of UBUNTU but the color of unity is something very unique that is why i decided to use this color hex <span style=color:#3ed400;>#300A24</span> as my background.<br>';
         output( inpormasyon + inpormasyon1 + inpormasyon2 );
         break;

         case 'settings':
         var settings = '<br><center><i class="fas fa-cog fa-7x"></i></center>';
         var settings1 = '<center><p style="font-size:5vw";>Settings</p></center>';
         var settings2 = '<br> To change the background color use the command :<span style=color:#3ed400;> bg-</span><i>Selected Option</i><br><br>Options:<br><span style=color:#3ed400;>default</span> : Default Color which is Unity<br><span style=color:#3ed400;>1</span> : Black <br><span style=color:#3ed400;>2</span> : Midnight Blue<br> <span style=color:#3ed400;>3</span> : Base 03 Solarized <br><span style=color:#3ed400;>4</span> : Material Grey <br><span style=color:#3ed400;>5</span> : Powershell<br><br>To change the font use the command :<span style=color:#3ed400;> font-</span><i>Selected Option</i><br><br>Options:<br><span style=color:#3ed400;>default</span> : Default font which is Quango<br><span style=color:#3ed400;>1</span> : Monospace <br><span style=color:#3ed400;>2</span> : Courier<br> <span style=color:#3ed400;>3</span> : IBM Plex Mono <br><span style=color:#3ed400;>4</span> : Segoe UI <br><span style=color:#3ed400;>5</span> : Consolas<br><span style=color:#3ed400;>6</span> : Cinzel<br><span style=color:#3ed400;>7</span> : Swanky and Moo Moo<br><span style=color:#3ed400;>8</span> : Orbitron<br><span style=color:#3ed400;>9</span> : Croissant One<br><span style=color:#3ed400;>10</span> : Poppins<br><br>';
         output(settings + settings1 + settings2 );
         break;

        //case 'skills':
        //  var inpormasyon = '<br><br><center><i class="fas fa-info fa-5x"></i></center>';
        //  var inpormasyon1 = '<center><p style="font-size:5vw";>Skills pero wala pa ako malagay</p></center><br>';
        //  output( inpormasyon + inpormasyon1 );
        //  break;
        //<span style=color:#3ed400;>skills</span>:&nbspOther skills I know<br>


          case 'games':
          var gameinfo = '<br><br><center><i class="fas fa-gamepad fa-7x"></i></center>';
          var gameinfo1 = '<center><p style="font-size:5vw";>My Browser Games</p></center><br>';
          var gameinfo2 = "<center> I know this is not relevant but every once in a while, <br>I want to play something and the best option is to embed it to my website.<br><br></center>";
          var gameinfo22 = "<center><span style=color:#ff0000;>Note:</span> Flash Player is needed for this to work.<br>Not Applicable for Mobile.</center><br><br>";
          var gameinfo3 = "<center>Game List [ <span style=color:#3ed400;>Type the string as is and enjoy</span> ]<br><br>pacman<br>neon-race<br>mk<br>metal-slug<br>bomberman<br>./giants<br><br></center>";
          output(gameinfo + gameinfo1 + gameinfo2 + gameinfo22 + gameinfo3);
          break;



           //game starts here //

           case 'pacman':
           var game1 = '<br/><br/><center><div align="center"><embed src="https://www.classicgamesarcade.com/games/pacman.swf" width="415px" height="500px" autostart="true" loop="false" controller="true"></embed></div></center><br/>';
           var game2 = '<center><div class="game">Play free games<a href="https://www.classicgamesarcade.com/" target="_blank" style="text-decoration:none" ;><span style="color:#3ed400";> Here</a></span></div></center><br>';
           output( game1  + game2 );
           break;

           case 'mk':
           var game1 = '<br/><br/><center><div align="center"><embed src="https://www.classicgamesarcade.com/games/mortal-kombat.swf" width="600px" height="500px" autostart="true" loop="false" controller="true"></embed></div></center><br/>';
           var game2 = '<br/><span style="color:#3ed400";>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspGame Controls</span><br> Arrow keys to move ↑ → ↓ ←  <br> A - punch <br> S - block<br>D - Kick <br> <center><div class="game">Play free games<a href="https://www.classicgamesarcade.com/" target="_blank" style="text-decoration:none" ;><span style="color:#3ed400";> Here</a></span></div></center><br>';
           output( game1 + game2 );
           break;

           case 'metal-slug':
           var game1 = '<br/><br/><center><div align="center"><embed src="https://www.classicgamesarcade.com/games/metalslug.swf" width="560px" height="400px" autostart="true" loop="false" controller="true"></embed></div></center><br/>';
           var game2 = '<br/><center><span style="color:#3ed400";>Game Controls</span> (Not good for mobile and small browser)</center><br> Once the game has loaded use the mouse to click the buttons on the screen to select the difficulty.<br>(in Japanese).<br><br> W A S D <span style="color:#3ed400";>==></span> are to move and duck<br> J K L <span style="color:#3ed400";>==></span> are to fire, jump and throw bombs <br><br><center><div class="game">Play free games<a href="https://www.classicgamesarcade.com/" target="_blank" style="text-decoration:none" ;><span style="color:#3ed400";> Here</a></span></div></center><br>';
           output( game1 + game2 );
           break;

           case 'bomberman':
           var game1 = '<br/><br/><center><div align="center"><embed src="https://www.classicgamesarcade.com/games/bomberman.swf" width="682px" height="614px" autostart="true" loop="false" controller="true"></embed></div></center><br/>';
           var game2 = '<br/><span style="color:#3ed400";>Game Controls</span><br> Arrow keys to move ↑ → ↓ ← <br> Delete key to drop bombs.<br><br><center><div class="game">Play free games<a href="https://www.classicgamesarcade.com/" target="_blank" style="text-decoration:none" ;><span style="color:#3ed400";> Here</a></span></div></center><br>';
           output( game1 + game2 );
           break;

           case 'neon-race':
           var game1 = '<br><br><center><div class="embed-container"><embed width="900" height="600" src="https://external.kongregate-games.com/gamez/0013/7834/live/embeddable_137834.swf" type="application/x-shockwave-flash"></embed></div></center>';
           var game2 = '<br><span style="color:#3ed400";>Game Control </span><br> Arrow keys to move ↑ → ↓ ← <br><br><center><div class="game">Play free games<a href="https://www.kongregate.com/" target="_blank" style="text-decoration:none" ;><span style="color:#3ed400";> Here</a></span></div></center><br>';
           output( game1 + game2 );
           break;

           case './giants':
           var game1 = '<br><br><center><div class="embed-container"><embed width="750" height="500" base="https://external.kongregate-games.com/gamez/0016/9695/live/" src="https://external.kongregate-games.com/gamez/0016/9695/live/embeddable_169695.swf" type="application/x-shockwave-flash"></embed></div></center>';
           var game2 = '<br><br><br><br><span style="color:#3ed400";>Game Controls </span><br>Mouse: <br>- To scroll the view, place mouse cursor at the edges of the screen<br>- Click the minimap to move the view around<br>- Double click hero’s portrait to center the screen on hero.<br>- To mute music, open in-game pause menu and set the music to off.<br><br>Hot keys:<br>- W,A,S,D or arrow keys for screen scrolling.<br>- 1, 2, 3 to activate spells.<br>- 4 for hero selection and move command.<br>- 5 to activate hero’s ability.<br>- E to start wave.<br>- Escape to cancel move command, target selection, or spells.<br>- Space bar to pause and un-pause game<br>- B to open bestiary<br><br><center><div class="game">Play free games<a href="https://www.kongregate.com/" target="_blank" style="text-decoration:none" ;><span style="color:#3ed400";> Here</a></span></div></center><br>';
           output( game1 + game2 );
           break;

           // Jquery ito //

           case 'liriko':
           var liriko = $('output').html('<object id="liriko" width="100%" height="700" data="http://slider.kz/"/>');
           var liriko2 = '<br>Online music player powered by Slider.kz<br>';
           var liriko3 = 'Previous Outputs will be deleted by doing this process.<br>';
           output( liriko2 + liriko3 );
           break;

           case 'pinilakang-tabing':
           var pilak = $('output').html('<object id="pilak" width="100%" height="700" data="http://wek.ovh/"/>');
           var pilak2 = '<br><center>Just Have Fun<br>Previous Outputs will be deleted by doing this process.<br>Just Re-type it.</center><br><br>';
           output(pilak2);
           break;



         // Playslist text

         case 'music':
         var musika = '<br><center><i class="fas fa-headphones-alt fa-5x"></i></center>';
         var musika1 = '<center><p style="font-size:5vw";>My Music</p></center><br>';
         var result = " Music List [ <span style=color:#3ed400;>Type the string as is and enjoy</span> ] <br><br>fade-to-black<br>leave-out-all-the-rest<br>norem<br>cemetery-gates<br>sad-but-true<br>scars<br>the-same-love<br>wag-ka-naman<br>you-wanted-more<br>kung-ikay-akin<br>minsan<br>pag-asa<br>dalaga<br>balewala<br>pauwi-na-ako<br>wish<br>rock<br><br>There is no playback function included here, If you need to change the song or music please make sure to <br>refresh this website first because it wont stop automatically or just enjoy it, finish the whole song before playing a new one. I promise to fix this on my free time.<br><br>";
         output( musika + musika1 + result);
         break;

            // Music Starts Here

        case 'scars':
        var audio = new Audio('./music/Scars.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspScars<br>';
        var audio3 = 'By:&nbspPapa Roach<br>';
        var audio4 = 'Genre:&nbspRock';
        output(audio2 + audio3 + audio4 );
        break;

        case 'leave-out-all-the-rest':
        var audio = new Audio('./music/Leave Out All The Rest.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspLeave Out All The Rest<br>';
        var audio3 = 'By:&nbspLinkin Park<br>';
        var audio4 = 'Genre:&nbspRock';
        output(audio2 + audio3 + audio4 );
        break;

        case 'the-same-love':
        var audio = new Audio('./music/The Same Love.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspSame Love<br>';
        var audio3 = 'By:&nbspThe Jets<br>';
        var audio4 = 'Genre:&nbsp80\'s Love Song' ;
        output(audio2 + audio3 + audio4 );
        break;

        case 'sad-but-true':
        var audio = new Audio('./music/Sad But True.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspSad But True<br>';
        var audio3 = 'By:&nbspMetallica<br>';
        var audio4 = 'Genre:&nbspRock';
        output(audio2 + audio3 + audio4 );
        break;

        case 'you-wanted-more':
        var audio = new Audio('./music/you wanted more.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspYou Wanted More<br>';
        var audio3 = 'By:&nbspTonic<br>';
        var audio4 = 'Genre:&nbspAlternative Rock';
        output(audio2 + audio3 + audio4 );
        break;


        case 'norem':
        var audio = new Audio('./music/Norem.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspNorem<br>';
        var audio3 = 'By:&nbspGloc-9 ft. J.Kris, Abaddon, Shanti Dope<br>';
        var audio4 = 'Genre:&nbspOPM&nbspRap';
        output(audio2 + audio3 + audio4 );
        break;

        case 'wag-ka-naman':
        var audio = new Audio('./music/Wag Ka Naman.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspWag Ka Naman<br>';
        var audio3 = 'By:&nbspLoraine feat. Smugglaz<br>';
        var audio4 = 'Genre:&nbspOPM&nbspRap';
        output(audio2 + audio3 + audio4 );
        break;



        case 'fade-to-black':
        var audio = new Audio('./music/Fade to black.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspFade To Black<br>';
        var audio3 = 'By:&nbspDisturbed<br>';
        var audio4 = 'Genre:&nbspRock<br>';
        output(audio2 + audio3 + audio4 );
        break;

        case 'cemetery-gates':
        var audio = new Audio('./music/pantera.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspCemetery Gates<br>';
        var audio3 = 'By:&nbspPantera<br>';
        var audio4 = 'Genre:&nbspRock<br>';
        output(audio2 + audio3 + audio4);
        break;

        case 'kung-ikay-akin':
        var audio = new Audio('./music/Kung Ikay Akin.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspKung Ikay Akin<br>';
        var audio3 = 'By:&nbspChocolate Factory via Wish 107.5 Live Performance<br>';
        var audio4 = 'Genre:&nbspRock&nbspOPM,&nbspReggae<br>';
        output(audio2 + audio3 + audio4);
        break;

        case 'minsan':
        var audio = new Audio('./music/Minsan.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspMinsan<br>';
        var audio3 = 'By:&nbspDello feat. Meg Fernandez from Rapkustic Session<br>';
        var audio4 = 'Genre:&nbspOPM,&nbspRap<br>';
        output(audio2 + audio3 + audio4);
        break;


        case 'pauwi-na-ako':
        var audio = new Audio('./music/Pauwi Nako.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspPauwi na ako<br>';
        var audio3 = 'By:&nbspO.C Dawgs via Wish 107.5 Live Performance<br>';
        var audio4 = 'Genre:&nbspOPM,&nbspRap<br>';
        output(audio2 + audio3 + audio4);
        break;

        case 'pag-asa':
        var audio = new Audio('./music/Pag-asa.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspPag-asa<br>';
        var audio3 = 'By:&nbspChocolate Factory feat. Sinio via Wish 107.5 Live Performance<br>';
        var audio4 = 'Genre:&nbspOPM,&nbspReggae,&nbspRap<br>';
        output(audio2 + audio3 + audio4);
        break;


        case 'dalaga':
        var audio = new Audio('./music/Dalaga.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspDalaga<br>';
        var audio3 = 'By:&nbsp allmo$t via Wish 107.5 Live Performance<br>';
        var audio4 = 'Genre:&nbspOPM,&nbspHip-Hop<br>';
        output(audio2 + audio3 + audio4);
        break;

        case 'balewala':
        var audio = new Audio('./music/Balewala.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspBalewala<br>';
        var audio3 = 'By:&nbsp Loonie and Ron Henley via Wish 107.5 Live Performance<br>';
        var audio4 = 'Genre:&nbspOPM,&nbspRap<br>';
        output(audio2 + audio3 + audio4);
        break;


        // converted music and join dito


        case 'wish':
        var audio = new Audio('./music/wish_rap.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspMy Playlist for OPM Rap<br>';
        var audio3 = 'By:&nbsp Various Artist via Wish 107.5 Live Performance<br>';
        var audio4 = 'Genre:&nbspOPM,&nbspRap<br>';
        output(audio2 + audio3 + audio4);
        break;

        case 'rock':
        var audio = new Audio('./music/rock.mp3');
        var audio = audio.play();
        var audio2 = '<br>Title:&nbspMy Playlist for Foreign Rock Music<br>';
        var audio3 = 'By:&nbsp Various Rock Artist<br>';
        var audio4 = 'Genre:&nbspForeign Rock<br>';
        output(audio2 + audio3 + audio4);
        break;


        // Download ng resume
        case 'resume-dl':
        var resume = window.open('././etc/james_resume.pdf');
        var resume2 = '<br>Thank you for downloading my resume.<br>For security reason please feel free to contact me to get the encryption key for my resume.<br>Please type <span style=color:#3ed400;>mail</span> to get in touch with me.<br>Cheers..<br>';
        output(resume2);
        break;


        // settings

        case 'bg-default':  // Black
        var bg = $("*").css("background-color", "#300A24");
        var bg2 =  '<br> Background color is changed to : <i><span style=color:#FFFFAF;>Default</span></i><br>';
        output(bg2);
        break;

        case 'bg-1':  // Black
        var bg = $("*").css("background-color", "#141414");
        var bg2 =  '<br> Background color is changed to : <i><span style=color:#FFFFAF;>Black</span></i><br>';
        output(bg2);
        break;


        case 'bg-2': // Midnight Blue
        var bg = $("*").css("background-color", "#003366");
        var bg2 =  '<br> Background color is changed to : <i><span style=color:#FFFFAF;>Midnight Blue</span></i><br>';
        output(bg2);
        break;

        case 'bg-3':  //Base 03 Solarized
        var bg = $("*").css("background-color", "#002b36");
        var bg2 =  '<br> Background color is changed to : <i><span style=color:#FFFFAF;>Base 03 Solarized</span></i><br>';
        output(bg2);
        break;

        case 'bg-4':  //Solarized Grey
        var bg = $("*").css("background-color", "#263238");
        var bg2 =  '<br> Background color is changed to : <i><span style=color:#FFFFAF;>Material Grey</span></i><br>';
        output(bg2);
        break;

        case 'bg-5':  //Powershell
        var bg = $("*").css("background-color", "#05264c");
        var bg2 = '<br> Background color is changed to : <i><span style=color:#FFFFAF;>Powershell</span></i><br>';
        output(bg2);
        break;


         // Settings for Font

        case 'font-default':  //monospace
        var font = $("body,.typewrite,#sulat").css("font-family","Quango");
        var font2 = '<br> Font-family is set to <i><span style=color:#FFFFAF;>default</span></i><br>';
        output(font2);
        break;

        case 'font-1':  //monospace
        var font = $("body,.typewrite,#sulat").css("font-family","monospace");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Monospace</span></i><br>';
        output(font2);
        break;


        case 'font-2':  //COURIER
        var font = $("body,.typewrite,#sulat").css("font-family","Courier");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Courier</span></i><br>';
        output(font2);
        break;

        case 'font-3':  //IBM Plex Mono
        var font = $("body,.typewrite,#sulat").css("font-family","IBM Plex Mono");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>IBM Plex Mono</span></i><br>';
        output(font2);
        break;

        case 'font-4':  //Segoe UI
        var font = $("body,.typewrite,#sulat").css("font-family","Segoe UI");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Segoe UI</span></i><br>';
        output(font2);
        break;

        case 'font-5':  //Consolas
        var font = $("body,.typewrite,#sulat").css("font-family","Consolas");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Consolas</span></i><br>';
        output(font2);
        break;

        case 'font-6':  //Cinzel
        var font = $("body,.typewrite,#sulat").css("font-family","Cinzel");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Cinzel</span></i><br>';
        output(font2);
        break;


        case 'font-7':  //Swanky and Moo Moo
        var font = $("body,.typewrite,#sulat").css("font-family","Swanky and Moo Moo");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Swanky and Moo Moo</span></i><br>';
        output(font2);
        break;

        case 'font-8':  //Orbitron
        var font = $("body,.typewrite,#sulat").css("font-family","Orbitron");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Orbitron</span></i><br>';
        output(font2);
        break;

        case 'font-9':  //Croissant One
        var font = $("body,.typewrite,#sulat").css("font-family","Croissant One");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Croissant One</span></i><br>';
        output(font2);
        break;

        case 'font-10':  //Poppins
        var font = $("body,.typewrite,#sulat").css("font-family","Poppins");
        var font2 = '<br> Font-family is changed to : <i><span style=color:#FFFFAF;>Poppins</span></i><br>';
        output(font2);
        break;



        // Mock command

        case 'ls':  //Consolas
        var mock = '<br><span style=color:#3ed400;>ls </span>command : That means that you have knowledge in using <i><span style=color:#FFFFAF;>Unix/Linux</span></i>, but <span style=color:#3ed400;>ls</span> command is not applicable though. Type help instead.<br><br>';
        output(mock);
        break;

        case 'pwd':  //Consolas
        var mock = '<br><span style=color:#3ed400;>pwd </span>command : Stands for <i><span style=color:#FFFFAF;>Present Working Directory </span></i>, but this is not a terminal and <span style=color:#3ed400;>pwd </span> command is not applicable though. But I am sure you\'re inside my portfolio.<br>Please type help for options.<br><br>';
        output(mock);
        break;



        default:
        if (cmd) {
          eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8(9+\': b 7 d \'+\'!\'+"<1>"+"6 3 4 5 a c m e."+"<1>"+" n o &2 \'<0 k=j:#f;>g</0>\' &2 h i l.")',25,25,'span|br|nbsp|Cannot|Recall|Creating|I|not|output|cmd||command|Command|found|That|32CD32|help|for|Further|color|style|Assistance|Like|Please|Type'.split('|'),0,{}));
        }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }


  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
    'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
    colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
      Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
      Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
      Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('');

    },
    output: output
  }
};



// type writer effect starts here == gusto ko happy ka //

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};



window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS to HTML para mas happy //
  var css = document.createElement("style");
  css.type = "terminal/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
