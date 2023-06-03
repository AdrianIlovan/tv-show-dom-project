//You can edit ALL of the code here

//const boxContainer = document.getElementById("box-container");
const allEpisodes = getAllEpisodes();

const searchInput = document.getElementById("searchinput");
const searchResult = document.getElementById("searchresult");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(episode => 
    episode.name.toLowerCase().includes(value) || 
    episode.summary.toLowerCase().includes(value)
  );
  makePageForEpisodes(filteredEpisodes);
  episodeCountNo(filteredEpisodes.length);
  });



function episodeCountNo(count) {
  searchResult.textContent = `Episodes Found: ${count}`;
}

function episodeSelector(episodes){
  const selector = document.getElementById("selector"); 

  episodes.forEach((episode, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${episode.name} - Season ${episode.season} , Episode ${episode.number}`
    selector.appendChild(option);
  });

  selector.addEventListener("change", event => {
    const selectedIndex = parseInt(event.target.value);
    const selectedEpisode = episodes[selectedIndex];
    console.log(selectedEpisode);  
  });
}

function setup() {
  makePageForEpisodes(allEpisodes);
  episodeSelector(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootId = document.getElementById("root");
  rootId.innerHTML = "";
  
  for (let episode of episodeList) {
    let containerDiv = document.createElement("div");
    rootId.appendChild(containerDiv);
    containerDiv.className = "box";

    let everySeason = document.createElement("span");
    everySeason.innerHTML = `Season ${Number(episode.season) > 10 ? 1 : 0}${episode.season}`;

    let everyEpisode = document.createElement("span");
    everyEpisode.innerText = ` Episode${Number(episode.number) > 10 ? 1 : 0}${episode.number}`;

    let title = document.createElement("h2");
    title.innerHTML = `${episode.name.toUpperCase()} - `;
    title.className = "title";
    title.appendChild(everySeason);
    title.appendChild(everyEpisode);

    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.className = "summary"

    let episodeIMG = document.createElement("img");
    episodeIMG.src = episode.image.medium;
    episodeIMG.className = "image";

    containerDiv.appendChild(title);
    containerDiv.appendChild(episodeIMG);
    containerDiv.appendChild(episodeSummary);
  }
}

window.onload = setup;


