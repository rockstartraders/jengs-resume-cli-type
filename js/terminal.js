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
        var result = (function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('<0 2=1-3:4;>5</0><6>',7,7,'h1|text|style|align|center|Help|br'.split('|'),0,{}));
        var result1 = (function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('<0 3=2:#5;><b>j</0>:</b>&4 7 8 6 9.<1><0 3=2:#5;><b>d</0>:</b>&4 7 8 6 9 f 6 d.<1><0 3=2:#5;><b>a</0>:</b>&4 7 8 6 a.<1><0 3=2:#5;><b>i</0>:</b>&4 h g<1><0 3=2:#5;><b>e</0>:</b>&4 e o<1><0 3=2:#5;><b>p</0>:</b>&4 7 n k.<1><0 3=2:#5;><b>c</0>:</b>&4 7 8 6 9 f 6 l m c.<1>',26,26,'span|br|color|style|nbsp|32CD32|my|display|all|information|interests||programming|education|clear|about|hello|Say|contact|whoami|menu|achievements|in|this|terminal|help'.split('|'),0,{}));
        output(result + result1);
        break;

        case 'education':
        var result = (function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('<0 1=2-5:3;>4</0>',6,6,'h1|style|text|center|Education|align'.split('|'),0,{}));
        output(result);
        break;

        case 'programming':
        var coding = '<br><br><center><i class="fas fa-terminal fa-5x"></i></center><br>';
        var result = (function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('<0 2=1-3:4;>6 5</0>',7,7,'h1|text|style|align|center|Programmer|Competitive'.split('|'),0,{}));
        output(coding + result);
        break;

        case 'interests':
        var result = "<h1 style=text-align:center;>Interests</h1>";
        output(result);
        break;

        case 'contact':
         var libro = '<br><br><center><i class="fas fa-mobile-alt fa-5x"></i></center><br>';
         var result = "<h1 style=text-align:center;>Contact</h1><br><p>My bad, but I decided to remove my contact information here. Due to the reason that I received tons of spam emails and multi-level marketing proposal in the past which I'm not really interested in. Please feel free to send me an email using the contact form that I created for this purpose.<br>Please type the command \"<span style=color:#32CD32;>mail</span>\" to get to that page.<br><br>Thank You.</p> ";
         output(libro + result);
         break;

        case 'whoami':
        var pagkakakilanlan = '<br><br><center><i class="far fa-id-card fa-5x"></i></center><br>';
        var result = (function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('<0 3=2-1:4;>5 8 7ñ6</0>',9,9,'h1|align|text|style|center|James|a|Espe|Paul'.split('|'),0,{}));
        output(pagkakakilanlan + result);
        break;

        case 'github':
        var result = window.open('https://github.com/rockstartraders');
        var result1 = '<br><center><i class="fab fa-github-alt fa-5x"></i></center>';
        var result2 = '<center><p style="font-size:50px";>Github</p></center><br><br>';
 		    output(result1 + result2 + "Thank You So Much For Visiting My Github Page." + "<br>" + "Hope You Like It.");
 		    break;

        case 'time':
        var result = currentDate = new Date();
        var resulta = "The Date and Time as well as your Timezone is :" + "<br>";
        output(resulta + result);
        break;

        case 'resume':
        var result = eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('i h,&0 g I\'m f j k p 4 o n e q.<2>a 7 5 9 1 d b c 8 6 l H G&0"<3 r=E:#D;>J</3>"&0 K I<2>M L C 1 B v 1 u t s 4 w x A z y F.',49,49,'nbsp|to|br|span|my|feel|by|please|me|free|But|or|contact|email|especially|not|but|apologies|My|comfortable|in|typing||information|personal|providing|online|style|have|and|you|back|resume|sent|that|when|out|respond|glad|32CD32|color|happens|command|the||mail|And|be|will'.split('|'),0,{}));
        output(result);
        break;

        case 'mail':
        var result = window.open('https://rockstartraders.github.io/james-cli-contact/contact.html');
        var result9 = '<br><br><center><i class="fa fa-mail-bulk fa-5x"></i></center><br>';
        output( result9 + "<h1 style=text-align:center;>mail</h1><br>New Tab Session .. <br>Thank you so much for visiting my \"<span style=color:#32CD32;>mail</span>\" page.<br>I will try to get back to you as soon as I can.");
  		  break;


        //

        case 'y':

        var result = '';
        output(result);
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
