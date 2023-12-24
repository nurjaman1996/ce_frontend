"use server";
import axios from "axios";
axios.defaults.headers.common['key'] = '0952f0c6e61a19c874758bd2441532b2'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export async function getOngkirApi(origin: any, destination: any, weight: any) {
  var data: any = []
  let formData: any = new FormData();
  formData.append("origin", origin);
  formData.append("originType", "subdistrict");
  formData.append("destination", destination);
  formData.append("destinationType", "subdistrict");
  formData.append("weight", weight);
  formData.append("courier", "jne:jnt:sicepat:wahana");

  await axios({
    method: "post",
    url: `https://pro.rajaongkir.com/api/cost`,
    data: formData
  })
    .then(function (response) {
      data.push(response.data.rajaongkir)
    })
    .catch(function (error) {
      console.log(error);
    });

  return data[0].results

}

export async function getProvinsi() {
  var data: any = []

  await axios({
    method: 'GET',
    url: 'https://pro.rajaongkir.com/api/province',
  })
    .then(function (response) {
      data.push(response.data.rajaongkir)
    })
    .catch(function (error) {
      console.log(error);
    });

  return data[0].results

}

export async function getdatakota(province: any) {
  var data: any = []

  await axios({
    method: 'GET',
    url: `https://pro.rajaongkir.com/api/city?province=${province}`,
  })
    .then(function (response) {
      data.push(response.data.rajaongkir)
    })
    .catch(function (error) {
      console.log(error);
    });

  return data[0].results

}

export async function getdatakecamatan(city: any) {
  var data: any = []

  await axios({
    method: 'GET',
    url: `https://pro.rajaongkir.com/api/subdistrict?city=${city}`,
  })
    .then(function (response) {
      data.push(response.data.rajaongkir)
    })
    .catch(function (error) {
      console.log(error);
    });

  return data[0].results

}

export async function getWaybill(data_resi: any) {
  var data: any = []

  for (let index = 0; index < data_resi.length; index++) {
    let formData: any = new FormData();
    formData.append("waybill", data_resi[index].resi);

    if (data_resi[index].jasa_kirim === "Jalur Nugraha Ekakurir (JNE)") {
      formData.append("courier", "jne");
    } else if (data_resi[index].jasa_kirim === "J&T Express") {
      formData.append("courier", "jnt");
    } else if (data_resi[index].jasa_kirim === "Wahana Prestasi Logistik") {
      formData.append("courier", "wahana");
    } else if (data_resi[index].jasa_kirim === "SiCepat Express") {
      formData.append("courier", "sicepat");
    }

    await axios({
      method: 'POST',
      url: `https://pro.rajaongkir.com/api/waybill`,
      data: formData
    })
      .then(function (response) {
        data.push({
          resi: response.data.rajaongkir.result.summary.waybill_number,
          jasa_kirim: response.data.rajaongkir.result.summary.courier_name,
          manifest: response.data.rajaongkir.result.manifest
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return data
}
