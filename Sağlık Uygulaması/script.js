function hesapla() {
    var kilo = parseFloat(document.getElementById('kilo').value);
    var boy = parseFloat(document.getElementById('boy').value) / 100; // Boyu metre cinsinden almak için 100'e böldük.

    if (isNaN(kilo) || isNaN(boy) || kilo <= 0 || boy <= 0) {
        document.getElementById('sonuc').innerHTML = "Lütfen geçerli bir kilo ve boy değeri girin.";
    } else {
        var vki = kilo / (boy * boy);
        document.getElementById('sonuc').innerHTML = "VKİ: " + vki.toFixed(2);

        // VKİ değerine göre renkli sonuç gösterimi
        var sonucDiv = document.getElementById('sonuc');
        if (vki < 18.5) {
            sonucDiv.style.color = "blue"; // Zayıf
        } else if (vki >= 18.5 && vki < 25) {
            sonucDiv.style.color = "green"; // Normal
        } else if (vki >= 25 && vki < 30) {
            sonucDiv.style.color = "orange"; // Fazla Kilolu
        } else {
            sonucDiv.style.color = "red"; // Obez
        }
    }
}

function calculateBMR() {
    var age = parseInt(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
        document.getElementById('result').innerHTML = "Lütfen geçerli bir değer girin.";
    } else {
        var bmr = 0;

        if (gender === "male") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === "female") {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        document.getElementById('result').innerHTML = "Bazal Metabolizma Hızınız: " + bmr.toFixed(2) + " kcal/gün";
    }
}

function calculateIdealWeight() {
    var gender = document.getElementById("gender").value;
    var height = parseFloat(document.getElementById("height").value);
    var currentWeight = parseFloat(document.getElementById("currentWeight").value);

    if (isNaN(height) || isNaN(currentWeight) || height <= 0 || currentWeight <= 0) {
        document.getElementById('result').innerHTML = "Lütfen geçerli bir boy ve mevcut kilo değeri girin.";
    } else {
        var idealWeight = 0;

        if (gender === "male") {
            idealWeight = 50 + 2.3 * ((height - 152.4) / 2.54);
        } else if (gender === "female") {
            idealWeight = 45.5 + 2.3 * ((height - 152.4) / 2.54);
        }

        var weightDifference = currentWeight - idealWeight;

        document.getElementById('result').innerHTML = "İdeal Kilo Aralığınız: " + (idealWeight - 5).toFixed(2) + " - " + (idealWeight + 5).toFixed(2) + " kg";
        document.getElementById('result').innerHTML += "<br>";
        document.getElementById('result').innerHTML += "Mevcut Kilodan Fark: " + weightDifference.toFixed(2) + " kg";
    }
   
}
function calculateCalorieNeeds() {
    var gender = document.getElementById("gender").value;
    var age = parseInt(document.getElementById("age").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var activityLevel = parseFloat(document.getElementById("activityLevel").value);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel) || age <= 0 || weight <= 0 || height <= 0) {
        document.getElementById('result').innerHTML = "Lütfen geçerli değerler girin.";
    } else {
        var bmr = 0;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === "female") {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        var dailyCalorieNeeds = bmr * activityLevel;

        document.getElementById('result').innerHTML = "Günlük Kalori İhtiyacınız: " + dailyCalorieNeeds.toFixed(0) + " kcal/gün";
    }
}

function calculateWaterNeeds() {
    var gender = document.getElementById("gender").value;
    var weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(weight) || weight <= 0) {
        document.getElementById('result').innerHTML = "Lütfen geçerli bir kilo değeri girin.";
    } else {
        var waterNeeds = 0;

        if (gender === "male") {
            waterNeeds = 35 * weight;
        } else if (gender === "female") {
            waterNeeds = 30 * weight;
        }

        document.getElementById('result').innerHTML = "Günlük Su İhtiyacınız: " + waterNeeds.toFixed(0) + " mL";
    }
}
function calculateMaxHeartRate() {
    var age = parseInt(document.getElementById("age").value);

    if (isNaN(age) || age <= 0) {
        document.getElementById('result').innerHTML = "Lütfen geçerli bir yaş değeri girin.";
    } else {
        var maxHeartRate = 220 - age;
        document.getElementById('result').innerHTML = "Maksimum Kalp Hızınız: " + maxHeartRate + " vuruş/dakika";
    }
}
function calculateOneRM() {
    var weight = parseFloat(document.getElementById("weight").value);
    var repetitions = parseInt(document.getElementById("repetitions").value);

    if (isNaN(weight) || isNaN(repetitions) || weight <= 0 || repetitions <= 0) {
        document.getElementById('result').innerHTML = "Lütfen geçerli bir ağırlık ve tekrar sayısı girin.";
    } else {
        var oneRM = weight / (1.0278 - (0.0278 * repetitions));
        document.getElementById('result').innerHTML = "1RM Değeriniz: " + oneRM.toFixed(2) + " kg";
    }
}

document.addEventListener("DOMContentLoaded", getData);

async function getData() {
  const apiUrl = "https://api.collectapi.com/food/calories?query=elma";
  const apiKey = "yapikey 4qasHg1DTLsINBtHCmTO0E:4XPCJKT10RZwSs9GG7wyYM"; // Gerçek API anahtarınızı buraya yerleştirin

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "authorization": `apikey ${apiKey}`,
        "content-type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("API'den veriler alınamadı.");
    }

    const data = await response.json();
    displayData(data.result);
  } catch (error) {
    console.error(error.message);
  }
}

function displayData(foodItems) {
  const foodDataElement = document.getElementById("foodData");

  foodItems.forEach(item => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const calorieCell = document.createElement("td");
    const descriptionCell = document.createElement("td");

    nameCell.textContent = item.name;
    calorieCell.textContent = item.kalori;
    descriptionCell.textContent = item.des;

    row.appendChild(nameCell);
    row.appendChild(calorieCell);
    row.appendChild(descriptionCell);

    foodDataElement.appendChild(row);
  });
}
