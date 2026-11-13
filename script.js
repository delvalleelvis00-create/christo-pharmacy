// Keep this list in sync with the drugs shown on the page
const drugs = [
  "Paracetamol", "Tramadol", "Codeine",
  "Ibuprofen", "Diclofenac", "Celecoxib", "Aspirin",
  "Cefuroxime", "Ciprofloxacin", "Amoxicillin",
  "Vitamin C", "Vitamin D", "Multivitamins",
  "Bandages", "Antiseptic cream", "Gauze"
];

function isAvailable(drugName) {
  const search = drugName.trim().toLowerCase();
  return drugs.map(d => d.toLowerCase()).includes(search);
}

function checkDrug(drugName) {
  if (drugName.trim() === "") {
    return "Please type a drug name.";
  }
  if (isAvailable(drugName)) {
    return `${drugName} is available.`;
  } else {
    return `Sorry, ${drugName} is not available.`;
  }
}

// Find the elements on the page
const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("drug-search");
const resultBox = document.getElementById("result");
const drugItems = document.querySelectorAll(".category li");
const categories = document.querySelectorAll(".category");

// Hide drugs that don't match what was typed
function filterDrugs(text) {
  const search = text.trim().toLowerCase();

  drugItems.forEach(function (item) {
    const matches = item.textContent.toLowerCase().includes(search);
    item.classList.toggle("hidden", !matches);
  });

  categories.forEach(function (category) {
    const visibleCount = category.querySelectorAll("li:not(.hidden)").length;
    category.classList.toggle("hidden", visibleCount === 0);
  });
}

// When the Search button is clicked
searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  const searchText = searchBox.value;
  resultBox.textContent = checkDrug(searchText);

  resultBox.classList.remove("success", "error");

  if (isAvailable(searchText)) {
    resultBox.classList.add("success");
  } else {
    resultBox.classList.add("error");
  }
});

// When the visitor types in the search box
searchBox.addEventListener("input", function () {
  resultBox.textContent = "";
  resultBox.classList.remove("success", "error");
  filterDrugs(searchBox.value);

  const anyVisible = document.querySelectorAll(".category li:not(.hidden)").length;

  if (anyVisible === 0) {
    resultBox.textContent = "No drugs match your search.";
    resultBox.classList.add("error");
  }
});
