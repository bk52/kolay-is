class Duration{
    constructor(title){
        this.title=title;
    }
    Start(){this.startdt=Date.now()}
    Stop(){
        console.log(this.title + ' Runtime in MS: ', Date.now() - this.startdt);
    }
}

module.exports=Duration;