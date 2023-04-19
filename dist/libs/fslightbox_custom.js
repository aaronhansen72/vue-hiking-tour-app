console.log("fslightbox_custom");
// console.log("fsLightbox:", typeof fsLightbox);
if(typeof fsLightbox === 'undefined')  {
    console.log("fsLightbox isssssssst undefined");
    //location.reload();
} else {
    console.log("työeof fsLightbox:", typeof fsLightboxInstances["tour-lightbox"]);
    //console.log("fsLightboxInstance ",  fsLightboxInstances["tour-lightbox"]);
    //console.log("fsLightbox:",  fsLightbox);
    loadFsLightboxCustomStettings()
}

function loadFsLightboxCustomStettings() 
{
    console.log("fslightbox_custom: function loadFsLightboxCustomStettings called");
    fsLightboxInstances["tour-lightbox"].props.exitFullscreenOnClose = true;
    fsLightboxInstances["tour-lightbox"].props.onOpen = function () {
        // change CSS of fslightbox-container
        const fsLightboxContainer = document.getElementsByClassName('fslightbox-container');
        fsLightboxContainer[0].style.background = 'linear-gradient(rgba(30,30,30,1),#000 1810%)';
        console.log("fslightbox_custom: exec cutom settings")
    }
}
window.addEventListener("load", loadFsLightboxCustomStettings);

