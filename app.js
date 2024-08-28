const canvas = document.getElementById('canvas');
const inputNumber = document.getElementById('inputNumbre');
const inputColor = document.getElementById('inputColor');
const rainbow = document.getElementById('rainbow');
const grayScale = document.getElementById('grayScale');
const eraser = document.getElementById('eraser');



let colorPaint = inputColor.value;
let isRainBow = false;
let isGrayScale = false;
let isEraser = false;


inputNumber.addEventListener('change', (e)=>{
    cleanCanva();
    paintCanva(e.target.value);
})

inputColor.addEventListener('change', (e)=>{
    isEraser = false;
    isGrayScale = false;
    isRainBow = false;
    colorPaint = e.target.value;
})

rainbow.addEventListener('click', (e)=>{
    isEraser = false;
    isGrayScale = false;
    isRainBow = true;
});

grayScale.addEventListener('click', (e)=>{
    isEraser = false;
    isRainBow = false;
    isGrayScale = true;
});

eraser.addEventListener('click', (e)=>{
    isRainBow = false;
    isGrayScale = false;
    isEraser = true;
})

function paintCanva(size){
    const lista = document.createDocumentFragment();
    canvas.style.display = 'grid';
    canvas.style.gridTemplateColumns = `repeat(${size},1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size},1fr)`;

    for(let i=0; i<size * size ; i++){
        createDivs(lista);
    }
    
    canvas.appendChild(lista);
}

function createDivs(lista) {

    let div = document.createElement('div');

    div.addEventListener('mouseover', (e)=>{
        if(isRainBow){
            div.style.backgroundColor = paintBainBow();
        }else if(isGrayScale){
            div.style.backgroundColor = paintGrayScale(div.style.backgroundColor);
        }else if(isEraser){
            div.style.backgroundColor = paintEraser();
        }else{
            div.style.backgroundColor = colorPaint;
        }
        
    });
    lista.appendChild(div);
}

function cleanCanva(){
    canvas.innerHTML = '';
}

function paintBainBow(){

    let r = Math.floor(Math.random() * 256);
    
    let g = Math.floor(Math.random() * 256);
    
    let b = Math.floor(Math.random() * 256);

    return `rgba(${r},${g},${b},1)`;

}

function paintGrayScale(color){

    if(!color.includes('rgba')) return `rgba(0, 0, 0, 0.1)`

    let opacity = Number(color.slice(-4,-1));

    return `rgba(0, 0, 0, ${opacity + 0.1})`;
    
}

function paintEraser(){
    return 'transparent';
}

paintCanva(inputNumber.value);