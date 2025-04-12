import { ChatDisplay } from '../src/components/ChatDisplay.js';
import { ScheduleTimer } from '../src/components/ScheduleTimer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const chatDisplay = new ChatDisplay('chat-display');
    const scheduleTimer = new ScheduleTimer('schedule-timer');
    
    // Check if it's showtime (9-10 PM)
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour === 21) { // 9 PM
        await startDailyEpisode(chatDisplay);
    }
    
    // For demo purposes, you can uncomment this to test immediately
    // await startDailyEpisode(chatDisplay);
});

async function generateConversation(topic) {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error generating conversation:', error);
        return null;
    }
}

async function startDailyEpisode(chatDisplay) {
    // Clear previous conversation
    chatDisplay.clear();
    
    // Get today's topic (you could make this dynamic)
    const topics = [
        "the mysteries of the deep ocean",
        "unsolved historical mysteries",
        "the future of artificial intelligence",
        "strange coincidences in history",
        "the psychology of decision making"
    ];
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.textContent = `Generating today's episode about ${randomTopic}...`;
    document.getElementById('chat-display').appendChild(loadingDiv);
    
    // Generate conversation
    const conversation = await generateConversation(randomTopic);
    
    // Remove loading state
    loadingDiv.remove();
    
    if (conversation) {
        // Display conversation with typing effect
        await chatDisplay.displayConversation(conversation);
    } else {
        // Fallback conversation if API fails
        const fallbackConversation = {
            host: "Welcome to our daily podcast! Today we're discussing " + randomTopic,
            guest: "Thanks for having me! This is such an interesting topic.",
            host: "I thought we'd start with the most puzzling aspect of this subject.",
            guest: "Absolutely. What fascinates me most is how little we actually know.",
            host: "That's a great point. It really makes you wonder, doesn't it?",
            guest: "It does. And the implications could be enormous if we ever find answers.",
            host: "Let's explore some of those possibilities with our listeners.",
            guest: "I'd love to. There are several theories we should examine.",
            host: "Which one do you find most compelling?",
            guest: "Personally, I'm drawn to the idea that connects multiple unexplained phenomena."
        };
        
        await chatDisplay.displayConversation(fallbackConversation);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.textContent = 'Note: Using fallback content (API unavailable)';
        document.getElementById('chat-display').appendChild(errorDiv);
    }
}

// Export for testing purposes if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateConversation,
        startDailyEpisode
    };
}
