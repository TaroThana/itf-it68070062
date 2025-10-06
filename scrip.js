const bal_acc = document.getElementById("bal_acc")
const bal_cash = document.getElementById("bal_cash")
const process_type = document.getElementById("process_type")
const process_amt = document.getElementById("process_amt")
const log = document.getElementById("log")

let curr_id = 1
let curr_acc = Number(bal_acc.value)
let curr_cash = Number(bal_acc.value)

function changeBalance() {
    curr_acc = Number(bal_acc.value)
    curr_cash = Number(bal_cash.value)
    showBalance()
}

function proceedOperation() {
    if (process_type.value == "deposit") {
        if (curr_cash >= Number(process_amt.value)) {
            curr_acc += Number(process_amt.value)
            curr_cash -= Number(process_amt.value)
            showBalance()
        } else {
            addLog("Couldn't deposit entered balance. (Insufficient cash balance)")
        }
    } else if (process_type.value == "withdraw") {
        if (curr_acc >= Number(process_amt.value)) {
            curr_acc -= Number(process_amt.value)
            curr_cash += Number(process_amt.value)
            showBalance()
        } else {
            addLog("Couldn't withdraw entered balance. (Insufficient account balance)")
        }
    }
}

function showBalance() {
    bal_acc.value = Number(curr_acc)
    bal_cash.value = Number(curr_cash)
    addLog("Current account balance: " + curr_acc + ", Current cash balance: " + curr_cash)
}

function addLog(text) {
    log.value = (curr_id++ + ", " + text + "\n" + log.value).trim()
}

showBalance()

function playMusic() {
  const audio = document.getElementById('bgm');
  if (!audio) return;

  audio.loop = true;

  const tryAutoplay = async () => {
    try {
      await audio.play();
      fadeIn(audio, 0.8); 
      console.info('Autoplay with sound ✅');
    } catch (err) {
      console.warn('Autoplay blocked. Fallback -> muted first.', err);

      audio.muted = true;
      try {
        await audio.play();
        console.info('Autoplay muted ✅ (waiting for any user interaction to unmute)');
      } catch (err2) {
        console.warn('Even muted autoplay failed:', err2);
      }


      const unlock = async () => {
        audio.muted = false;
        if (audio.paused) {
          try { await audio.play(); } catch (e) {  }
        }
        fadeIn(audio, 0.8);
        removeUnlockers();
      };

      const removeUnlockers = () => {
        document.removeEventListener('pointerdown', unlock);
        document.removeEventListener('keydown', unlock);
        document.removeEventListener('scroll', unlock, { passive: true });
        document.removeEventListener('touchstart', unlock);
      };

      document.addEventListener('pointerdown', unlock);
      document.addEventListener('keydown', unlock);
      document.addEventListener('scroll', unlock, { passive: true });
      document.addEventListener('touchstart', unlock);
    }
  };

  tryAutoplay();
}


function fadeIn(audio, target = 1.0, step = 0.05, interval = 100) {
  audio.volume = 0;
  const id = setInterval(() => {
    audio.volume = Math.min(target, audio.volume + step);
    if (audio.volume >= target) clearInterval(id);
  }, interval);
}

document.addEventListener('DOMContentLoaded', playMusic);