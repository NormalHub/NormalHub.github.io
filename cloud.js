import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://azyqehacondkkgkvvvpj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eXFlaGFjb25ka2tna3Z2dnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjY4NzMsImV4cCI6MjA1NzQ0Mjg3M30.OcSF5gR3uCzUxgurGhi42RWW3ntRGrzGUp0VMrobUTs";
const supabase = createClient(supabaseUrl, supabaseKey);
function fileSize(size){const units = ['B','KB','MB','GB'];let index=0;while(size>=1024 && index<units.length - 1){size /= 1024;index++;}return `${size.toFixed(1)} ${units[index]}`;}
var fileListDom = document.getElementsByClassName("file-list")[0];
let fileSelected;
function deltel(){
  fileSelected = this.dataset.file;
  let div=document.createElement("div");
  div.className="bg";
  div.innerHTML=`<div class="alert">
    <h3><svg viewBox="0 0 24 24" style="margin-right: .5em;" width="1em" height="1em"><path fill="#fa5151" d="M12 23a11 11 0 100-22 11 11 0 000 22zM11 8.5v-2h2v2h-2zm2 1.5v7.5h-2V10h2z"></path></svg>确认</h3>
    <p id="con" style="color: #6b7280;margin-top: 0;">文件一旦删除，就无法恢复，确定要删除吗？</p>
    <button id="del" class="deltel-btn">删除</button><button id="can" class="download-btn">取消</button>
  </div>`;
  document.body.appendChild(div);
  function finish(){div.remove();div = null;}
  document.getElementById("del").onclick = async function(){
    document.getElementById("con").innerHTML = `<img src="svg/loading.svg" style="margin-right: .5em" width="14" height="14">正在删除`;
    const {data, error} = await supabase.storage.from('i').remove([fileSelected]);
    document.getElementById("con").innerHTML = '删除成功';
    document.getElementById(fileSelected).remove();
    document.getElementById("fraction").innerHTML--;
    setTimeout(finish,1000);
  }
  document.getElementById("can").onclick = finish;
}
async function download(){
  fileSelected = this.dataset.file;
  const {data,error} = await supabase.storage.from('i').download("./"+fileSelected);
  const reader = new FileReader();
  reader.readAsDataURL(data);
  reader.onload = (e)=>{
    let a = document.createElement('a');
    a.download = fileSelected;
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
async function list(){
  const { data, error } = await supabase.storage.from('i').list('', {limit: 20,offset: 0,})
  if(data){
    fileListDom.getElementsByClassName("file-item")[0].remove();
    data.forEach(function(file){
      let div = document.createElement("div");
      div.innerHTML = `<div class="file-item" id="${file.name}">
        <img src="svg/file.svg" width="20" height="20">
        <div class="file-info"><div class="file-name">${file.name}</div><div class="file-size">${fileSize(file.metadata.size)}</div></div>
        <button data-file="${file.name}" class="deltel-btn">删除</button>
        <button data-file="${file.name}" class="download-btn">下载</button>
      </div>`;
      fileListDom.insertBefore(div,fileListDom.children[1]);
      fileListDom.getElementsByClassName("deltel-btn")[0].onclick = deltel;
      fileListDom.getElementsByClassName("download-btn")[0].onclick = download;
    })
  }
  document.getElementById("fraction").innerHTML = data.length;
}
list();

async function upload(file){
  if(file && file.size < 52428800){
    // size <=50 MB
    let div = document.createElement("div");
    div.innerHTML = `<div class="file-item" id="${file.name}">
        <img src="svg/loading.svg" width="20" height="20">
        <div class="file-info">
          <div class="file-name">${file.name}</div>
          <div class="file-size">${fileSize(file.size)}</div>
        </div>
        <button data-file="${file.name}" class="deltel-btn">删除</button>
        <button data-file="${file.name}" class="download-btn">下载</button>
      </div>`;
    fileListDom.insertBefore(div,fileListDom.children[1]);
    document.getElementById("fraction").innerHTML++;
    fileListDom.getElementsByClassName("deltel-btn")[0].onclick = deltel;
    fileListDom.getElementsByClassName("download-btn")[0].onclick = download;
    const {data,error} = await supabase.storage.from('i').upload(file.name, file, {cacheControl: '1800',upsert: true});
    div.getElementsByTagName("img")[0].src = "svg/file.svg";
  }
}
document.getElementById('fileInput').addEventListener('change',function(e) {
  upload(e.target.files[0]);
});

const dropArea = document.querySelector('.upload-box');
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.borderColor = '#3b82f6';
});
dropArea.addEventListener('dragleave', () => {
  dropArea.style.borderColor = '#d1d5db';
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.style.borderColor = '#d1d5db';
  const files = e.dataTransfer.files;
  if (files.length > 0){upload(files[0])}
});