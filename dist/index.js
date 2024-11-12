// UTIL FUNCTIONS 
function addAndRemoveClasses(add, remove, elements){
    let argumentsArray = Array.prototype.slice.call(arguments);
    for(let i = 0; i < argumentsArray.length; i++){
        let arg = argumentsArray[i];
        if(!arg) continue;
        if(!Array.isArray(arg) && typeof arg !== 'string' && !(arg instanceof Element)){
            throw 'Elements is not an array/string/HTMLElement';
        }
        if(!Array.isArray(arg)) argumentsArray[i] = [arg];
    }

    const [addArr, removeArr, elementsArr] = argumentsArray;
    elementsArr.forEach(element => {
        if(!(element instanceof Element)) throw 'Not using DOm elements';
        if(addArr){
            addArr.forEach(add => {
                element.classList.add(add);
            });
        }
        if(removeArr){
            removeArr.forEach(remove => {
                element.classList.remove(remove);
            });
        }
    });
};


const hamburger = document.getElementById('hamburger');
// Individual slices of hamburger.
const hs1 = document.getElementById('h-s-1');
const hs2 = document.getElementById('h-s-2');
const hs3 = document.getElementById('h-s-3');
//Mobile Sidenav
const sidenav = document.getElementById('sidenav');

//Mobile Sidenav Items
const sidenavItems = document.querySelectorAll('.sidenav-items');

//Track state of hamburger
let hamburgerOpen = false;

// Used for staggering animation
let timeoutStore = [];

hamburger.onclick = () => {
    hamburgerOpen = !hamburgerOpen;
    moveMobileSidenav();

};

function moveMobileSidenav(){
    // Timeout Store
    let currentDelay = 300;
    if(hamburgerOpen){
        addAndRemoveClasses(['rotate-45', 'translate-y-3'],null,hs1);
        addAndRemoveClasses(['opacity-0'],null,hs2);
        addAndRemoveClasses(['-rotate-45', '-translate-y-4'],null,hs3);
        // Mobile Sidenav
        addAndRemoveClasses(null, 'translate-x-full', sidenav);
        sidenavItems.forEach(item => {
            let timeout = setTimeout(() => {
                addAndRemoveClasses(null, ['opacity-0', 'translate-x-5'], item);
            }, currentDelay);
            timeoutStore.push(timeout);
            currentDelay += 200;
        });
        return;
    }

    addAndRemoveClasses(null,['rotate-45', 'translate-y-3'],hs1);
    addAndRemoveClasses(null,['opacity-0'], hs2);
    addAndRemoveClasses(null,['-rotate-45', '-translate-y-4'], hs3);

    // Mobile Sidenav
    addAndRemoveClasses('translate-x-full', null, sidenav);

    //Reset Mobile Sidenav
    timeoutStore.forEach(timeout => {
        clearTimeout(timeout);
    });

    timeoutStore = [];
};
 
sidenav.addEventListener('transitionend', () => {
    if(hamburgerOpen) return;
    sidenavItems.forEach(item => {
        item.classList.add('opacity-0', 'translate-x-5');
    });
});

addEventListener('resize', e => {
    let width = document.body.clientWidth;
    if(width > 768) {
        hamburgerOpen = false;
        moveMobileSidenav();
        sidenavItems.forEach(item => {
            item.classList.add('opacity-0', 'translate-x-5');
        });
    }
});