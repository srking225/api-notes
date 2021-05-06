let randomImage = document.querySelector('.random-image');
console.log("randomImage", randomImage);

fetch('https://source.unsplash.com/random')
.then(function(response){
    if(!response.ok){
        console.log(response);
        return new Error(response);
    }
    console.log("response:", response);
    return response.blob()
})
.then(function(photoBlob){
    console.log("My Blob:", photoBlob)
    var objectURL = URL.createObjectURL(photoBlob);
    console.log("Object URL:", objectURL);
    randomImage.src = objectURL;

    console.log("randomImage.src:", randomImage.src);
})