// CART FUNCTIONALITY
let cart = [];
let total = 0;
let inventoryLog = JSON.parse(localStorage.getItem("inventoryLog")) || [];

// Add product to cart
document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", function() {
    let product = this.parentElement;
    let name = product.getAttribute("data-name");
    let price = parseFloat(product.getAttribute("data-price"));

    cart.push({ name, price });
    total += price;

    updateCart();
  });
});

// Update cart display
function updateCart() {
  let cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ₱${item.price}`;
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

// Checkout process
document.getElementById("checkoutBtn").addEventListener("click", function() {
  let money = parseFloat(document.getElementById("money").value);

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  if (isNaN(money) || money < total) {
    alert("Not enough money provided!");
    return;
  }

  let change = money - total;
  document.getElementById("changeDisplay").textContent = `Change: ₱${change}`;

  // Save to inventory log
  let itemNames = cart.map(item => item.name).join(", ");
  let entry = {
    date: new Date().toLocaleString(),
    items: itemNames,
    total: total,
    moneyGiven: money,
    change: change
  };
  inventoryLog.push(entry);
  saveInventoryLog();
  renderInventoryLog();

  // Reset cart
  cart = [];
  total = 0;
  updateCart();
  document.getElementById("money").value = "";
});

// Save log
function saveInventoryLog() {
  localStorage.setItem("inventoryLog", JSON.stringify(inventoryLog));
}

// Render log
function renderInventoryLog() {
  const logList = document.getElementById("inventoryLog");
  logList.innerHTML = "";
  inventoryLog.forEach(entry => {
    let li = document.createElement("li");
    li.textContent = `${entry.date} - Items: ${entry.items} | Total: ₱${entry.total} | Paid: ₱${entry.moneyGiven} | Change: ₱${entry.change}`;
    logList.appendChild(li);
  });
}

// Export CSV
function exportCSV() {
  if (inventoryLog.length === 0) {
    alert("No records to export!");
    return;
  }

  let csv = "Date,Items,Total,Money Given,Change\n";
  inventoryLog.forEach(entry => {
    csv += `"${entry.date}","${entry.items}",${entry.total},${entry.moneyGiven},${entry.change}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "inventory_log.csv");
  a.click();
}

// Render log on page load
renderInventoryLog();
