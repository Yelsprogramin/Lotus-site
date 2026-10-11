document.addEventListener("DOMContentLoaded", () => {
    // Liga os elementos do HTML ao JavaScript
    const xpCounter = document.getElementById("xp-counter");
    const xpFill = document.getElementById("xp-fill");
    
    // Define os valores do utilizador
    const targetXP = 450;      // O XP que ele tem
    const maxXP = 500;         // O XP necessário para passar de nível
    
    // Calcula que percentagem da barra deve ser preenchida
    const percentage = (targetXP / maxXP) * 100;
    
    // 1. Anima a barra roxa a encher da esquerda para a direita
    setTimeout(() => {
        xpFill.style.width = percentage + "%";
    }, 200); // Um pequeno atraso de 0.2s para o utilizador reparar nela a começar
    
    // 2. Anima os números a contar rapidamente de 0 até 450
    let currentXP = 0;
    const increment = targetXP / 40; // Velocidade da contagem
    
    const countInterval = setInterval(() => {
        currentXP += increment;
        
        // Quando atingir ou ultrapassar o alvo, para a contagem no valor exato
        if (currentXP >= targetXP) {
            currentXP = targetXP;
            clearInterval(countInterval);
        }
        
        // Atualiza o texto no ecrã (ex: 450 / 500 XP)
        xpCounter.innerText = Math.round(currentXP) + " / " + maxXP + " XP";
        
    }, 30); // Atualiza os números a cada 30 milissegundos

    // Lógica para Minimizar a Carteira
    const walletSection = document.getElementById("wallet-section");
    const minimizeBtn = document.getElementById("minimize-btn");

    minimizeBtn.addEventListener("click", () => {
        // O "toggle" liga e desliga a classe .minimized no HTML
        walletSection.classList.toggle("minimized");
    });

    // --- Sistema de Drag and Drop (Arrastar e Largar) ---
    const draggables = document.querySelectorAll('.draggable-section');
    const container = document.getElementById('profile-sections');

    // Quando começas a arrastar e quando largas
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    // A magia que deteta a posição e afasta as caixas
    container.addEventListener('dragover', e => {
        e.preventDefault(); // Permite que a secção seja largada
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });

    // Função matemática que descobre qual é a caixa que está imediatamente abaixo do teu rato
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-section:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            // Pega no centro da caixa
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});