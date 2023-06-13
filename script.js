// let allEpisodes = getAllEpisodes();
// let storedEpisodes = allEpisodes;


// //Fetch the episode data
// const fetchAll = async () => {
//   Promise.all([
//     await fetch("https://api.tvmaze.com/shows/82/episodes"),
//     await fetch("https://api.tvmaze.com/shows")
//   ]).then(async (links) => {
//     const episodes = links[0];
//     const show = links[1];

//     timeData = episodes.json();
//     functionData = show.json();
//   })


//   // .then(response => response.json())
//   // .then(episodes => {
//   //   setup(episodes);
//   // })
//   // .catch(error => {
//   //   console.log("error fetching episodes", error);
//   // });
// }
//   //


fetch("https://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(episodes => {
    allEpisodes = episodes; // Assign the fetched data to allEpisodes
    setup(allEpisodes); // Call the setup function
  })
  .catch(error => {
    console.log("error fetching episodes", error);
  });

//Search Bar Container
const searchInput = document.getElementById("searchinput");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredEpisodes = shows.filter(episode => 
    episode.name.toLowerCase().includes(value) || 
    episode.summary.toLowerCase().includes(value)
  );
  makePageForEpisodes(filteredEpisodes);
  episodeCountNo(filteredEpisodes.length);
  storedEpisodes = filteredEpisodes;
  });


const shows = getAllShows(); 
//Show first selector
function showSelector(showsData) {
  const firstSelector = document.getElementById("first-selector");
  const secondSelector = document.getElementById("selector");
  firstSelector.innerHTML = "";
  const firstShowOption = document.createElement("option");        
  
  firstShowOption.value = -1;
  firstShowOption.textContent = "Show all";
  firstSelector.appendChild(firstShowOption);

  const sordedShows = showsData.sort((a,b) => a.name.localeCompare(b.name));

  showsData.forEach((show, index) => {
    let option = document.createElement("option");
    option.value = show.id;
    option.textContent = `${show.name}`;
    firstSelector.appendChild(option);
  });

  firstSelector.addEventListener("change", event => {
      let selectedShowId = parseInt(event.target.value);
      if (selectedShowId === -1) {
        makePageForEpisodes(allEpisodes);
        episodeSelector([]);
        secondSelector.style.display = "none";
       // secondSelector.innerHTML = "";
      } else {
        fetch(`https://api.tvmaze.com/shows/${selectedShowId}/episodes`)
        .then(response => response.json())
        .then(episodes => {
          makePageForEpisodes(episodes);
          episodeCountNo(episodes.length);
          updateSecondSelector(episodes);
          episodeSelector(episodes);
          secondSelector.style.display = "block";
        })
        .catch(error => {
          console.log("error fetching episodes", error);
        });
      }
    });

  //function for the second selector (episodes-list)
    function updateSecondSelector(episodes) {
      secondSelector.innerHTML = ""; 

      episodes.forEach((episode, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${episode.name} - S${episode.season} E${episode.number}`;
        secondSelector.appendChild(option);
      });
    }
}

//Episode second  selector
function episodeSelector(episodes){
  const selector = document.getElementById("selector"); 
  const showOption = document.createElement("option");
  
  showOption.value = -1;
  showOption.textContent = "Show All Episodes";
  selector.appendChild(showOption);
  
  episodes.forEach((episode, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = `${episode.name} - S${episode.season} E${episode.number}`;
    selector.appendChild(option);
  });

  let selectedIndex = -1;

  selector.addEventListener("change", event => {
    selectedIndex = parseInt(event.target.value);
    if (selectedIndex === -1) {
      makePageForEpisodes(allEpisodes);
    } else {
      const selectedEpisode = episode[selectedIndex];
      makePageForEpisodes([selectedEpisode]);
    }
  });
}


//Episode found: number


  function episodeCountNo(count) {
    const searchResult = document.getElementById("searchresult");
    searchResult.textContent = `Episodes Found: ${count}`;
}

//Episodes List From Selector text and numbers
// Episodes List From Selector text and numbers
function makePageForEpisodes(episodes) {
  const rootId = document.getElementById("root");
  rootId.innerHTML = "";

  for (let episode of episodes) {
    let containerDiv = document.createElement("div");
    rootId.appendChild(containerDiv);
    containerDiv.className = "box";

    let title = document.createElement("h2");
    title.innerHTML = `${episode.name.toUpperCase()}`;
    title.className = "title";

    let seasonEpisode = document.createElement("span");
    seasonEpisode.innerHTML = `Season ${episode.season} Episode ${episode.number}`;
    seasonEpisode.className = "season-episode";

    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.className = "summary";

    let episodeIMG = document.createElement("img");
    episodeIMG.src = episode.image.medium;
    episodeIMG.className = "image";

    containerDiv.appendChild(title);
    containerDiv.appendChild(seasonEpisode);
    containerDiv.appendChild(episodeIMG);
    containerDiv.appendChild(episodeSummary);
  }
}
//main setup function
function setup(episodes) {
  makePageForEpisodes(episodes);
  showSelector(shows);
  episodeSelector([]);
}

window.onload = function() {
  let episodes;
  setup(episodes);
}

