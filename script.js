let currentScreen = 'welcome';
let userGender = '';
let userName = '';
let quizIndex = 0;
let userAnswers = [];
let finalAnswer = '';

const questions = {
  male: [
    { q: "What do you love most about the woman you're thinking of?", options: ["Her beautiful smile", "Her kind heart", "The way her eyes sparkle", "Everything about her"] },
    { q: "What would you whisper in her ear during a slow dance?", options: ["You're so beautiful", "I've been dreaming of this", "I never want to let you go", "You feel like home"] },
    { q: "How would you hold her hand on your first real date?", options: ["Gently intertwined fingers", "Warm and protective", "Soft and careful", "Palm to palm, heart to heart"] },
    { q: "What part of her do you find most attractive?", options: ["Her eyes that speak volumes", "Her lips that make me smile", "Her hair that shines like silk", "Her curves that drive me crazy"] },
    { q: "How would you kiss her goodnight?", options: ["A soft gentle kiss on the lips", "A passionate long embrace", "A sweet kiss on her forehead", "A slow kiss that says everything"] },
    { q: "What would you text her first thing in the morning?", options: ["Good morning beautiful", "I dreamed of you again", "Can't wait to see you today", "You were the first thing on my mind"] },
    { q: "What makes your heart race when you think of her?", options: ["The thought of her smile", "Remembering her touch", "Her voice echoing in my mind", "The way she says my name"] },
    { q: "How would you propose to the love of your life?", options: ["On one knee under a starry sky", "At the place we first met", "With a surprise romantic dinner", "During a sunset walk on the beach"] }
  ],
  female: [
    { q: "What do you love most about the man you're thinking of?", options: ["His strong protective arms", "His charming smile", "The way he looks at me", "His confidence and warmth"] },
    { q: "What would you whisper to him during a quiet moment?", options: ["You make me so happy", "I feel so safe with you", "You're my everything", "I've never felt this way before"] },
    { q: "How would you want him to hold you?", options: ["Wrapped in his strong arms", "Spooning from behind", "Hand in hand on a walk", "Pulled close with his hand on my waist"] },
    { q: "What part of him drives you wild?", options: ["His strong arms around me", "His deep voice in my ear", "His hands holding mine", "His smile that lights up my world"] },
    { q: "How would you want him to kiss you?", options: ["Slow and passionate", "Soft and tender", "Out of nowhere, sweeping me off my feet", "A long kiss that says I'm his"] },
    { q: "What would you text him late at night?", options: ["I can't stop thinking about you", "Wish you were here with me", "You looked so handsome today", "I'm counting the hours till I see you"] },
    { q: "What does his touch feel like to you?", options: ["Like electricity running through me", "Warm and safe, like home", "Gentle and full of love", "Strong and protective"] },
    { q: "How would you want him to propose?", options: ["On a beach at sunset with a ring", "Getting down on one knee in private", "In the middle of a romantic dance", "A surprise that makes me cry happy tears"] }
  ]
};

const happyPoems = [
  `You came like dawn, so soft and bright,\nChasing away the lonely night.\nMy heart once locked, you found the key,\nForever yours, and you for me.\n\nWith every breath, with every beat,\nMy love for you is so complete.\nA love like ours, so rare and true,\nI'll spend my life loving you.`,
  `In your eyes I found my home,\nA place I never walk alone.\nYour hand in mine, through joy and tears,\nWe'll build a love that conquers years.\n\nLike stars above, we shine as one,\nOur journey's just been begun.\nWith every sunrise, every kiss,\nI fall for you in sweet abyss.`
];

const sadPoems = [
  `Some hearts are meant to touch and go,\nLike rivers learning how to flow.\nThough you walked away from me,\nYou taught my heart how to be free.\n\nI'll keep the memories soft and sweet,\nThe echo of your heart's heartbeat.\nAnd though we couldn't find our way,\nI'm grateful for that golden day.`,
  `Love is not always meant to stay,\nSometimes it just comes to show the way.\nYou showed me how to feel so deep,\nA secret only my heart will keep.\n\nI'll hold no anger, no regret,\nJust a sweetness I can't forget.\nMaybe in another time or place,\nI'd get to see your smiling face.`
];

const surpriseMessages = [
  "You have the kindest soul I've ever known.",
  "Your smile lights up every room you enter.",
  "You are stronger than you will ever know.",
  "The world is better because you are in it.",
  "Your heart is made of pure gold.",
  "You deserve all the love this world can give.",
  "Never forget how special you truly are.",
  "Your laugh is the most beautiful melody.",
  "You are someone's greatest dream come true.",
  "Keep shining, the world needs your light.",
  "Your kindness changes lives every day.",
  "You are worthy of all things beautiful."
];

function goToScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) {
    el.classList.add('active');
    currentScreen = id;
    reapplyAnimations(el);
  }
  document.getElementById('music-status').style.display =
    (id === 'admin' || id === 'admin-login') ? 'none' : '';
}

function reapplyAnimations(el) {
  el.querySelectorAll('.fade-in, .slide-in, .zoom-in').forEach(e => {
    e.style.animation = 'none';
    void e.offsetWidth;
    e.style.animation = '';
  });
}

function selectGender(gender) {
  userGender = gender;
  userAnswers = [];
  quizIndex = 0;
  startMusic();
  goToScreen('name');
  setTimeout(function() {
    document.getElementById('nameInput').focus();
  }, 500);
}

function submitName() {
  var name = document.getElementById('nameInput').value.trim();
  if (!name) {
    document.getElementById('nameInput').style.borderColor = '#ff4d7a';
    document.getElementById('nameInput').placeholder = 'Please enter your name...';
    return;
  }
  userName = name;
  goToScreen('quiz');
  setTimeout(showQuestion, 400);
}

function showQuestion() {
  const qs = questions[userGender];
  if (quizIndex >= qs.length) {
    goToScreen('final');
    const label = userGender === 'male' ? 'boyfriend' : 'girlfriend';
    document.getElementById('finalQuestion').textContent = `Will you be my ${label}?`;
    return;
  }

  const q = qs[quizIndex];
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('questionNum').textContent = `${quizIndex + 1}/${qs.length}`;
  document.getElementById('progressFill').style.width = `${((quizIndex) / qs.length) * 100}%`;

  const opts = document.getElementById('quizOptions');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    btn.style.animation = `fadeIn 0.4s ease ${i * 0.1}s both`;
    opts.appendChild(btn);
  });
}

function selectAnswer(answer) {
  userAnswers.push(answer);
  quizIndex++;
  setTimeout(showQuestion, 300);
}

function answerFinal(yes) {
  finalAnswer = yes ? 'yes' : 'no';
  if (yes) {
    goToScreen('success');
    const poem = happyPoems[Math.floor(Math.random() * happyPoems.length)];
    document.getElementById('happyPoem').textContent = poem;
    startConfetti();
  } else {
    goToScreen('heartbreak');
    const poem = sadPoems[Math.floor(Math.random() * sadPoems.length)];
    document.getElementById('sadPoem').textContent = poem;
  }
  submitQuizData();
}

function submitQuizData() {
  const qs = questions[userGender];
  const qaList = userAnswers.map((answer, i) =>
    `Q${i+1}: ${qs[i].q}\nA: ${answer}`
  ).join('\n\n');

  db.collection('quiz_responses').add({
    name: userName,
    gender: userGender,
    answers: userAnswers,
    final_answer: finalAnswer,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    emailjs.send('service_9d8acod', 'template_rgdgacp', {
      name: userName,
      gender: userGender,
      final_answer: finalAnswer,
      answers: qaList
    }).catch(console.error);
  }).catch(console.error);
}

function restartApp() {
  stopConfetti();
  stopMusic();
  userGender = '';
  userName = '';
  quizIndex = 0;
  userAnswers = [];
  goToScreen('welcome');
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('surpriseBoxes').innerHTML = '';
}

function generateSurpriseBoxes() {
  const grid = document.getElementById('surpriseBoxes');
  grid.innerHTML = '';
  const msgs = shuffle([...surpriseMessages]);
  msgs.forEach((msg, i) => {
    const box = document.createElement('div');
    box.className = 'surprise-box';
    box.innerHTML = `<span class="box-front">${['&#127873;', '&#10084;', '&#127800;', '&#11088;', '&#127775;', '&#127801;', '&#128153;', '&#127799;', '&#128158;', '&#128149;', '&#127826;', '&#127838;'][i]}</span><span class="box-back">${msg}</span>`;
    box.onclick = () => {
      if (!box.classList.contains('opened')) {
        box.classList.add('opened');
      }
    };
    grid.appendChild(box);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ---- Confetti ---- */
let confettiActive = false;
let confettiPieces = [];

function startConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettiActive = true;
  confettiPieces = [];

  const colors = ['#ff4d7a', '#ff9ecf', '#c44dff', '#ffd700', '#ff6b9d', '#ff1493', '#ff69b4'];

  for (let i = 0; i < 200; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 10 - 5,
      opacity: 1
    });
  }

  function animate() {
    if (!confettiActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function stopConfetti() {
  confettiActive = false;
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ---- Particles / Floating Hearts ---- */
function createFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '&#10084;';
    heart.innerHTML = '&#10084;';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.color = ['#ff4d7a', '#ff9ecf', '#c44dff', '#ff6b9d', '#ff1493'][Math.floor(Math.random() * 5)];
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 400);
}



/* ---- Music Player ---- */
var playlist = [];

var defaultPlaylist = [
  { title: "Perfect", icon: "\uD83C\uDFB6", path: "audio/Ed Sheeran - Perfect [Official Audio] - ilovethatsongtoo.mp3" },
  { title: "Say You Won't Let Go", icon: "\uD83E\uDD0D", path: "audio/361.James Arthur - Say You Won't Let Go.mp3" },
  { title: "Lucid Dreams", icon: "\uD83C\uDF19", path: "audio/Juice-WRLD-Lucid-Dreams-(HipHopKit.com).mp3" },
  { title: "Someone You Loved", icon: "\uD83D\uDC94", path: "audio/Lewis Capaldi - Someone You Loved.mp3" },
  { title: "MOONLIGHT", icon: "\uD83C\uDF19", path: "audio/xxxtentacion - MOONLIGHT.mp3" },
  { title: "Another Love", icon: "\uD83D\uDC9C", path: "audio/Another Love - Tom Odell.mp3" },
  { title: "A Thousand Years", icon: "\u23F3", path: "audio/A Thousand Years - Christina Perri - reduzida.mp3" },
  { title: "Dandelions", icon: "\uD83C\uDF3C", path: "audio/Ruth B. - Dandelions (Lyrics).mp3" },
  { title: "Lovely", icon: "\uD83D\uDC9C", path: "audio/Billie Ellish, Khaild- Lovely.mp3" },
  { title: "Older", icon: "\uD83D\uDC75", path: "audio/Older- Sasha Sloan.mp3" },
  { title: "you broke me first", icon: "\uD83D\uDC94", path: "audio/Tate McRae - you broke me first (JUST JAMES Remix).mp3" }
];

function loadPlaylist(callback) {
  db.collection('playlist').orderBy('order').get().then(function(snapshot) {
    if (snapshot.empty) {
      playlist = [].concat(defaultPlaylist);
    } else {
      playlist = [];
      snapshot.forEach(function(doc) {
        var d = doc.data();
        d.firestoreId = doc.id;
        playlist.push(d);
      });
    }
    if (callback) callback();
  }).catch(function() {
    playlist = [].concat(defaultPlaylist);
    if (callback) callback();
  });
}

var audioEls = [new Audio(), new Audio()];
var activeIdx = 0;
var trackIdx = 0;
var shuffledTracks = [];
var crossfading = false;
var playing = false;

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function setSongStatus(text, icon) {
  var el = document.getElementById('music-status');
  if (el) {
    el.innerHTML = '<span class="status-icon emoji-icon">' + (icon || '\u266B') + '</span><span class="status-label">' + text + '</span>';
    el.style.opacity = '1';
  }
}

function startMusic() {
  if (playing) return;
  playing = true;
  shuffledTracks = shuffle([].concat(playlist));
  trackIdx = 0;
  activeIdx = 0;
  playCurrent();
}

var songTimer = null;

function playCurrent() {
  var track = shuffledTracks[trackIdx];
  var el = audioEls[activeIdx];
  el.src = track.path;
  el.volume = 1;
  el.play().catch(function(){});
  setSongStatus(track.title, track.icon);

  if (songTimer) clearTimeout(songTimer);
  songTimer = setTimeout(function() {
    if (!crossfading && playing) {
      doCrossfade(el);
    }
  }, 25000);

  el.addEventListener('ended', function onEnd() {
    el.removeEventListener('ended', onEnd);
    if (songTimer) clearTimeout(songTimer);
    if (trackIdx >= shuffledTracks.length - 1) {
      location.reload();
    } else {
      if (!crossfading) doCrossfade(el);
    }
  });
  shuffleNext();
}

function shuffleNext() {
  var nextTrackIdx = (trackIdx + 1) % shuffledTracks.length;
  if (nextTrackIdx === 0) shuffledTracks = shuffle([].concat(playlist));
  var nextEl = audioEls[1 - activeIdx];
  nextEl.src = shuffledTracks[nextTrackIdx].path;
  nextEl.volume = 0;
}

function watchForFade(el) {
  var handler = function() {
    if (!el.duration || crossfading) return;
    var remain = el.duration - el.currentTime;
    if (remain <= 2.5 && remain > 0) {
      el.removeEventListener('timeupdate', handler);
      doCrossfade(el);
    }
  };
  el.addEventListener('timeupdate', handler);
}

function doCrossfade(oldEl) {
  crossfading = true;
  trackIdx = (trackIdx + 1) % shuffledTracks.length;
  if (trackIdx === 0) shuffledTracks = shuffle([].concat(playlist));

  var newEl = audioEls[1 - activeIdx];
  newEl.volume = 0;
  newEl.play().catch(function(){});
  var track = shuffledTracks[trackIdx];
  setSongStatus(track.title, track.icon);

  var start = Date.now();
  var dur = 2000;

  function ramp() {
    var p = Math.min((Date.now() - start) / dur, 1);
    oldEl.volume = 1 - p;
    newEl.volume = p;
    if (p < 1) {
      requestAnimationFrame(ramp);
    } else {
      oldEl.pause();
      oldEl.src = '';
      activeIdx = 1 - activeIdx;
      crossfading = false;
      watchForFade(newEl);
      var nextTrackIdx = (trackIdx + 1) % shuffledTracks.length;
      if (nextTrackIdx === 0) shuffledTracks = shuffle([].concat(playlist));
      var nextEl = audioEls[1 - activeIdx];
      nextEl.src = shuffledTracks[nextTrackIdx].path;
      nextEl.volume = 0;
    }
  }
  ramp();
}

function stopMusic() {
  playing = false;
  crossfading = false;
  audioEls[0].pause(); audioEls[0].src = '';
  audioEls[1].pause(); audioEls[1].src = '';
}

/* ---- Admin Panel ---- */

var adminLoggedIn = false;

function adminLogin() {
  var email = document.getElementById('adminUser').value.trim();
  var password = document.getElementById('adminPass').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async function(result) {
      var token = await result.user.getIdTokenResult();
      if (token.claims.admin) {
        adminLoggedIn = true;
        document.getElementById('adminLoginError').textContent = '';
        goToScreen('admin');
        refreshAdminData();
      } else {
        document.getElementById('adminLoginError').textContent = 'This account is not an admin.';
        firebase.auth().signOut();
      }
    })
    .catch(function(err) {
      document.getElementById('adminLoginError').textContent = err.message;
    });
}

function adminLogout() {
  adminLoggedIn = false;
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  document.getElementById('adminLoginError').textContent = '';
  firebase.auth().signOut();
  goToScreen('welcome');
}

function refreshAdminData() {
  var list = document.getElementById('adminList');
  list.innerHTML = '<div class="admin-loading">Loading...</div>';
  db.collection('quiz_responses').orderBy('createdAt', 'desc').get()
    .then(function(snapshot) {
      document.getElementById('adminCount').textContent = '(' + snapshot.size + ' total)';
      if (snapshot.empty) {
        list.innerHTML = '<div class="admin-empty">No responses yet</div>';
        return;
      }
      list.innerHTML = '';
      snapshot.forEach(function(doc) {
        var d = doc.data();
        var id = doc.id;
        var dateStr = '';
        if (d.createdAt) {
          var date = d.createdAt.toDate();
          dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        }
        var genderEmoji = d.gender === 'male' ? '\u2642' : '\u2640';
        var finalEmoji = d.final_answer === 'yes' ? '\u2764' : '\uD83D\uDC94';
        var qs = questions[d.gender] || [];

        var card = document.createElement('div');
        card.className = 'admin-card';
        var header = document.createElement('div');
        header.className = 'admin-card-header';
        header.onclick = function() { this.parentNode.classList.toggle('open'); };
        header.innerHTML =
          '<div>' +
            '<div class="admin-card-name">' + escHtml(d.name || 'Anonymous') + ' <span style="color:#a070a0;font-size:0.85em">' + genderEmoji + ' ' + finalEmoji + '</span></div>' +
            '<div class="admin-card-meta"><span>' + dateStr + '</span><span>' + id.slice(0,8) + '</span></div>' +
          '</div>' +
          '<span class="admin-card-toggle">\u25BC</span>';
        var details = document.createElement('div');
        details.className = 'admin-card-details';
        details.innerHTML = d.answers.map(function(ans, i) {
          var qText = qs[i] ? qs[i].q : 'Q' + (i+1);
          return '<div class="admin-qa"><strong>' + escHtml(qText) + '</strong><br>A: ' + escHtml(ans) + '</div>';
        }).join('');
        var actions = document.createElement('div');
        actions.className = 'admin-card-actions';
        var delBtn = document.createElement('button');
        delBtn.className = 'glow-btn delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.onclick = function(e) { e.stopPropagation(); deleteResponse(id); };
        actions.appendChild(delBtn);
        details.appendChild(actions);
        card.appendChild(header);
        card.appendChild(details);
        list.appendChild(card);
      });
    })
    .catch(function(err) {
      list.innerHTML = '<div class="admin-empty">Error loading data</div>';
      console.error(err);
    });
}

function deleteResponse(id) {
  if (!confirm('Delete this response?')) return;
  db.collection('quiz_responses').doc(id).delete()
    .then(function() {
      refreshAdminData();
    })
    .catch(console.error);
}

function escHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ---- Override goToScreen ---- */
const origGoToScreen = goToScreen;
goToScreen = function(id) {
  origGoToScreen(id);
  if (id === 'surprise') {
    generateSurpriseBoxes();
  }
  if (id === 'admin' && !adminLoggedIn) {
    origGoToScreen('welcome');
  }
  if (id === 'admin-login') {
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminLoginError').textContent = '';
  }
};

/* ---- Music Manager (Admin) ---- */

function showAdminTab(tab) {
  document.getElementById('tabResponses').className = 'admin-tab' + (tab === 'responses' ? ' active' : '');
  document.getElementById('tabMusic').className = 'admin-tab' + (tab === 'music' ? ' active' : '');
  document.getElementById('adminResponses').style.display = tab === 'responses' ? 'block' : 'none';
  document.getElementById('adminMusic').style.display = tab === 'music' ? 'block' : 'none';
  if (tab === 'music') loadMusicList();
}

function showAddSongForm() {
  document.getElementById('addSongForm').style.display = 'block';
}

function hideAddSongForm() {
  document.getElementById('addSongForm').style.display = 'none';
  document.getElementById('songTitle').value = '';
  document.getElementById('songIcon').value = '';
  document.getElementById('songPath').value = '';
}

function addSong() {
  var title = document.getElementById('songTitle').value.trim();
  var icon = document.getElementById('songIcon').value.trim() || '\u266B';
  var path = document.getElementById('songPath').value.trim();

  if (!title) { alert('Please enter a song title'); return; }
  if (!path) { alert('Please enter the audio path'); return; }

  db.collection('playlist').orderBy('order', 'desc').limit(1).get().then(function(snapshot) {
    var nextOrder = 0;
    snapshot.forEach(function(doc) { nextOrder = doc.data().order + 1; });

    db.collection('playlist').add({
      title: title,
      icon: icon,
      path: path,
      order: nextOrder
    }).then(function() {
      hideAddSongForm();
      loadMusicList();
    }).catch(console.error);
  }).catch(function() {
    db.collection('playlist').add({
      title: title,
      icon: icon,
      path: path,
      order: 0
    }).then(function() {
      hideAddSongForm();
      loadMusicList();
    }).catch(console.error);
  });
}

function loadMusicList() {
  var list = document.getElementById('musicList');
  list.innerHTML = '<div class="admin-loading">Loading...</div>';
  db.collection('playlist').orderBy('order').get().then(function(snapshot) {
    if (snapshot.empty) {
      list.innerHTML = '<div class="admin-empty">No songs. Add one or reset to defaults.</div>';
      return;
    }
    var html = '';
    snapshot.forEach(function(doc) {
      var d = doc.data();
      var id = doc.id;
      html +=
        '<div class="admin-music-card">' +
          '<div class="admin-music-info">' +
            '<span class="admin-music-icon">' + (d.icon || '\u266B') + '</span>' +
            '<div>' +
              '<div class="admin-music-title">' + escHtml(d.title) + '</div>' +
              '<div class="admin-music-path">' + escHtml(d.path) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="admin-music-actions">' +
            '<button class="glow-btn delete-btn" onclick="deleteSong(\'' + id.replace(/'/g, "\\'") + '\')">X</button>' +
          '</div>' +
        '</div>';
    });
    list.innerHTML = html;
  }).catch(function() {
    list.innerHTML = '<div class="admin-empty">Error loading music</div>';
  });
}


function deleteSong(id) {
  if (!confirm('Delete this song?')) return;
  db.collection('playlist').doc(id).delete().then(function() {
    loadMusicList();
  }).catch(console.error);
}

function seedPlaylist() {
  if (!confirm('Replace all songs with defaults?')) return;
  db.collection('playlist').get().then(function(snapshot) {
    var batch = db.batch();
    snapshot.forEach(function(doc) { batch.delete(doc.ref); });
    defaultPlaylist.forEach(function(song, i) {
      var ref = db.collection('playlist').doc();
      batch.set(ref, { title: song.title, icon: song.icon, path: song.path, order: i });
    });
    return batch.commit();
  }).then(function() {
    loadMusicList();
  }).catch(console.error);
}

/* ---- Init ---- */
window.onload = function() {
  createFloatingHearts();
  loadPlaylist();
  if (window.location.pathname === '/cj') {
    goToScreen('admin-login');
  }
};

window.onresize = function() {
  const canvas = document.getElementById('confettiCanvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};
