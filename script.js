const sliders = [...document.querySelectorAll(".slider__container")];

sliders.forEach((slider, i) => {
  let isDragStart = false,
    isDragging = false,
    isSlide = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  const sliderItem = slider.querySelector(".slider__item");
  var isMultislide = slider.dataset.multislide === "true";

  function autoSlide() {
    if (
      slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 ||
      slider.scrollLeft <= 0
    )
      return;
    positionDiff = Math.abs(positionDiff);
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    let valDifference = slideWidth - positionDiff;
    if (slider.scrollLeft > prevScrollLeft) {
      return (slider.scrollLeft +=
        positionDiff > slideWidth / 5 ? valDifference : -positionDiff);
    }
    slider.scrollLeft -=
      positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
  }

  function dragStart(e) {
    if (isSlide) return;
    isSlide = true;
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
    slider.classList.add("dragging");
    setTimeout(function () {
      isSlide = false;
    }, 700);
  }

  function dragging(e) {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
  }

  function dragStop() {
    isDragStart = false;
    slider.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;

    // Calcula o deslocamento em relação à largura visível do slider
    let visibleWidth = slider.clientWidth;
    let items = slider.querySelectorAll(".slider__item");
    let itemWidth = items[0].offsetWidth; // Largura de um item do slider
    let scrollableWidth = itemWidth * items.length - visibleWidth;

    // Ajusta a posição final do scroll
    let finalScrollLeft = Math.max(
      0,
      Math.min(slider.scrollLeft - positionDiff, scrollableWidth)
    );
    slider.scrollTo({ left: finalScrollLeft, behavior: "smooth" });
  }

  function applyScale() {
    sliderItem.classList.add("scale-down");
  }

  function removeScale() {
    sliderItem.classList.remove("scale-down");
  }

  addEventListener("resize", autoSlide);
  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);
  slider.addEventListener("mousemove", dragging);
  slider.addEventListener("touchmove", dragging);
  slider.addEventListener("mouseup", dragStop);
  slider.addEventListener("touchend", dragStop);
  slider.addEventListener("mouseleave", dragStop);
  slider.addEventListener("mousedown", applyScale);
  slider.addEventListener("mouseup", removeScale);
  slider.addEventListener("touchstart", applyScale);
  slider.addEventListener("touchend", removeScale);
});
