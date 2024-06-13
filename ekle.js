const cek = (id) => document.getElementById(id).value;

const domain = "https://proje-bir.altayagency.com";

const kaydet = async () => {
  let obj = {
    ad: cek("ad"),
    aciklama: cek("aciklama"),
    logo: cek("logo"),
  };
  
  const url = domain + "/api/marka/create";

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  let response = await fetch(url, settings);

  if (response.status == 200) window.location.href = "index.html";
};
