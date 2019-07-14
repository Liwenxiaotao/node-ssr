import('./add.css')
const add = {
  init() {
    console.log('add')
    xtag.create('x-add', class extends XTagElement {
      name (){ return 'Frankenstein'; }
      '::template(true)' (){
        return `<h2>I am ${this.name()}</h2>
                <span>I was created by a mad scientist</span>
                </br>
                <button id="js-btn" class="btn btn-primary btn-sm">Transfer cash</button>`
      }

      'click::event'(e){
        if (e.target.id === 'js-btn') {
          alert(2222)
        }
      }
    });
  }
}

export default add