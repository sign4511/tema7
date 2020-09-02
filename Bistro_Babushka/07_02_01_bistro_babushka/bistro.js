  let json;
  let filter = "alle";
  let temp = document.querySelector("template");
  let container = document.querySelector("#liste");

  const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";


  async function hentdata() {
      const resultat = await fetch(link);
      json = await resultat.json();
      addEventListenerToButtons();
      vis(json);
  }

  function vis(retter) {


      container.innerHTML = "";
      retter.feed.entry.forEach(ret => {
          console.log(ret);
          // hvis filteret er det samme som rettens kategori
          if (ret.gsx$kategori.$t == filter) {

              const klon = temp.cloneNode(true).content;
              klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
              klon.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t;
              klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
              klon.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";

              klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

              container.appendChild(klon);
          }
          if (filter == "alle") {
              const klon = temp.cloneNode(true).content;
              klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
              klon.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t;
              klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
              klon.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";

              klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

              container.appendChild(klon);
          }
      });

  }

  document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");

  function visDetaljer(ret) {
      console.log(ret);
      popup.style.display = "block";
      popup.querySelector(".navn").textContent = ret.gsx$navn.$t;
      popup.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t;
      popup.querySelector(".lang").textContent = ret.gsx$lang.$t;
      popup.querySelector(".oprindelse").textContent = "Oprindelse: " + ret.gsx$oprindelse.$t;
      popup.querySelector("img").src = "imgs/large/" + ret.gsx$billede.$t + ".jpg";
  }


  function addEventListenerToButtons() {
      document.querySelectorAll(".filter").forEach((btn) => {
          btn.addEventListener("click", filterBTNs);
      })
  }

  function filterBTNs() {
      filter = this.dataset.retter;
      document.querySelector("h2").textContent = this.textContent;
      document.querySelectorAll(".filter").forEach((btn) => {

          btn.classList.remove("valgt");

      })

      this.classList.add("valgt");
      vis(json);
  }

  hentdata();
