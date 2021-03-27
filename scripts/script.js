(() => {
    let fontSize = 20;

    document.addEventListener("DOMContentLoaded", () => {
        let timeout = null;
        let hold = null;
        const mainTextArea = document.getElementById("text-area");
        const increaseFontButton = document.getElementById("increase-font");
        const decreaseFontButton = document.getElementById("decrease-font");
        const saveButton = document.getElementById('save');

        increaseFontButton.addEventListener('mousedown', () => {
            increaseFont(mainTextArea);
            timeout = setTimeout(()=> {
                hold = setInterval(()=>{
                    increaseFont(mainTextArea);
                }, 50);
            }, 1000);
        });

        increaseFontButton.addEventListener('mouseup', () => {
            clearTimeout(timeout);
            clearInterval(hold);
        });

        decreaseFontButton.addEventListener('mousedown', () => {
            decreaseFont(mainTextArea);
            timeout = setTimeout(()=> {
                hold = setInterval(()=>{
                    decreaseFont(mainTextArea);
                }, 50);
            }, 1000);
        });

        decreaseFontButton.addEventListener('mouseup', () => {
            clearTimeout(timeout);
            clearInterval(hold);
        });

        saveButton.addEventListener('click', () => {
            window.electron.saveToElectron(mainTextArea.value);
        });

        window.electron.storeData('store-data', (event,  data) =>{
            console.log("From Server: "+  data);
        });
    });

    function increaseFont(t){
        fontSize++;
        t.style.fontSize = `${fontSize}px`;
    }

    function decreaseFont(t){
        fontSize--;
        t.style.fontSize = `${fontSize}px`;
    }
})();