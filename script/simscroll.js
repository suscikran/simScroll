class SimScrollModel{
  constructor(){
    this.info = "A simple sim scroll model by 鲤白";
  };
  rollUp(elem){
    // 此处的elem是sim-scroll单元中的.content-inside元素
    let t = Number.parseInt(window.getComputedStyle(elem).top);
    let oh = Number.parseInt(window.getComputedStyle(elem.parentNode.parentNode).height);
    let ih = Number.parseInt(window.getComputedStyle(elem).height);
    if((ih - oh) > t){
      elem.style.top = t - 12 + "px";
      if((ih - oh + t) < 16){
        elem.style.top = "-" + (ih - oh + 4) + "px";
      };
    };
    this.scrollThumb(elem.parentNode.parentNode, oh, ih, t);
    t = oh = ih = null;
  };
  rollDown(elem){
    // 此处的elem是sim-scroll单元中的.content-inside元素
    let t = Number.parseInt(window.getComputedStyle(elem).top);
    let oh = Number.parseInt(window.getComputedStyle(elem.parentNode.parentNode).height);
    let ih = Number.parseInt(window.getComputedStyle(elem).height);
    if(t < 0){
      elem.style.top = t + 12 + "px";
      if(t > -12){
        elem.style.top = 0 + "px";
      };
    };
    this.scrollThumb(elem.parentNode.parentNode, oh, ih, t);
    t = oh = ih = null;
  };
  scrollThumb(elem, oh, ih, cit){
    // 此处的elem须要是某个sim-scroll单元
    let th = Number.parseInt(window.getComputedStyle(elem.querySelector(".scroll-thumb")).height);
    elem.querySelector(".scroll-thumb").style.top = (oh - th) * (cit / (oh - ih)) + "px";
    th = null;
  };
  creatScroll(){
    if(sys.qsAll(".sim-scroll").length > 0){
      // 此处的item是每个sim-scroll单元
      for(let item of sys.qsAll(".sim-scroll")){
        item.innerHTML = `<div class="content-case">
          <div class="content-inside">${item.innerHTML}</div>
        </div>
        <div class="scroll-track"><div class="scroll-thumb"></div></div>
        `;
        let oh = Number.parseInt(window.getComputedStyle(item).height);
        let ih = Number.parseInt(window.getComputedStyle(item.querySelector(".content-inside")).height);
        item.querySelector(".scroll-thumb").style.height = Number.parseInt(oh / ih * 100) + "%";
        oh = ih = null;
        item.onmousewheel = (event)=>{
          event.deltaY > 0 ? this.rollUp(item.querySelector(".content-inside")) : this.rollDown(item.querySelector(".content-inside"));
        };
        item.addEventListener("DOMMouseScroll", (event)=>{
          event.detail > 0 ? this.rollUp(item.querySelector(".content-inside")) : this.rollDown(item.querySelector(".content-inside"));
        });
      };
    };
  };
};
let simScroll = new SimScrollModel();

simScroll.creatScroll();