function display(){
    console.log('btn clicked');

    const elements = document.getElementsByClassName('landing-container');
    if (elements.length > 0) {
        const toggle = elements[0];
        if (elements.length > 0) {
            const toggle = elements[0];
            if (toggle.style.width === '80vw' || toggle.style.width == '') {
                toggle.style.width = '100vw';
                toggle.style.left = '0';
            } else {
                toggle.style.width = '80vw';
                toggle.style.left = '20vw';
            }
    }
}
}