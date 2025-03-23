var d=new Date();
document.getElementById("d1").innerHTML=d.getMonth()+1+" 月 "+d.getDate()+" 日";
document.getElementById("d2").innerHTML="来到望中已经 "+Math.floor((d.getTime()-1739721600000)/86400000)+" 天了";
const font = [0b011101000110011100111010111001110011000101110,0b001000010000100001000010000100001000011000100,0b111110000100010001000100010000100011000101110,0b011101000110000100000111010000100001000101110,0b100001000010000100001111110001100011000110001,0b011101000110001100001000001111000010000111111,0b011101000110001100010111100001000100010001000,0b000010000100010000100010001000010001000011111,0b011101000110001100010111010001100011000101110,0b000100010001000100001111010001100011000101110,];
const MAX_INT_32 = Math.pow(2, 32);
const MAX_I = Math.pow(2, 44) + 1;
const span = document.createElement('span');
span.classList.add('pixel');
const div = document.createElement('div');
div.classList.add('character');
const t = document.querySelector('#time');
function toPix(n){
  const c = font[n];
  const cHigh = c / MAX_INT_32;
  const charEl = div.cloneNode();
  for(let i = 1; i < MAX_I; i = i * 2){const pixEl = span.cloneNode();const iHigh = i / MAX_INT_32;if((c & i) || (cHigh & iHigh)){pixEl.classList.add('fill');}charEl.appendChild(pixEl);}
  t.appendChild(charEl);
}
function update(){
  t.innerHTML="";
  d=new Date();
  var h=d.getHours().toString(),m = d.getMinutes().toString();
  h.split("").forEach(toPix);
  t.innerHTML+='<div id="colon"><div></div><div></div></div>'
  m.split("").forEach(toPix);
}
update();
setInterval(update,5000)

function cloud(){
  let script = document.createElement('script'),css = document.createElement('link'),div = document.createElement("div");
  script.src = './cloud.js';
  script.type = 'module';
  css.rel = "stylesheet";
  css.href = "./cloud.css";
  div.className = "cloud";
  document.body.appendChild(script);
  document.head.appendChild(css);
  document.body.appendChild(div);
  div.innerHTML = `<div class="upload-section">
    <h1>上传文件</h1>
    <div class="upload-box">
      <input type="file" class="upload-input" id="fileInput">
      <div class="upload-icon">
        <i class="fas fa-cloud-upload-alt"></i>
      </div>
      <p>点击选择文件或拖放文件至此</p>
      <p class="upload-hint">支持格式：PDF, DOC, JPG, PNG (最大 100MB)</p>
    </div>
  </div>
  <div class="file-list">
    <div style="display: flex;align-items: center;;justify-content: space-between;padding: 0 1rem;"><h2>文件列表</h2><h2 id="fraction" style="color: #6b7280;font-size: 1em;">-</h2></div>
    <div class="file-item">
      <img src="svg/loading.svg" width="20" height="20">
      <div class="file-info">
        <div class="file-name">加载中</div>
        <div class="file-size">0.0 B</div>
      </div>
      <button class="deltel-btn">删除</button>
      <button class="download-btn">下载</button>
    </div>
  </div>`;
}