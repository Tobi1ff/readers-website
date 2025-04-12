export class ChatDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentIndex = 0;
    }

    async displayConversation(conversation) {
        for (const [speaker, text] of Object.entries(conversation)) {
            await this.typeMessage(speaker, text);
        }
    }

    async typeMessage(speaker, text) {
        return new Promise((resolve) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${speaker}`;
            
            const typingIndicator = document.createElement('span');
            typingIndicator.className = 'typing';
            typingIndicator.innerHTML = `
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            `;
            
            messageDiv.appendChild(typingIndicator);
            this.container.appendChild(messageDiv);
            
            // Scroll to bottom
            this.container.scrollTop = this.container.scrollHeight;
            
            // Simulate typing after a short delay
            setTimeout(() => {
                typingIndicator.remove();
                
                let i = 0;
                const typingEffect = setInterval(() => {
                    if (i < text.length) {
                        messageDiv.innerHTML += text.charAt(i);
                        i++;
                        this.container.scrollTop = this.container.scrollHeight;
                    } else {
                        clearInterval(typingEffect);
                        resolve();
                    }
                }, 30); // Typing speed (lower = faster)
            }, 1000);
        });
    }

    clear() {
        this.container.innerHTML = '';
    }
}
