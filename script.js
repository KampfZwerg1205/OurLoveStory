
/* =========================================
   OUR LOVE STORY – JAVASCRIPT
========================================= */

// Beziehungsbeginn: 12. Mai 2025, 21:52 Uhr
const relationshipStart = new Date(2025, 4, 12, 21, 52, 0);

const memories = [
  {
    date: "07. April 2025",
    title: "Der Anfang von allem",
    text: "Wir haben uns im Discord-Call kennengelernt. Damals wusste ich noch nicht, wie wichtig du einmal für mich werden würdest."
  },
  {
    date: "Etwa 10. April 2025",
    title: "Ich habe mich in dich verliebt",
    text: "Nur ein paar Tage später habe ich dir gesagt, was ich für dich empfinde. Ab da warst du schon etwas ganz Besonderes für mich."
  },
  {
    date: "18. April 2025",
    title: "Drei kleine Worte",
    text: "Du hast mir gesagt, dass du mich auch liebst. Und plötzlich war da dieses wunderschöne Gefühl, dass wir beide dasselbe im Herzen tragen."
  },
  {
    date: "12. Mai 2025",
    title: "Ab diesem Tag: Wir",
    text: "Du hast mich gefragt, ob ich dein Freund sein möchte. Seit diesem Tag schreiben wir unsere eigene kleine Liebesgeschichte."
  },
  {
    date: "04. Juli 2025",
    title: "Unser erstes Wiedersehen",
    text: "Wir haben uns endlich in echt gesehen und zwei Wochen miteinander verbracht. Auch die Zeit mit deiner Familie in Koblenz bleibt eine schöne Erinnerung."
  },
  {
    date: "22. August 2025",
    title: "Ein Geburtstagswochenende mit dir",
    text: "Du hast für mich gebacken und mir ein Bild gemalt. Solche liebevollen Kleinigkeiten bedeuten mir unglaublich viel."
  }
];

/* =========================================
   ELEMENTE DER WEBSEITE
========================================= */

const introScreen = document.getElementById("introScreen");
const enterButton = document.getElementById("enterButton");
const mainSite = document.getElementById("mainSite");
const starField = document.getElementById("starField");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
const musicIcon = document.getElementById("musicIcon");
const musicVolume = document.getElementById("musicVolume");
const musicVolumeValue = document.getElementById("musicVolumeValue");
const playlistToggle = document.getElementById("playlistToggle");
const playlistPanel = document.getElementById("playlistPanel");
const playlistClose = document.getElementById("playlistClose");
const playlistTracks = document.getElementById("playlistTracks");
const currentTrackLabel = document.getElementById("currentTrackLabel");
const previousTrackButton = document.getElementById("previousTrack");
const nextTrackButton = document.getElementById("nextTrack");
const playlistPlayPauseButton = document.getElementById("playlistPlayPause");

/* =========================================
   MUSIK-PLAYLIST
========================================= */

const musicPlaylist = [
  {
    title: "Shape of you",
    artist: "Für uns",
    src: "assets/music.mp3"
  },
  {
    title: "Thats so True",
    artist: "Gracie Abrams",
    src: "assets/music/That’s So True.mp3"
  },
  {
    title: "Ghost",
    artist: "Nightcore Zodiac",
    src: "assets/music/song-2.mp3"
  }
];

let currentTrackIndex = 0;

if (backgroundMusic) {
  backgroundMusic.volume = 0.5;

  if (musicPlaylist.length > 0) {
    backgroundMusic.src = musicPlaylist[0].src;
  }
}

function updateMusicVolume() {
  if (!backgroundMusic || !musicVolume) return;

  const volume = Number(musicVolume.value);
  backgroundMusic.volume = volume / 100;

  if (musicVolumeValue) {
    musicVolumeValue.textContent = `${volume}%`;
  }

  musicVolume.setAttribute(
    "aria-valuetext",
    `${volume}% Lautstärke`
  );
}

function renderPlaylist() {
  if (!playlistTracks) return;

  playlistTracks.replaceChildren();

  musicPlaylist.forEach((track, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const number = document.createElement("span");
    const title = document.createElement("span");

    button.type = "button";
    button.className = "playlist-track-button";
    button.classList.toggle("active", index === currentTrackIndex);
    button.setAttribute(
      "aria-current",
      index === currentTrackIndex ? "true" : "false"
    );

    number.className = "playlist-track-number";
    number.textContent = String(index + 1).padStart(2, "0");

    title.textContent = track.title;

    button.append(number, title);
    button.addEventListener("click", () => selectTrack(index, true));

    item.append(button);
    playlistTracks.append(item);
  });

  updateCurrentTrackLabel();
}

function updateCurrentTrackLabel() {
  if (!currentTrackLabel || musicPlaylist.length === 0) return;

  const track = musicPlaylist[currentTrackIndex];
  currentTrackLabel.textContent = `${track.title} · ${track.artist}`;
}

function updatePlaylistPlaybackState() {
  const isPlaying = Boolean(
    backgroundMusic && !backgroundMusic.paused
  );

  musicButton?.classList.toggle("playing", isPlaying);
  musicButton?.setAttribute("aria-pressed", String(isPlaying));

  if (musicLabel) {
    musicLabel.textContent = isPlaying ? "Musik aus" : "Musik an";
  }

  if (musicIcon) {
    musicIcon.textContent = "♫";
  }

  if (playlistPlayPauseButton) {
    playlistPlayPauseButton.textContent = isPlaying ? "Ⅱ" : "▶";
    playlistPlayPauseButton.setAttribute(
      "aria-label",
      isPlaying ? "Musik pausieren" : "Musik abspielen"
    );
  }
}

async function selectTrack(index, autoplay = false) {
  if (!backgroundMusic || musicPlaylist.length === 0) return;

  currentTrackIndex =
    (index + musicPlaylist.length) % musicPlaylist.length;

  const track = musicPlaylist[currentTrackIndex];

  backgroundMusic.pause();
  backgroundMusic.src = track.src;
  backgroundMusic.load();

  renderPlaylist();
  updatePlaylistPlaybackState();

  if (autoplay) {
    try {
      await backgroundMusic.play();
    } catch (error) {
      if (musicLabel) {
        musicLabel.textContent = "Musikdatei prüfen";
      }

      console.warn(
        `Der Titel "${track.title}" konnte nicht abgespielt werden. Pfad prüfen: ${track.src}`,
        error
      );
    }
  }

  updatePlaylistPlaybackState();
}

async function toggleMusic() {
  if (!backgroundMusic || musicPlaylist.length === 0) return;

  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
    } catch (error) {
      if (musicLabel) {
        musicLabel.textContent = "Musikdatei prüfen";
      }

      console.warn(
        "Musik konnte nicht gestartet werden. Prüfe die MP3-Datei und den Pfad.",
        error
      );
    }
  } else {
    backgroundMusic.pause();
  }

  updatePlaylistPlaybackState();
}

function togglePlaylist() {
  if (!playlistPanel || !playlistToggle) return;

  const willOpen = playlistPanel.hidden;
  playlistPanel.hidden = !willOpen;

  playlistToggle.setAttribute(
    "aria-expanded",
    String(willOpen)
  );

  if (willOpen) {
    playlistClose?.focus();
  }
}

/* =========================================
   GEHEIMER LIEBESBRIEF
========================================= */

const secretLetterModal = document.getElementById("secretLetterModal");
const openSecretLetterButton = document.getElementById("openSecretLetter");
const closeSecretLetterButton = document.getElementById("closeSecretLetter");

let lastSecretLetterFocus = null;

function openSecretLetter() {
  if (!secretLetterModal) return;

  lastSecretLetterFocus = document.activeElement;

  secretLetterModal.inert = false;
  secretLetterModal.setAttribute("aria-hidden", "false");
  secretLetterModal.classList.add("open");

  document.body.classList.add("secret-letter-open");

  window.setTimeout(() => {
    closeSecretLetterButton?.focus();
  }, 100);
}

function closeSecretLetter() {
  if (!secretLetterModal) return;

  secretLetterModal.classList.remove("open");
  secretLetterModal.setAttribute("aria-hidden", "true");
  secretLetterModal.inert = true;

  document.body.classList.remove("secret-letter-open");

  if (
    lastSecretLetterFocus &&
    typeof lastSecretLetterFocus.focus === "function"
  ) {
    lastSecretLetterFocus.focus();
  }
}

/* =========================================
   STERNE FÜR DEN STARTBILDSCHIRM
========================================= */

function createStars() {
  if (!starField) return;

  const count = Math.min(
    110,
    Math.max(
      55,
      Math.floor(
        (window.innerWidth * window.innerHeight) / 8500
      )
    )
  );

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    const size = (Math.random() * 2.2 + 0.7).toFixed(1);

    star.className =
      Math.random() > 0.88 ? "star star-cross" : "star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.setProperty("--size", `${size}px`);
    star.style.setProperty(
      "--duration",
      `${(1.7 + Math.random() * 3.8).toFixed(2)}s`
    );
    star.style.setProperty(
      "--delay",
      `${(-Math.random() * 5).toFixed(2)}s`
    );
    star.style.setProperty(
      "--drift",
      `${(3 + Math.random() * 6).toFixed(2)}s`
    );

    starField.appendChild(star);
  }
}

/* =========================================
   STARTBILDSCHIRM VERLASSEN
========================================= */

function openLoveStory() {
  if (!introScreen || !mainSite) return;
  if (introScreen.classList.contains("leaving")) return;

  introScreen.classList.add("leaving");

  mainSite.inert = false;
  mainSite.setAttribute("aria-hidden", "false");
  mainSite.classList.add("visible");

  window.setTimeout(() => {
    introScreen.hidden = true;
    document.body.style.overflow = "";

    document.getElementById("home")?.scrollIntoView({
      behavior: "auto",
      block: "start"
    });
  }, 1150);
}

/* =========================================
   BEZIEHUNGSZÄHLER
========================================= */

function updateCounter() {
  const now = new Date();

  let diff = Math.max(
    0,
    now.getTime() - relationshipStart.getTime()
  );

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;

  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (daysElement) {
    daysElement.textContent = days.toLocaleString("de-DE");
  }

  if (hoursElement) {
    hoursElement.textContent = String(hours).padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent = String(minutes).padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }
}

/* =========================================
   COUNTDOWN BIS ZUM JAHRESTAG
========================================= */

function updateAnniversaryCountdown() {
  const now = new Date();

  let target = new Date(
    now.getFullYear(),
    4,
    12,
    21,
    52,
    0
  );

  if (now.getTime() >= target.getTime()) {
    target = new Date(
      now.getFullYear() + 1,
      4,
      12,
      21,
      52,
      0
    );
  }

  const difference = target.getTime() - now.getTime();

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor(
    (difference % 86400000) / 3600000
  );
  const minutes = Math.floor(
    (difference % 3600000) / 60000
  );
  const seconds = Math.floor(
    (difference % 60000) / 1000
  );

  const daysElement = document.getElementById("anniversaryDays");
  const hoursElement = document.getElementById("anniversaryHours");
  const minutesElement = document.getElementById("anniversaryMinutes");
  const secondsElement = document.getElementById("anniversarySeconds");
  const dateElement = document.getElementById("anniversaryDate");

  if (daysElement) {
    daysElement.textContent = days.toLocaleString("de-DE");
  }

  if (hoursElement) {
    hoursElement.textContent = String(hours).padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent = String(minutes).padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  if (dateElement) {
    dateElement.textContent =
      target.toLocaleDateString("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }) + " · 21:52 Uhr ♡";
  }
}

/* =========================================
   TIMELINE
========================================= */

function renderTimeline() {
  const list = document.getElementById("timelineList");
  if (!list) return;

  list.innerHTML = memories.map((memory, index) => `
    <article
      class="memory-card"
      style="transition-delay:${Math.min(index * 90, 450)}ms"
    >
      <p class="memory-date">${memory.date}</p>
      <h3>${memory.title}</h3>
      <p>${memory.text}</p>
    </article>
  `).join("");

  const cards = [...list.querySelectorAll(".memory-card")];

  if (!("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  cards.forEach(card => observer.observe(card));
}

/* =========================================
   ROMANTISCHE STERNENBOTSCHAFTEN
========================================= */

const romanticSkyMessages = [
  {
    title: "Du bist mein Lieblingsmensch",
    text: "Nicht, weil jeder Tag perfekt ist, sondern weil selbst ein gewöhnlicher Tag mit dir etwas Besonderes werden kann. ♡"
  },
  {
    title: "Ich würde dich wieder wählen",
    text: "Wenn ich unsere Geschichte tausendmal von vorne erleben könnte, würde ich tausendmal wieder dich wählen."
  },
  {
    title: "Du bist wunderschön",
    text: "Und ich meine nicht nur dein Aussehen. Ich meine deine Art, dein Herz, deine kleinen Eigenheiten und die Weise, wie du mein Leben heller machst."
  },
  {
    title: "Ein Zuhause ist ein Gefühl",
    text: "Manchmal ist Zuhause kein Ort. Manchmal ist es eine Stimme, ein Lächeln oder einfach der Gedanke an dich."
  },
  {
    title: "Auch an schweren Tagen",
    text: "Du musst nicht immer stark sein und auch nicht immer lächeln. Ich möchte dich auch an den Tagen liebhaben, an denen dir alles zu viel wird."
  },
  {
    title: "Du bist mein kleines Wunder",
    text: "Aus einem ganz normalen Discord-Call wurde etwas, das ich niemals missen möchte. Wie schön, dass sich unsere Wege gefunden haben."
  },
  {
    title: "Ich vermisse dich",
    text: "Wenn du mir fehlst, erinnere ich mich daran, dass wir all diese schönen Momente schon erlebt haben – und noch viele vor uns liegen."
  },
  {
    title: "Dein Lächeln",
    text: "Wenn ich einen Wunsch frei hätte, wäre es, dir immer wieder Gründe zum Lächeln zu schenken."
  },
  {
    title: "Du bist genug",
    text: "Du musst dich nicht verändern, um meine Liebe zu verdienen. Du darfst einfach du sein. Genau dich möchte ich an meiner Seite haben."
  },
  {
    title: "Unsere Zukunft",
    text: "Ich freue mich auf all die kleinen Dinge, die noch kommen: Gespräche, Umarmungen, albernes Lachen und Erinnerungen, die nur uns gehören."
  },
  {
    title: "Für immer beginnt heute",
    text: "Ich kann nicht jeden Tag vorhersehen. Aber ich kann dir immer wieder zeigen wollen, dass du mir wichtig bist."
  },
  {
    title: "Falls du das heute hören musst",
    text: "Du bist geliebt. Du bist wertvoll. Du machst einen Unterschied in meinem Leben – und ich bin so froh, dass es dich gibt. ♡"
  }
];

const shootingStarMessages = [
  {
    title: "Eine Nachricht aus dem Himmel",
    text: "Wenn ich dir gerade etwas zuflüstern könnte, wäre es: Ich liebe dich. Mehr, als diese kleinen Sterne sagen können. ♡"
  },
  {
    title: "Ein Wunsch für dich",
    text: "Ich wünsche dir heute einen Moment, in dem du dich genauso geliebt fühlst, wie du es verdienst."
  },
  {
    title: "Nur für dich",
    text: "Ganz egal, wie weit wir voneinander entfernt sind: Du bist ein Gedanke, der mein Herz immer wieder lächeln lässt."
  },
  {
    title: "Ein Versprechen",
    text: "Ich möchte nicht nur die großen Tage mit dir feiern, sondern auch die stillen, normalen und manchmal schwierigen Tage gemeinsam erleben."
  },
  {
    title: "Psst …",
    text: "Du bist gerade der Grund, warum ich mir vorstelle, wie schön es wäre, dich jetzt in den Arm zu nehmen. 💗"
  }
];

const skyStarPositions = [
  [12, 24], [29, 53], [19, 79], [42, 22],
  [53, 70], [66, 38], [79, 21], [88, 57],
  [72, 82], [39, 86], [57, 15], [91, 83]
];

let shootingMessageIndex = 0;
let skyShootingTimer = null;
let skyHeadingTapCount = 0;
let skyHeadingTapTimer = null;

function showRomanticSkyMessage(message) {
  const panel = document.getElementById("skyMemoryMessage");
  if (!panel) return;

  const icon = document.createElement("span");
  icon.className = "sky-message-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "✧";

  const content = document.createElement("div");

  const title = document.createElement("strong");
  title.textContent = message.title;

  const paragraph = document.createElement("p");
  paragraph.textContent = message.text;

  content.append(title, paragraph);
  panel.replaceChildren(icon, content);

  panel.classList.remove("message-pop");
  void panel.offsetWidth;
  panel.classList.add("message-pop");
}

/* =========================================
   STERNENHIMMEL ERSTELLEN
========================================= */

function createRomanticSky() {
  const sky = document.getElementById("loveSky");
  const starField = document.getElementById("skyAmbientStars");
  const starsContainer = document.getElementById("memoryStars");
  const shootingStar = document.getElementById("shootingStar");

  if (!sky || !starField || !starsContainer) return;

  if (!starField.childElementCount) {
    const count = Math.min(
      110,
      Math.max(
        55,
        Math.floor(
          (sky.clientWidth * sky.clientHeight) / 1800
        )
      )
    );

    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");

      star.className = "sky-ambient-star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      star.style.setProperty(
        "--ambient-size",
        `${(Math.random() * 2 + 0.5).toFixed(1)}px`
      );

      star.style.setProperty(
        "--ambient-opacity",
        (Math.random() * 0.65 + 0.25).toFixed(2)
      );

      star.style.setProperty(
        "--ambient-duration",
        `${(1.7 + Math.random() * 4).toFixed(2)}s`
      );

      star.style.setProperty(
        "--ambient-delay",
        `${(-Math.random() * 5).toFixed(2)}s`
      );

      starField.appendChild(star);
    }
  }

  if (!starsContainer.childElementCount) {
    romanticSkyMessages.forEach((message, index) => {
      const star = document.createElement("button");
      const [left, top] = skyStarPositions[index];

      star.type = "button";
      star.className = "memory-star";
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.animationDelay = `${index * -0.23}s`;

      star.innerHTML =
        `✦<span class="star-number" aria-hidden="true">${index + 1}</span>`;

      star.setAttribute(
        "aria-label",
        `Liebesbotschaft ${index + 1} entdecken`
      );

      star.setAttribute("aria-pressed", "false");

      star.addEventListener("click", () => {
        if (!star.classList.contains("found")) {
          star.classList.add("found");
          star.setAttribute("aria-pressed", "true");
          star.setAttribute(
            "aria-label",
            `Entdeckt: ${message.title}`
          );
        }

        showRomanticSkyMessage(message);

        const found = starsContainer.querySelectorAll(
          ".memory-star.found"
        ).length;

        const progress = document.getElementById("skyProgress");

        if (progress) {
          progress.innerHTML =
            `${found} von 12 Sternen entdeckt ` +
            `<span aria-hidden="true">♡</span>`;
        }

        if (found === romanticSkyMessages.length) {
          revealHiddenHeart();
        }
      });

      starsContainer.appendChild(star);
    });
  }

  if (shootingStar && shootingStar.dataset.ready !== "true") {
    shootingStar.dataset.ready = "true";

    shootingStar.addEventListener("click", () => {
      const message =
        shootingStarMessages[
          shootingMessageIndex % shootingStarMessages.length
        ];

      shootingMessageIndex++;

      showRomanticSkyMessage(message);
      shootingStar.classList.remove("flyby");
    });

    window.setTimeout(() => {
      launchRomanticShootingStar(shootingStar);
    }, 2600);

    skyShootingTimer = window.setInterval(() => {
      if (!document.hidden) {
        launchRomanticShootingStar(shootingStar);
      }
    }, 9000);
  }

  const heading = sky.querySelector("h2");

  if (heading && heading.dataset.secretReady !== "true") {
    heading.dataset.secretReady = "true";
    heading.style.cursor = "pointer";
    heading.setAttribute(
      "title",
      "Psst … probier dreimal zu tippen"
    );

    heading.addEventListener("click", () => {
      skyHeadingTapCount++;

      clearTimeout(skyHeadingTapTimer);

      skyHeadingTapTimer = setTimeout(() => {
        skyHeadingTapCount = 0;
      }, 1300);

      if (skyHeadingTapCount >= 3) {
        skyHeadingTapCount = 0;

        showRomanticSkyMessage({
          title: "Du hast ein Geheimnis gefunden 💗",
          text: "Falls ich dir heute noch nichts Schönes gesagt habe: Ich bin unglaublich froh, dass es dich gibt. Du bist nicht nur Teil meiner Geschichte – du bist einer meiner liebsten Gründe, warum sie so schön ist."
        });

        sky.querySelector(".love-sky")?.classList.add("secret-found");
      }
    });
  }
}

function launchRomanticShootingStar(star) {
  if (!star || star.classList.contains("flyby")) return;

  star.classList.remove("flyby");
  void star.offsetWidth;
  star.classList.add("flyby");

  window.setTimeout(() => {
    star.classList.remove("flyby");
  }, 1900);
}

function revealHiddenHeart() {
  const constellation = document.getElementById("heartConstellation");

  if (!constellation || constellation.classList.contains("revealed")) {
    return;
  }

  constellation.classList.add("revealed");
  constellation.setAttribute("aria-hidden", "false");

  showRomanticSkyMessage({
    title: "Du hast unser kleines Herz gefunden ♡",
    text: "Du hast alle Sterne entdeckt! Jeder einzelne steht für etwas, das ich an dir liebe. Und wenn ich alle Gründe aufzählen müsste, würde der Himmel nicht ausreichen. Ich liebe dich – heute, morgen und immer wieder."
  });
}

/* =========================================
   UNSERE GEMEINSAME FANTASY-LANDKARTE
========================================= */

// Nur ungefähre Ortsmittelpunkte – keine privaten Adressen.
// Die Positionen auf der illustrierten Karte sind bewusst
// künstlerisch gestaltet und keine maßstabsgetreue Geografie.

const sharedMapMemories = [
  {
    id: "mayen",
    name: "Mayen",
    country: "Deutschland",
    date: "04. Juli 2025",
    description: "Hier habt ihr euch zum ersten Mal persönlich getroffen. Der Ort, an dem aus eurer Online-Geschichte eine gemeinsame Erinnerung in echt wurde. ♡",
    coordinates: [50.3279, 7.2228],
    position: { x: 68, y: 35 },
    symbol: "🏡",
    chapter: "Das erste Wiedersehen"
  },
  {
    id: "koblenz",
    name: "Koblenz",
    country: "Deutschland",
    date: "Juli 2025",
    description: "Ein besonderer Ausflug mit ihrer Familie – ein weiterer schöner Teil eurer ersten gemeinsamen Zeit.",
    coordinates: [50.3569, 7.5890],
    position: { x: 76, y: 25 },
    symbol: "🏰",
    chapter: "Ein Ausflug mit Familie"
  },
  {
    id: "pornic",
    name: "Pornic",
    country: "Frankreich",
    date: "08. – 25. Juli 2026",
    description: "Euer gemeinsamer Urlaub an der französischen Atlantikküste. Eine ganze Zeit voller gemeinsamer Erlebnisse und Erinnerungen. 🇫🇷",
    coordinates: [47.1150, -2.1020],
    position: { x: 27, y: 70 },
    symbol: "🌊",
    chapter: "Unser Sommer am Meer"
  }
];

let activeMapMemoryId = "mayen";

/* =========================================
   FANTASY-KARTE: ERINNERUNG AUSWÄHLEN
========================================= */

function selectMapMemory(memoryId, shouldScroll = false) {
  const memory = sharedMapMemories.find(
    item => item.id === memoryId
  );

  if (!memory) return;

  activeMapMemoryId = memoryId;

  const mapElement = document.getElementById("ourMap");
  const cardsContainer = document.getElementById("mapMemories");

  mapElement?.querySelectorAll("[data-map-pin]").forEach(pin => {
    const active = pin.dataset.mapPin === memoryId;

    pin.classList.toggle("active", active);
    pin.setAttribute("aria-pressed", String(active));
  });

  cardsContainer?.querySelectorAll("[data-map-memory]").forEach(card => {
    const active = card.dataset.mapMemory === memoryId;

    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });

  const detailTitle = document.getElementById("mapDetailTitle");
  const detailDate = document.getElementById("mapDetailDate");
  const detailDescription = document.getElementById("mapDetailDescription");
  const detailCountry = document.getElementById("mapDetailCountry");
  const detailSymbol = document.getElementById("mapDetailSymbol");

  if (detailTitle) detailTitle.textContent = memory.name;
  if (detailDate) detailDate.textContent = memory.date;
  if (detailDescription) detailDescription.textContent = memory.description;
  if (detailCountry) detailCountry.textContent = memory.country;
  if (detailSymbol) detailSymbol.textContent = memory.symbol;

  const detail = document.getElementById("mapMemoryDetail");

  detail?.classList.remove("memory-detail-pop");
  if (detail) {
    void detail.offsetWidth;
    detail.classList.add("memory-detail-pop");
  }

  if (shouldScroll) {
    mapElement?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

/* =========================================
   FANTASY-KARTE: ERINNERUNGSKARTEN
========================================= */

function renderMapMemories() {
  const container = document.getElementById("mapMemories");
  if (!container) return;

  container.replaceChildren();

  sharedMapMemories.forEach(memory => {
    const card = document.createElement("article");
    card.className = "map-memory-card";
    card.dataset.mapMemory = memory.id;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.mapMemory = memory.id;
    button.setAttribute(
      "aria-label",
      `${memory.name}: Erinnerung auf der Karte auswählen`
    );
    button.setAttribute("aria-pressed", "false");

    const country = document.createElement("span");
    country.className = "map-memory-country";
    country.textContent = `${memory.country} · ♡`;

    const symbol = document.createElement("span");
    symbol.className = "map-memory-symbol";
    symbol.textContent = memory.symbol;
    symbol.setAttribute("aria-hidden", "true");

    const title = document.createElement("h3");
    title.textContent = memory.name;

    const date = document.createElement("p");
    date.className = "map-memory-date";
    date.textContent = memory.date;

    const description = document.createElement("p");
    description.className = "map-memory-description";
    description.textContent = memory.description;

    button.append(
      country,
      symbol,
      title,
      date,
      description
    );

    button.addEventListener("click", () => {
      selectMapMemory(memory.id, true);
    });

    card.append(button);
    container.append(card);
  });
}

/* =========================================
   FANTASY-KARTE (Bild + interaktive Herzen)
   Ersetzt in script.js alles von
   "FANTASY-KARTE: ILLUSTRATION ERSTELLEN" bis einschließlich
   function renderOurMap() { ... }  (direkt vor "ALLES INITIALISIEREN").
   selectMapMemory() und renderMapMemories() bleiben unverändert.
========================================= */
 
// Position der Herzen in Bildpixeln des Kartenbilds (1194 x 1189).
// lx/ly = Versatz der Beschriftung. Hier kannst du Herzen verschieben.
const MAP_IMAGE = { src: "assets/karte.jpg", width: 1194, height: 1189 };
 
const MAP_SPOTS = {
  mayen:   { x: 548, y: 605, lx: 0, ly: 62 },
  koblenz: { x: 975, y: 430, lx: 0, ly: -40 },
  pornic:  { x: 290, y: 775, lx: 0, ly: 62 }
};
 
const MAP_ROUTE =
  "M290,775 C380,735 460,665 548,605 C680,595 800,525 900,475 C930,455 950,445 975,430";
 
const MAP_AURAS = [[205, 460, 95], [880, 300, 90], [1090, 630, 90], [320, 900, 115]];
const MAP_HEART_PATH =
  "M0 22 C-30 -4 -22 -26 -8 -24 C-2 -23 0 -18 0 -16 C0 -18 2 -23 8 -24 C22 -26 30 -4 0 22 Z";
const SVG_NS = "http://www.w3.org/2000/svg";
 
function svgEl(name, attrs = {}, parent) {
  const node = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (parent) parent.appendChild(node);
  return node;
}
 
function createMapStage() {
  const stage = document.createElement("div");
  stage.className = "olsmap-stage";
 
  const image = document.createElement("img");
  image.src = MAP_IMAGE.src;
  image.width = MAP_IMAGE.width;
  image.height = MAP_IMAGE.height;
  image.alt = "Magische Fantasy-Landkarte mit leuchtenden Gebirgen, Wäldern und Kompassrosen";
  image.decoding = "async";
  stage.append(image);
 
  const svg = svgEl("svg", {
    viewBox: `0 0 ${MAP_IMAGE.width} ${MAP_IMAGE.height}`,
    preserveAspectRatio: "xMidYMid meet",
    focusable: "false"
  });
 
  const defs = svgEl("defs", {}, svg);
  const glow = svgEl("filter", { id: "olsGlow", x: "-60%", y: "-60%", width: "220%", height: "220%" }, defs);
  svgEl("feGaussianBlur", { stdDeviation: 6, result: "b" }, glow);
  const merge = svgEl("feMerge", {}, glow);
  svgEl("feMergeNode", { in: "b" }, merge);
  svgEl("feMergeNode", { in: "SourceGraphic" }, merge);
  const grad = svgEl("linearGradient", { id: "olsHeart", x1: 0, y1: 0, x2: 1, y2: 1 }, defs);
  svgEl("stop", { offset: 0, "stop-color": "#ff8fe6" }, grad);
  svgEl("stop", { offset: 1, "stop-color": "#9b4dff" }, grad);
 
  // Pulsierende Magie über den Kompassrosen
  const auras = svgEl("g", { "aria-hidden": "true" }, svg);
  MAP_AURAS.forEach(([cx, cy, r], i) => {
    svgEl("circle", { class: "olsmap-aura", cx, cy, r, style: `animation-delay:${i * 0.9}s` }, auras);
  });
 
  // Magische, gepunktete Reiseroute
  svgEl("path", {
    class: "olsmap-route", d: MAP_ROUTE, fill: "none", stroke: "#ffb3ee",
    "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": "3 14",
    filter: "url(#olsGlow)", "aria-hidden": "true"
  }, svg);
 
  // Herz-Marker
  const pins = svgEl("g", {}, svg);
  sharedMapMemories.forEach(memory => {
    const spot = MAP_SPOTS[memory.id];
    if (!spot) return;
 
    const pin = svgEl("g", {
      class: "olsmap-pin",
      transform: `translate(${spot.x},${spot.y})`,
      tabindex: 0,
      role: "button",
      "data-map-pin": memory.id,
      "aria-pressed": "false",
      "aria-label": `${memory.name}, ${memory.date}. Erinnerung öffnen.`
    }, pins);
 
    // Innere Gruppe: wird auf Smartphones per CSS vergrößert (Touch-Fläche)
    const body = svgEl("g", { class: "olsmap-pin-body" }, pin);
    svgEl("circle", { class: "olsmap-pin-hit", r: 46, fill: "transparent" }, body);
    svgEl("circle", { class: "olsmap-pin-ring", r: 28 }, body);
    svgEl("path", {
      class: "olsmap-pin-heart", d: MAP_HEART_PATH, fill: "url(#olsHeart)",
      stroke: "#fff3fd", "stroke-width": 2, filter: "url(#olsGlow)"
    }, body);
    svgEl("text", { class: "olsmap-pin-label", x: spot.lx, y: spot.ly, "text-anchor": "middle" }, body)
      .textContent = memory.name;
 
    pin.addEventListener("click", () => selectMapMemory(memory.id));
    pin.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectMapMemory(memory.id);
      }
    });
  });
 
  // Funkelnde Sterne (fester Startwert, damit die Karte immer gleich aussieht)
  const sparks = svgEl("g", { "aria-hidden": "true" }, svg);
  let seed = 12052025;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < 30; i++) {
    svgEl("circle", {
      class: "olsmap-spark",
      cx: (100 + random() * 1000).toFixed(0), cy: (100 + random() * 1000).toFixed(0),
      r: (1.5 + random() * 2.5).toFixed(1),
      style: `animation-delay:${(random() * 3).toFixed(2)}s;animation-duration:${(2 + random() * 2.5).toFixed(2)}s`
    }, sparks);
  }
 
  stage.append(svg);
  return stage;
}
 
/* Detailbereich: Ortsname, Datum, Land, Beschreibung, Symbol.
   Die IDs werden von selectMapMemory() befüllt. */
function createMapDetail() {
  const detail = document.createElement("div");
  detail.id = "mapMemoryDetail";
  detail.className = "olsmap-detail";
  detail.setAttribute("aria-live", "polite");
 
  detail.innerHTML = `
    <div class="olsmap-detail-icon" id="mapDetailSymbol" aria-hidden="true">♡</div>
    <div class="olsmap-detail-content">
      <span class="olsmap-detail-country" id="mapDetailCountry"></span>
      <h3 id="mapDetailTitle"></h3>
      <p class="olsmap-detail-date" id="mapDetailDate"></p>
      <p class="olsmap-detail-description" id="mapDetailDescription"></p>
    </div>
  `;
 
  return detail;
}
 
function renderOurMap() {
  const mapElement = document.getElementById("ourMap");
  if (!mapElement) return;
 
  if (mapElement.dataset.fantasyReady === "true") {
    selectMapMemory(activeMapMemoryId);
    return;
  }
 
  mapElement.dataset.fantasyReady = "true";
 
  // Alte Kartenklassen entfernen, damit altes CSS nicht mehr eingreift.
  mapElement.classList.remove("our-map", "fantasy-map");
  mapElement.classList.add("olsmap-host");
 
  mapElement.replaceChildren(createMapStage(), createMapDetail());
 
  selectMapMemory(activeMapMemoryId);
}

/* =========================================
   ALLES INITIALISIEREN
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden";

  createStars();
  renderTimeline();

  renderMapMemories();
  renderOurMap();

  updateCounter();
  updateAnniversaryCountdown();

  window.setInterval(updateCounter, 1000);
  window.setInterval(updateAnniversaryCountdown, 1000);

  // Startbildschirm
  enterButton?.addEventListener("click", openLoveStory);

  // Musik, Playlist und Lautstärke
  musicButton?.addEventListener("click", toggleMusic);
  musicVolume?.addEventListener("input", updateMusicVolume);
  playlistToggle?.addEventListener("click", togglePlaylist);
  playlistClose?.addEventListener("click", togglePlaylist);

  previousTrackButton?.addEventListener(
    "click",
    () => selectTrack(currentTrackIndex - 1, true)
  );

  nextTrackButton?.addEventListener(
    "click",
    () => selectTrack(currentTrackIndex + 1, true)
  );

  playlistPlayPauseButton?.addEventListener(
    "click",
    toggleMusic
  );

  backgroundMusic?.addEventListener(
    "play",
    updatePlaylistPlaybackState
  );

  backgroundMusic?.addEventListener(
    "pause",
    updatePlaylistPlaybackState
  );

  backgroundMusic?.addEventListener(
    "ended",
    () => selectTrack(currentTrackIndex + 1, true)
  );

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      playlistPanel &&
      !playlistPanel.hidden
    ) {
      playlistPanel.hidden = true;
      playlistToggle?.setAttribute("aria-expanded", "false");
      playlistToggle?.focus();
    }
  });

  renderPlaylist();
  updateMusicVolume();
  updatePlaylistPlaybackState();

  // Nur das Brief-Emoji im Footer öffnet den geheimen Brief.
  openSecretLetterButton?.addEventListener(
    "click",
    openSecretLetter
  );

  closeSecretLetterButton?.addEventListener(
    "click",
    closeSecretLetter
  );

  secretLetterModal
    ?.querySelectorAll("[data-close-secret-letter]")
    .forEach(button => {
      button.addEventListener(
        "click",
        closeSecretLetter
      );
    });

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      secretLetterModal?.classList.contains("open")
    ) {
      closeSecretLetter();
    }
  });
});

/* =========================================
   STERNENHIMMEL INITIALISIEREN
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  createRomanticSky
);
