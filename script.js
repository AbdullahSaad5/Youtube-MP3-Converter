const button = document.getElementById("submit");
const input = document.getElementById("url");
const thumbnail = document.getElementById("thumbnail");
const videoTitle = document.getElementById("video-title");
const videoSize = document.getElementById("video-size");
const downloadLink = document.getElementById("download-link");
const videoContainer = document.getElementById("video");
const loader = document.getElementById("loader");

input.addEventListener("keyup", () => {
  if (input.value.length > 0) {
    button.classList.remove("disabled");
    button.disabled = false;
  } else {
    button.classList.add("disabled");
    button.disabled = true;
  }
});

function getVideoID(url) {
  if (url.includes("youtube")) {
    return url.split("v=")[1];
  } else if (url.includes("youtu.be")) {
    return url.split("youtu.be/")[1];
  } else {
    validUrl = false;
    window.alert("Invalid YouTube URL");
  }
}

async function getLink() {
  const videoID = getVideoID(input.value);
  if (videoID) {
    loader.style.display = "block";
    try {
      const response = await fetch(
        `https://youtube-to-mp32.p.rapidapi.com/api/yt_to_mp3?video_id=${videoID}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "youtube-to-mp32.p.rapidapi.com",
            "x-rapidapi-key":
              "1511f96f0amshef8dcc96fe1e108p104db9jsn1dbaf37fb1f8",
          },
        }
      );
      const responseJSON = await response.json();
      thumbnail.src = responseJSON.Video_Thumbnail;
      videoTitle.textContent = responseJSON.Title;

      videoSize.textContent = responseJSON.Download_Size;
      downloadLink.href = responseJSON.Download_url;
      loader.style.display = "none";
      videoContainer.style.display = "flex";
    } catch (e) {
      console.log(e);
      window.alert("Error: Something went wrong. Please try again");
    }
  }
}

button.addEventListener("click", () => {
  if (!button.disabled) {
    getLink();
  }
});
