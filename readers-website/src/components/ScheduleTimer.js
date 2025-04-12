export class ScheduleTimer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.updateTimer();
        setInterval(() => this.updateTimer(), 60000); // Update every minute
    }

    updateTimer() {
        const now = new Date();
        const targetTime = new Date();
        
        // Set target time to today's 9 PM
        targetTime.setHours(21, 0, 0, 0);
        
        // If it's already past 9 PM, set for tomorrow
        if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
        
        const diff = targetTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        this.container.textContent = `Next episode in ${hours}h ${minutes}m`;
        
        // Check if it's showtime (between 9-10 PM)
        const currentHour = now.getHours();
        if (currentHour === 21) { // 9 PM
            this.container.textContent = "Live now!";
            return true;
        }
        return false;
    }
}
