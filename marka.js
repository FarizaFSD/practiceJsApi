window.onload = () => listele();

const domain = "https://proje-bir.altayagency.com";

const listele = async () => {
  let alan = document.getElementById("alan");
  alan.innerHTML = "";

  const url = domain + "/api/marka/list";

  let markalar;

  let response = await fetch(url)
    .then((response) => response.json())
    .then((data) => (markalar = data))
    .catch((err) => console.log(err));

  markalar["markalar"].forEach((element) => {
    let div = document.createElement("div");
    div.classList = "bg-warning p-5 mt-2";
    div.innerHTML = `
      <input class="p-2 border-0 bg-warning form-control" onchange="safe(${element.id})"  value="${element.ad}" id="guncelAd-${element.id}"></input>
      <textarea class="form-control border-0 bg-warning" 
      style="border-style: none; 
      border-color: transparent; 
      overflow: auto; resize:none" id="guncelAc-${element.id}" onchange="safe(${element.id})">${element.aciklama}</textarea>
      <img class="mt-4" height="200" src="${element.logo}"/> <br>
      <button class="btn btn-danger mt-5" onclick="sil(${element.id})">Delete</button>
  `;
    alan.appendChild(div);
  });
};
///////////////////////////////////////////////////////////////////////////
const sil = async (id) => {
  let response = await fetch(
    `https://proje-bir.altayagency.com/api/marka/delete/${id}`,
    {
      method: "DELETE",
    }
  );
  if (response.status == 200) {
    listele();
  }
};
///////////////////////////////////////////////////////////////////////////
const safe = async (id) => {
  let ad = document.getElementById(`guncelAd-${id}`).value;
  let aciklama = document.getElementById(`guncelAc-${id}`).value;

  let texts = {
    ad: ad,
    aciklama: aciklama,
  };
  let response = await fetch(
    `https://proje-bir.altayagency.com/api/marka/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(texts),
    }
  );

  if (response.status == 200) {
    listele();
  }
};
