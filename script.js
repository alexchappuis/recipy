document.addEventListener('DOMContentLoaded', function () {
    const favoriteRecipes = ['Pasta Carbonara', 'Gambas Al Ajillo']; // Example data, replace with actual data

    window.redirectToRecipes = function (option) {
        if (option === 'new') {
            // Call ChatGPT API to generate a new recipe using favoriteRecipes as context
            generateRecipeUsingChatGPT(favoriteRecipes);
        } else if (option === 'previous') {
            // Implement logic to display previous recipes or redirect to a page where they can be viewed.
        }
    };

    // Sample data for the profile page
    const favoriteRecipesList = document.getElementById('favoriteRecipesList');
    const wishlistRecipesList = document.getElementById('wishlistRecipesList');

    // Populate favorite recipes
    function populateList(list, data) {
        list.innerHTML = '';
        data.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = recipe;
            list.appendChild(li);
        });
    }

    // Function to add a new recipe
    function addRecipeToList(list, data, recipe) {
        data.push(recipe);
        populateList(list, data);
    }

    populateList(favoriteRecipesList, favoriteRecipes);

    // Function to show prompt and add a new recipe
    window.addRecipe = function (listType) {
        const recipe = prompt(`Enter a new recipe for your ${listType} list:`);
        if (recipe) {
            if (listType === 'favorite') {
                addRecipeToList(favoriteRecipesList, favoriteRecipes, recipe);
            } else if (listType === 'wishlist') {
                // You can add similar logic for wishlist if needed
            }
        }
    };

    async function generateRecipeUsingChatGPT(context) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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', // Replace with your ChatGPT API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: 'You are a helpful assistant that provides recipe suggestions. you have my previous favorite recipes and you will provide a recomendation based on my favorite recipes' }, ...context.map(recipe => ({ role: 'user', content: recipe }))]
                }),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const generatedRecipe = data.choices[0].message.content;
                alert(`Generated Recipe: ${generatedRecipe}`);
            } else {
                alert('Error generating recipe. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating recipe. Please try again.');
        }
    }
});
