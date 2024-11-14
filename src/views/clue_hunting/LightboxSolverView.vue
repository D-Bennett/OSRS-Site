<script setup>

  String.prototype.format = function () {
    let args = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, number) {
      if (typeof args[number] != 'undefined') {
        return args[number];
      }
      else {
        return match;
      }
    });
  };

  import {computed, onMounted, reactive, ref} from 'vue'

  const startText = 'Select the starting lights and click start';
  const nextText = 'Click {0} and adjust the lights above, then click next';
  const startActionButtonText = 'Start';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const messageText = ref(startText);
  const actionButtonText = ref(startActionButtonText);
  const lightState = reactive(newZeroMatrix());
  const letterStates = reactive({});
  const lastLetterState = reactive(newZeroMatrix());
  const currentLetter = ref(-1);
  const letterCombinations = reactive(newLetterCombinations());

  const bulbOnUrl = new URL('./../../assets/images/lightbox/bulb-on.png', import.meta.url).href
  const bulbOffUrl = new URL('./../../assets/images/lightbox/bulb-off.png', import.meta.url).href

  const lightButtonsEnabled = computed(() => {
    return (currentLetter.value < letters.length);
  });

  function setLightStateBlank() {
    for (let y=0; y<5; y++) {
      for (let x=0; x<5; x++) {
        lightState[y][x] = 0;
      }
    }
  }

  function bulbStateImage(x, y) {
    if (lightState[y][x] === 1) {
      return bulbOnUrl;
    }
    return bulbOffUrl;
  }

  function toggleState(x, y) {
    if (lightButtonsEnabled.value) {
      if (lightState[y][x] === 1) {
        lightState[y][x] = 0;
      } else {
        lightState[y][x] = 1;
      }
    }
  }

  function setLastLetterState() {
    for (let y=0; y<5; y++) {
      for (let x=0; x<5; x++) {
        lastLetterState[y][x] = lightState[y][x];
      }
    }
  }

  function newZeroMatrix() {
    return [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
  }

  function newOneMatrix() {
    return [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ];
  }

  function copyOfLastLetterState() {
    let tmp = newZeroMatrix();
    for (let y=0; y<5; y++) {
      for (let x=0; x<5; x++) {
        tmp[y][x] = lastLetterState[y][x];
      }
    }
    return tmp;
  }

  function newLetterCombinations() {
    let r = [];
    for (let li=0; li<letters.length; li++) {
      let l = letters[li];
      let extraRs = [];
      for (let ri=0; ri<r.length; ri++) {
        let rl = r[ri];
        extraRs.push(l + rl);
      }
      for (let eri=0; eri<extraRs.length; eri++) {
        let erl = extraRs[eri];
        r.push(erl);
      }
      r.push(l);
    }
    r.push('');
    return r;
  }

  function setLetterState(letter) {
    let tmp = newZeroMatrix();
    for (let y=0; y<5; y++) {
      for (let x=0; x<5; x++) {
        tmp[y][x] = lastLetterState[y][x] ^ lightState[y][x];
      }
    }
    letterStates[letter] = tmp;
  }

  function calcXorState(a, b) {
    let tmp = newZeroMatrix();
    for (let y=0; y<5; y++) {
      for (let x=0; x<5; x++) {
        tmp[y][x] = a[y][x] ^ b[y][x];
      }
    }
    return tmp;
  }

  function stateHasAllOnes(s) {
    for (let y=0; y<5; y++) {
      for (let x=0; x<5; x++) {
        if (s[y][x] == 0) {
          return false;
        }
      }
    }
    return 1;
  }

  function findSolution() {
    for (let lci=0; lci<letterCombinations.length; lci++) {
      let lc = letterCombinations[lci];
      let proc = copyOfLastLetterState();
      let lc_ls = [...lc];
      for (let lc_lsi=0; lc_lsi<lc_ls.length; lc_lsi++) {
        let lc_l = lc_ls[lc_lsi];
        proc = calcXorState(proc, letterStates[lc_l]);
      }
      if (stateHasAllOnes(proc)) {
        return lc_ls;
      }
    }
    return null;
  }

  function doAction() {
    if (currentLetter.value === -1) { // Do first action.
      setLastLetterState();
      currentLetter.value = 0;

      messageText.value = nextText.format(letters[currentLetter.value]);
      actionButtonText.value = 'Next';
    } else if (currentLetter.value < letters.length) { // Do letter action.

      setLetterState(letters[currentLetter.value]);
      setLastLetterState();
      currentLetter.value++;
      if (currentLetter.value < letters.length) {
        messageText.value = nextText.format(letters[currentLetter.value]);
      } else {
        messageText.value = "All letters entered, please click calculate below";
        actionButtonText.value = 'Calculate solution';
      }
    } else { // Find solution.
      let solution = findSolution();
      if (solution == null) {
        messageText.value = "Could not find a solution, please try again.";
      } else {
        messageText.value = "Click the following letters just once: {0}.".format(solution.join(','));
      }
    }
  }

  function doReset() {
    setLightStateBlank();
    currentLetter.value = -1;
    messageText.value = startText;
    actionButtonText.value = startActionButtonText;
  }

  onMounted(() => {
    setLightStateBlank();
  });
</script>

<template>

  <div class="row">
    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">

      <h3 class="text-center">Clue scroll lightbox solver</h3>

      <div class="card rs-card">
        <div class="card-header text-center">
          Light box
        </div>
        <div class="card-body">
          <div class="lights-wrap p-1">
            <div v-for="(yn,yi) in 5" class="light-row my-1">
              <button
                  v-for="(xn,xi) in 5"
                  @click="toggleState(xi, yi)"
                  :disabled="!(lightButtonsEnabled)"
                  class="btn btn-outline-hw-brown mx-1 py-3 light-bulb"
              ><img :src="bulbStateImage(xi,yi)"></button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="messageText.length>0" class="text-center mt-3">{{ messageText }}</div>

      <button class="btn btn-hw-orange w-100 mt-3" @click="doAction()">{{ actionButtonText }}</button>

      <button class="btn btn-hw-brown w-100 mt-3" @click="doReset()">Reset</button>

      <div class="text-center mt-3">Vue version of the lightbox solver by <a href="https://osrs-lightbox-solver.fletom.com/">fletom</a></div>

    </div>
  </div>
</template>

