//your code here

document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  const images = ["img1", "img2", "img3", "img4", "img5"];
  let state = {
    selectedImages: [],
    selectedIndices: [],
  };

  // Function to render images
  const renderImages = () => {
    imageContainer.innerHTML = "";
    para.innerHTML = "";
    const shuffledImages = [...images];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    shuffledImages.push(randomImage);
    shuffledImages.sort(() => Math.random()-0.5);

    shuffledImages.forEach((className, index) => {
      const img = document.createElement("img");
      img.className = className;
      img.dataset.index = index;
      img.addEventListener("click", handleImageClick);
      imageContainer.appendChild(img);
    });
  };

  // Reset state
  const resetState = () => {
    state.selectedImages = [];
    state.selectedIndices = [];
    renderImages();
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.innerHTML = "";
  };

  // Handle image click
  const handleImageClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const className = e.target.className;

    if (state.selectedIndices.includes(index)) return; // Prevent double-clicking the same image
    if (state.selectedImages.length === 2) return; // Prevent selecting more than 2 images

    state.selectedImages.push(className);
    state.selectedIndices.push(index);
    e.target.classList.add("selected");

    resetButton.style.display = "block";
    if (state.selectedImages.length === 2) {
      verifyButton.style.display = "block";
    }
  };

  // Handle verify
  const handleVerify = () => {
    if (state.selectedImages[0] === state.selectedImages[1]) {
      para.innerHTML = "You are a human. Congratulations!";
    } else {
      para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none";
  };

  // Event Listeners
  resetButton.addEventListener("click", resetState);
  verifyButton.addEventListener("click", handleVerify);

  // Initialize
  renderImages();
});
``
