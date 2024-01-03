import text from "./src/status.txt?raw"

let videoLength = 219
let i = 0
let disable_video = false

let MultiStatus = text.split("(end status)")
let int,sc
let path = new URL(".", import.meta.url).href
let running = false

function badApple() {
    if (!running) {
        running = true
        const interval = setInterval(() => {
            sc = document.querySelector('.hover-card-status-message')
                if (sc) {
                    clearInterval(interval)
                    if (!disable_video) {
                        document.querySelector("#BadApple").hidden = false
                        document.querySelector("#BadApple-video").currentTime = 0
                        document.querySelector("#BadApple-video").play()
                    }
                    int = setInterval(() => {
                        if (i >= MultiStatus.length - 1) {stop()}
                        else i++
                        sc.textContent = MultiStatus[i]
                    }, (videoLength/MultiStatus.length)*1000)
                }
        }, 100)
    }
    else {console.log("Can not run multi bad apple at the same time.")}
}
function stop() {
    clearInterval(int)
    console.log("Stopped")
    i=0
    running = false
    if (!disable_video) {
        document.querySelector("#BadApple").hidden = true
        let video = document.querySelector("#BadApple-video")
        video.currentTime = 0
        video.pause()
    }
}
async function addBadAppleVideo(root) {
    const { Component, jsx, render } = await import('//esm.run/nano-jsx')
    class LoaderMenu extends Component {
        render() {
            return jsx/*html*/`
                <div class="modal" id="BadApple" hidden style="position: absolute; inset: 0px;">
                    <video id="BadApple-video" autoplay src="${path}src/bad_apple.webm" style="width: 500px; margin-top: 200px; margin-left: 100px;"></video>
                </div>
            `
        }
    }
    render(jsx`<${LoaderMenu} />`, root)
}

window.addEventListener("load", async ()=> {
    let NStyle = document.createElement('style')
	NStyle.appendChild(document.createTextNode(/*css*/`
        lol-social-avatar[ref='iconElement'], .lol-social-identity.ember-view > .details {
            z-index: 1 !important;
        }
    `))
	document.body.appendChild(NStyle)

    if (!disable_video) {
        const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
        const root    = document.createElement('div')
        while (!manager()) await new Promise(r => setTimeout(r, 200))
        await addBadAppleVideo(root)
        manager().prepend(root)

        let video = document.querySelector("#BadApple-video")
        video.pause()
        video.volume = 0.5
    }
})

window.addEventListener("keydown", async (event)=>{
    if (event.altKey && event.key=="b") badApple()
    if (event.altKey && event.key=="s") stop()
})

export async function load() {
    CommandBar.addAction({name: "Start Bad Apple", group: "Bad Apple", perform: () => badApple()})
    CommandBar.addAction({name: "Stop Bad Apple", group: "Bad Apple", perform: () => stop()})
}