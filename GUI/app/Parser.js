class Parser{

    static id = String(Math.floor(Math.random()*1000000))

    constructor(label, session) {

        // Generic Plugin Attributes
        this.label = label
        this.session = session
        this.params = {}

        // UI Identifier
        this.props = {
            id: String(Math.floor(Math.random()*1000000)),
            state: null
        }

        this.props.container = document.createElement('div')
        this.props.container.id = this.props.id
        this.props.container.style = `
            width: 50%;
            backgroundColor: 'blue';
        `
        this.props.title = document.createElement('h1')
        this.props.rate = document.createElement('div')
        


        this.props.title.innerHTML = 'Concentration Rate'
        this.props.rate.innerHTML = `<p class="rate" >Select a state below to get Music Assistance</p>`
        
        var buttons = document.createElement('div');
        var button1 = document.createElement("button");
        var button2 = document.createElement("button");
        var button3 = document.createElement("button");
        var stop = document.createElement("button");
        button1.innerHTML = "Over-Focused";
        button2.innerHTML = "Unfocused";
        button3.innerHTML = "Drowsed";
        stop.innerHTML = "Stop Music";
        
        const EL_body = document.querySelector("body");
        const changeBodyBg = (color) => EL_body.style.backgroundColor = color;
        button1.addEventListener("click", () => changeBodyBg("#ACE1AF"));
        button2.addEventListener("click", () => changeBodyBg("#87A96B"));
        button3.addEventListener("click", () => changeBodyBg("#8F9779"));
        const changeRate = (rate) => this.props.rate.innerHTML = rate;
        button1.addEventListener("click", () => changeRate(`<p class="rate" >State: Over-Focused -> Music help to get Relaxed</p>`));
        button2.addEventListener("click", () => changeRate(`<p class="rate" >State: Unfocused -> Music help to get Focused</p>`));
        button3.addEventListener("click", () => changeRate(`<p class="rate" >State: Drowsed -> Music help to get Awake</p>`));

        var audio = document.createElement("AUDIO");
        audio.autoplay = true;
        const changeAudio = (audioName) => audio.setAttribute("src",audioName);
        button1.addEventListener("click", () => changeAudio("./app/music/relaxed.mp3"));
        button2.addEventListener("click", () => changeAudio("./app/music/focused.mp3"));
        button3.addEventListener("click", () => changeAudio("./app/music/awake.mp3"));

        const stopAudio = () => audio.pause();
        stop.addEventListener("click", () => stopAudio());
        // audio.setAttribute("src","./app/music/relaxed.mp3");
        audio.setAttribute("controls", "controls");
        document.body.appendChild(audio);

        buttons.appendChild(button1)
        buttons.appendChild(button2)
        buttons.appendChild(button3)
        buttons.appendChild(stop)
        this.props.buttons = buttons;

        this.props.container.insertAdjacentElement('beforeend', this.props.title)
        this.props.container.insertAdjacentElement('beforeend', this.props.rate)
        this.props.container.insertAdjacentElement('beforeend', this.props.buttons)

        // document.body.style.backgroundColor = color;

        // this.props.label = document.createElement('h1')
        // this.props.readout = document.createElement('div')
        
        // this.props.label.innerHTML = 'Attention Data'
        // this.props.readout.innerHTML = `<p class="readout" >Username: default</p>`

        // this.props.container.insertAdjacentElement('beforeend', this.props.label)
        // this.props.container.insertAdjacentElement('beforeend', this.props.readout)

        // Port Definition
        this.ports = {
            default: {
                input: {type: 'number'},
                output: {type: null},
                onUpdate: (userData) => {
                    console.log(userData)
                    this.props.label.innerHTML = userData[0].meta.label
                    let coherenceReadouts = this.props.readout.querySelectorAll(`.readout`)
            
                    let idRegistry = new Set(userData.map(u => u.id))
            
                    for (let readout of coherenceReadouts){
                        if (Array.isArray(userData)){
                            let id = readout.id.replace(`${this.props.id}-`,'')
                            let found = userData.find(u => u.id === id)
                            if (found) {
                                idRegistry.delete(found.id)
                                readout.innerHTML = `${found.username}: ${found.data}`
                            } else {
                                readout.remove()
                            }
                        }
                    }
            
                    idRegistry.forEach(id => {
                        let u = userData.find(u => u.id === id)
                        let value = u.data
                        if (typeof value === "number") value = value.toFixed(2)
                        this.props.readout.innerHTML += `<p id="${this.props.id}-${u.id}" class="readout" >${u.username}: ${u.data}</p>`
                    })
            },
            
        }, 
        element: {
            default: this.props.container,
            input: {type: null},
            output: {type: Element},
        }
        }
    }

    init = () =>  {}

    deinit = () => {}
}
export {Parser}