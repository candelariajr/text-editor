(() => {
    //globals
    //set default font size
    let fontSize = 20;

    document.addEventListener("DOMContentLoaded", () => {
        //variables for holding down the buttons
        let timeout = null;
        let hold = null;
        //references to the HTML objects that the script interacts with
        const mainTextArea = document.getElementById("text-area");
        const increaseFontButton = document.getElementById("increase-font");
        const decreaseFontButton = document.getElementById("decrease-font");
        const saveButton = document.getElementById('save');

        //click increase font button
        increaseFontButton.addEventListener('mouseup', () => {
            clearTimeout(timeout);
            clearInterval(hold);
        });

        //click and hold increase font button
        increaseFontButton.addEventListener('mousedown', () => {
            increaseFont(mainTextArea);
            timeout = setTimeout(()=> {
                hold = setInterval(()=>{
                    increaseFont(mainTextArea);
                }, 50);
            }, 1000);
        });

        //click decrease font button
        decreaseFontButton.addEventListener('mouseup', () => {
            clearTimeout(timeout);
            clearInterval(hold);
        });

        //click and hold decrease font button
        decreaseFontButton.addEventListener('mousedown', () => {
            decreaseFont(mainTextArea);
            timeout = setTimeout(()=> {
                hold = setInterval(()=>{
                    decreaseFont(mainTextArea);
                }, 50);
            }, 1000);
        });

        //save button call to saveToElectron in context bridge to ipc listener in main
        saveButton.addEventListener('click', () => {
            window.electron.saveToElectron(mainTextArea.value);
        });

        //proof of concept of custom event listener from main to context bridge to renderer
        window.electron.storeData('store-data', (event,  data) =>{
            //It doesn't have to be a console.log, this was just an example
            console.log("From Server: "+  data);
        });
    });

    //These two can probably be consolidated into one
    //increases font- called by click and hold increase font buttons
    function increaseFont(t){
        fontSize++;
        t.style.fontSize = `${fontSize}px`;
    }

    //decreases font- called by click and hold decrease font buttons
    function decreaseFont(t){
        fontSize--;
        t.style.fontSize = `${fontSize}px`;
    }
})();