navigator.mediaDevices.getUserMedia({audio:true}).then(function(localStream){
  const audioContext = new(window.AudioContext || window.webkitAudioContext)();
  const input = audioContext.createMediaStreamSource(localStream);
  const analyser = audioContext.createAnalyser();
  const scriptProcessor = audioContext.createScriptProcessor(1024, 1, 1);
  input.connect(analyser);
  analyser.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);

  function onAudio() {
    var tempArray = new window.Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(tempArray);
    document.querySelector('span').innerText = tempArray[0].toFixed(1);
  };

  scriptProcessor.onaudioprocess = onAudio;

  }).catch(function(e) {
    console.log(e)
});

// Proxy to Update Visual Data
const target = {
  frequency: 0
};
const handlerProxy = {
  set(obj, key, value) {
    obj[key] = value;
  }
};
const proxy = new Proxy(target, handlerProxy);

function changeData() {
  proxy.frequency = 440;
  console.log(proxy);
  console.log(target);
}