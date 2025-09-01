document.addEventListener('DOMContentLoaded', () => {
    const peixinho = document.getElementById('peixinho');

    if (peixinho) {
        peixinho.style.display = 'block';

        // --- Configurações da Animação (Você pode ajustar!) ---
        const CHASING_SPEED = 0.02;     // Velocidade da perseguição (bem lento: 0.02)
        const ORBIT_SPEED = 0.2;        // Velocidade da órbita (bem rápido: 0.2)
        const ORBIT_RADIUS = 60;        // Distância que o peixe orbita do mouse (em pixels)
        const TRIGGER_DISTANCE = 80;    // Distância para começar a orbitar (tem que ser > ORBIT_RADIUS)
        // ---------------------------------------------------------

        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let peixinhoPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        let orbitAngle = 0;

        // Atualiza a posição do mouse
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function animate() {
            // Calcula a distância entre o peixe e o mouse
            const dx = mouse.x - peixinhoPos.x;
            const dy = mouse.y - peixinhoPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Se o peixe estiver perto o suficiente, ele orbita. Senão, ele persegue.
            if (distance < TRIGGER_DISTANCE) {
                // ---- Comportamento de Órbita Rápida ----
                orbitAngle += ORBIT_SPEED;

                peixinhoPos.x = mouse.x + ORBIT_RADIUS * Math.cos(orbitAngle);
                peixinhoPos.y = mouse.y + ORBIT_RADIUS * Math.sin(orbitAngle);

            } else {
                // ---- Comportamento de Perseguição Lenta ----
                peixinhoPos.x += dx * CHASING_SPEED;
                peixinhoPos.y += dy * CHASING_SPEED;
            }

            // Aplica a posição na imagem do peixinho usando transform para mais performance
            peixinho.style.transform = `translate3d(${peixinhoPos.x}px, ${peixinhoPos.y}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animate);
        }

        animate();
    }
});