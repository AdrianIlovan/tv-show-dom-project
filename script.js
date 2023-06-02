//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  const rootId = document.getElementById("root");
  
  for (let episode of allEpisodes) {
    let containerDiv = document.createElement("div");
    rootId.appendChild(containerDiv);
    containerDiv.className = "box";

    let everySeason = document.createElement("span");
    everySeason.innerHTML = `Season ${Number(episode.season) > 10 ? 1 : 0}${episode.season}`;

    let everyEpisode = document.createElement("span");
    everyEpisode.innerText = `Episode${Number(episode.number) > 10 ? 1 : 0}${episode.number}`;

    let title = document.createElement("h2");
    title.innerHTML = `${episode.name} - `;
    title.appendChild(everySeason);
    title.appendChild(everyEpisode);

    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;

    let episodeIMG = document.createElement("img");
    episodeIMG.src = episode.image.medium;

    containerDiv.appendChild(title);
    containerDiv.appendChild(episodeIMG);
    containerDiv.appendChild(episodeSummary);
  }
}


function makePageForEpisodes(episodeList) {
 //const rootElem = document.getElementById("root");
 // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}


window.onload = setup;


