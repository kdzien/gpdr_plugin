class GPDRPlugin{
    constructor(){
        this.init();
    };
    toggleScroll(element,status){
        status && status==="hidden" ? element.style.overflow="auto" : element.style.overflow="hidden";
    };
    postGPDR(choice){
        const gpdr_choice = {
            'choice': choice,
            'date': new Date(new Date().getTime() + 60 * 60 * 26 * 1000)
        };
        localStorage.setItem('GPDRChoice', JSON.stringify(gpdr_choice));
    };
    checkGPDR(){
        const gpdr_info = JSON.parse(localStorage.getItem('GPDRChoice'));
        if (gpdr_info){
            return new Date(gpdr_info.date).getTime() > new Date();
        };
        return false;
    };
    init(){
        if(!this.checkGPDR()){
            
            let body = document.getElementsByTagName("body")[0];
            let box = document.createElement("div");
            let button_wrapper = document.createElement("div");
    
            let box_button_accept = document.createElement("button");
            box_button_accept.appendChild(document.createTextNode("Accept"));
            box_button_accept.value='yes';
            let box_button_cancel = document.createElement("button");
            box_button_cancel.value='no';
            box_button_cancel.appendChild(document.createTextNode("Cancel"));
    
            
            button_wrapper.appendChild(box_button_accept);
            button_wrapper.appendChild(box_button_cancel);
    
            let box_title = document.createElement("h1");
            box_title.appendChild(document.createTextNode("GDPR consent"));
            
            let box_buttons = [box_button_accept,box_button_cancel];
            box_buttons.forEach(elem=>{
                elem.style.cssText = `
                width:48%;
                border:none;
                color:white;
                font-size:16px;
                padding:16px 20px;
                margin:1%;
                background-color:${elem.innerHTML==='Cancel' ? "#eb7372" : "#7bc585"};
                cursor:pointer;
                `;
                elem.addEventListener("click",()=>{
                    this.postGPDR(elem.value);
                    this.toggleScroll(body,body.style.overflow);
                    box.style.display="none";
                });
            });
            box.style.cssText = `
            box-sizing: border-box;
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align:center;
            position:fixed;
            width:${window.innerWidth < 600 ? '100%' : '600px'};
            height:300px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color:white;
            padding:50px;
            `;
            box.appendChild(box_title);
            box.appendChild(button_wrapper);
            this.toggleScroll(body,body.style.overflow);
            body.appendChild(box);
        };
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    new GPDRPlugin();
})