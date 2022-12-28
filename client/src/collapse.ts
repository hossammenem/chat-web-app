export function collapseOpen(){
  document.getElementById("collapse-div")?.classList.add('active');
  document.getElementById("collapse-wrapper")?.classList.add('active');
}

export function collapseClose(){
  document.getElementById("collapse-div")?.classList.remove('active');
  document.getElementById("collapse-wrapper")?.classList.remove('active');
}