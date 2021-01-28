const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 6;
const apiKey = 'Ko-LD_Ip8aN46lXh5_9cetbfSTG72a21vLKw3DbRI_U';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=sandiego&&orientation=landscape&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=sandiego&orientation=landscape&count=${picCount}`;
}

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create a link <a>
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create a <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put img inside item, and then both inside image container Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
