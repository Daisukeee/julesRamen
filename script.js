console.log("script.js loaded successfully.");

const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // IMPORTANT: Replace with your actual Gemini API Key

const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const analyzeButton = document.getElementById('analyzeButton');
const resultsDiv = document.getElementById('results');

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

analyzeButton.addEventListener('click', function() {
    if (!imagePreview.src || imagePreview.src.endsWith('#')) {
        resultsDiv.textContent = "Please upload an image first.";
        return;
    }

    // Check if an image has been selected
    if (!imagePreview.src || imagePreview.src.endsWith('#') || imagePreview.style.display === 'none') {
        resultsDiv.innerHTML = `<p style="color: red;">Please select an image first.</p>`;
        return;
    }

    const imageData = imagePreview.src;
    resultsDiv.innerHTML = "<p>Analyzing, please wait...</p>"; // Clear previous results and show status

    getGeminiImageAnalysis(imageData)
        .then(analysisData => {
            const shopDetails = identifyRamenShop(analysisData);
            // Format the display of results
            resultsDiv.innerHTML = `
                <p><strong>Shop Name:</strong> ${shopDetails.shop_name}</p>
                <p><strong>Location:</strong> ${shopDetails.location}</p>
            `;
        })
        .catch(error => {
            console.error("Error during analysis:", error);
            resultsDiv.innerHTML = `<p style="color: red;">Error analyzing image. Please try again. Details: ${error}</p>`;
        });
});

function getGeminiImageAnalysis(imageData) {
    console.log("IMPORTANT: This is a mock API call for Gemini image analysis. Configure your Gemini API key and implement the actual API call.");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate an error occasionally (e.g., 25% chance)
            if (Math.random() < 0.25) {
                console.error("Simulating Gemini API Error");
                reject("Simulated Gemini API Error: Failed to process image.");
            } else {
                // Mock raw analysis from Gemini
                const mockAnalysis = {
                    "text_detected": "Super Ramen",
                    "visual_features": ["noodles", "pork", "egg", "seaweed"],
                    "image_quality": "good"
                };
                console.log("Mock Gemini Analysis:", mockAnalysis);
                resolve(mockAnalysis);
            }
        }, 1500); // Simulate 1.5 seconds delay
    });
}

function identifyRamenShop(analysisData) {
    // TODO: Implement actual shop identification using analysisData, Ramen Database, and Tabelog.
    console.log("Received analysis data for shop identification:", analysisData);
    // For now, return a mock shop name and location
    const mockShopDetails = {
        "shop_name": "Mock Ramen Deluxe",
        "location": "東京都：東京駅" // Updated location format
    };
    return mockShopDetails;
}
