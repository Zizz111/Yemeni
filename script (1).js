// Clean Data Object (Yemen Only)
const foods = {
    mandi: {
        name: "Mandi (المندي)",
        desc: "The most famous Yemeni dish worldwide. A masterpiece of rice and meat (usually lamb or chicken) cooked in a special underground clay oven called a tandoor. The meat is suspended above the rice, allowing the flavorful juices to drip down, infusing the rice with a rich, smoky taste.",
        ingredients: [
            "Basmati rice (long grain)",
            "Lamb shoulder or chicken",
            "Hawaij spice mix",
            "Saffron & Turmeric",
            "Dried lime (Loomi)",
            "Charcoal (for smoking)"
        ],
        method: "1. Marinate meat with Hawaij spices overnight.\n2. Prepare rice with water and spices in the bottom of the tandoor.\n3. Suspend meat on a wire rack above rice.\n4. Seal the oven with clay/dough to trap steam.\n5. Slow cook for 4-5 hours until meat falls off the bone.",
        time: "4-5 hours",
        image: "https://www.maggiarabia.com/sites/default/files/srh_recipes/9043ba3f8f3006105328e8b3f652e0d1.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    saltah: {
        name: "Saltah (سلتة)",
        desc: "The undisputed national dish of Yemen. A boiling hot stew served in a heavy stone pot called a 'Madara'. It is the centerpiece of the Yemeni lunch, known for its rich flavor and the frothy fenugreek topping called 'Hilbeh'.",
        ingredients: [
            "Maraq (Meat broth)",
            "Minced meat or lamb cubes",
            "Hilbeh (Whipped Fenugreek)",
            "Zhug (Spicy chili relish)",
            "Vegetables (Potatoes, tomatoes)",
            "Scrambled eggs (optional base)"
        ],
        method: "1. Prepare a rich meat broth.\n2. Heat the stone pot until extremely hot.\n3. Add vegetables and meat to the pot.\n4. Top with the whipped fenugreek mixture just before serving.\n5. Eat directly from the bubbling pot with flatbread.",
        time: "1 hour",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    tea: {
        name: "Adani Tea (شاي عدني)",
        desc: "Also known as Shai Haleeb. This is not just tea; it's a dessert-like beverage originating from Aden. It uses evaporated milk and a specific blend of spices to create a rich, creamy, and caramel-colored tea.",
        ingredients: [
            "Loose black tea leaves",
            "Evaporated milk",
            "Sugar (generous amount)",
            "Cardamom pods (crushed)",
            "Cloves",
            "Nutmeg (pinch)"
        ],
        method: "1. Boil water with sugar and spices for 5 minutes.\n2. Add tea leaves and simmer until dark red.\n3. Add evaporated milk and simmer on low heat.\n4. Aerate by pouring from a height before serving.",
        time: "15-20 minutes",
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    fatta: {
        name: "Fatta (فتة)",
        desc: "A warm, comforting dish made from pieces of freshly baked flatbread mixed with various ingredients. It can be savory (with broth and meat) or sweet (with honey, dates, and cream). A staple for breakfast or post-dinner.",
        ingredients: [
            "Yemeni flatbread (Khubz or Malooga)",
            "Warm meat broth OR Warm milk",
            "Ghee (Clarified butter)",
            "Honey (for sweet version)",
            "Nigella seeds"
        ],
        method: "1. Tear fresh bread into small pieces while hot.\n2. Mix in a bowl with hot broth (savory) or milk (sweet).\n3. Drizzle generously with ghee.\n4. Top with honey/dates (sweet) or serve with meat (savory).",
        time: "30 minutes",
        image: "https://www.seriouseats.com/thmb/AjCWELRsi9H5vhejPVkhjoSc5CE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Serious-Eats_2023MPP_JenCausey_Fatta2-903d5865295b4d3dbfe2383f2894ca0a.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
};

// --- Logic ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 2. Modal Logic
    const modal = document.getElementById('foodModal');
    const closeBtn = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-btn');

    function openModal(foodKey) {
        const food = foods[foodKey];
        if(!food) return;

        document.getElementById('modalFoodName').textContent = food.name;
        document.getElementById('modalFoodDesc').textContent = food.desc;
        document.getElementById('modalFoodMethod').innerText = food.method; // innerText preserves newlines
        document.getElementById('modalFoodTime').textContent = food.time;
        document.getElementById('modalFoodImage').src = food.image;

        const ingList = document.getElementById('modalFoodIngredients');
        ingList.innerHTML = '';
        food.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ingList.appendChild(li);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find parent card to get data attribute
            const card = e.target.closest('.food-card');
            const key = card.getAttribute('data-food');
            openModal(key);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeModal();
    });

    // 3. Mobile Menu
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navMenu');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if(nav.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 4. Smooth Scroll for Explore Button
    document.getElementById('exploreBtn').addEventListener('click', () => {
        document.getElementById('food').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
});