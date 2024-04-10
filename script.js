const track = document.getElementById("slider");

const handleOnDown = (e) => {
  if (e.clientX !== undefined) {
    track.dataset.mouseDownAt = e.clientX;
  } else if (e.touches && e.touches[0].clientX !== undefined) {
    track.dataset.mouseDownAt = e.touches[0].clientX;
  }
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  let clientX;
  if (e.clientX !== undefined) {
    clientX = e.clientX;
  } else if (e.touches && e.touches[0].clientX !== undefined) {
    clientX = e.touches[0].clientX;
  }

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
    maxDelta = window.innerWidth;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translateX(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );
};

window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", handleOnDown);

window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", handleOnUp);

window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", handleOnMove);
