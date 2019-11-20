// Listen for submit button
document.getElementById("loan-form").addEventListener("submit", e => {
    e.preventDefault();
    // Hide result
    document.getElementById("results").style.display = "none";

    // Show loader
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResult, 1000);
});

function calculateResult() {
    // UI variables
    const $amount = document.getElementById("amount");
    const $interest = document.getElementById("interest");
    const $year = document.getElementById("years");

    const $monthlyPayment = document.getElementById("monthly-payment");
    const $totalPayment = document.getElementById("total-payment");
    const $totalInterest = document.getElementById("total-interest");

    const principal = parseFloat($amount.value);
    const calculatedInterest = parseFloat($interest.value) / 100 / 12;
    const calculatedPayment = parseFloat($year.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        $monthlyPayment.value = monthly.toFixed(2);
        $totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        console.log("totalpayment", $totalPayment);
        $totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);

        // Show results and hide loader
        document.getElementById("loading").style.display = "none";
        document.getElementById("results").style.display = "block";
    } else {
        showError("Please fill in the field");
    }
}

function showError(error) {
    // Hide loader and results
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "none";

    // Get elements
    const $card = document.querySelector(".card");
    const $heading = document.querySelector(".heading");

    // Create a div
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    $card.insertBefore(errorDiv, $heading);

    // Remove after 3s
    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
}
