/**
 * Motor Gráfico de Visualización Estocástica (Canvas HTML5)
 * Cátedra: Modelos y Simulación - UCSE 2026
 * Pruebas de Independencia: Corridas, Poker y Series 2D
 */

const Visualizadores = {
    // Almacén de instancias activas para limpieza
    activeCharts: {},

    /**
     * Dibuja el gráfico de dispersión bidimensional Lag-1 (r_i vs r_{i+1}) con cuadrícula k x k
     */
    renderScatterSeries: function(canvasId, datos, k = 2) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // Ajustar resolución retina / HD
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio || 500;
        canvas.height = (rect.height || 260) * window.devicePixelRatio;
        const W = canvas.width;
        const H = canvas.height;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        const w = rect.width || 500;
        const h = rect.height || 260;

        // Fondo oscuro
        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, w, h);

        const margin = 40;
        const plotW = w - 2 * margin;
        const plotH = h - 2 * margin;

        // Cuadrícula k x k
        const m = k * k;
        const ei = (datos.length - 1) / m;
        const cellCounts = new Array(m).fill(0);

        // Contabilizar celdas
        for (let i = 0; i < datos.length - 1; i++) {
            const x = datos[i];
            const y = datos[i + 1];
            const ix = Math.min(Math.floor(x * k), k - 1);
            const iy = Math.min(Math.floor(y * k), k - 1);
            cellCounts[ix * k + iy]++;
        }

        // Dibujar celdas con gradiente de calor sutil
        for (let ix = 0; ix < k; ix++) {
            for (let iy = 0; iy < k; iy++) {
                const cellIndex = ix * k + iy;
                const count = cellCounts[cellIndex];
                const ratio = Math.min(count / (ei * 2 || 1), 1);
                
                const cellX = margin + (ix / k) * plotW;
                const cellY = margin + ((k - 1 - iy) / k) * plotH;
                const cellW = plotW / k;
                const cellH = plotH / k;

                // Relleno según densidad
                ctx.fillStyle = `rgba(139, 92, 246, ${0.05 + ratio * 0.25})`;
                ctx.fillRect(cellX, cellY, cellW, cellH);

                // Bordes de celda
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 1;
                ctx.strokeRect(cellX, cellY, cellW, cellH);

                // Conteo en celda
                ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
                ctx.font = '10px "JetBrains Mono", monospace';
                ctx.textAlign = 'right';
                ctx.fillText(`O=${count}`, cellX + cellW - 6, cellY + 16);
            }
        }

        // Ejes y marco
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(margin, margin, plotW, plotH);

        // Etiquetas de ejes
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Número Actual: rᵢ  →', margin + plotW / 2, h - 10);

        ctx.save();
        ctx.translate(14, margin + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Siguiente: rᵢ₊₁  →', 0, 0);
        ctx.restore();

        // Conectar pares con líneas semitransparentes (Lag-1 path)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        for (let i = 0; i < datos.length - 1; i++) {
            const px = margin + datos[i] * plotW;
            const py = margin + (1 - datos[i + 1]) * plotH;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Dibujar puntos pares (r_i, r_{i+1}) con resplandor
        for (let i = 0; i < datos.length - 1; i++) {
            const px = margin + datos[i] * plotW;
            const py = margin + (1 - datos[i + 1]) * plotH;

            // Halo
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
            ctx.fill();

            // Centro
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
        }

        // Título del gráfico
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Prueba de Series: Cuadrícula ${k}x${k} (${m} celdas) | Pares N-1=${datos.length - 1} | Eᵢ=${ei.toFixed(2)}`, margin, margin - 12);
    },

    /**
     * Dibuja el gráfico de forma de onda temporal y secuencia binaria de corridas
     */
    renderCorridasWaveform: function(canvasId, datos, esMedia = false) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio || 500;
        canvas.height = (rect.height || 260) * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        const w = rect.width || 500;
        const h = rect.height || 260;

        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, w, h);

        const margin = 40;
        const waveH = h * 0.55;
        const binH = h * 0.25;
        const plotW = w - 2 * margin;

        // Construir secuencia binaria S
        const S = [];
        if (esMedia) {
            for (let i = 0; i < datos.length; i++) {
                S.push(datos[i] >= 0.5 ? 1 : 0);
            }
        } else {
            for (let i = 1; i < datos.length; i++) {
                S.push(datos[i] > datos[i - 1] ? 1 : 0);
            }
        }

        // Contar corridas
        let c0 = 1;
        for (let i = 1; i < S.length; i++) {
            if (S[i] !== S[i - 1]) c0++;
        }

        // Dibujar línea media teórica 0.5
        const yMed = margin + waveH * 0.5;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.moveTo(margin, yMed);
        ctx.lineTo(margin + plotW, yMed);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbbf24';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText('µ=0.5', margin - 6, yMed + 3);

        // Trazar valores de la serie temporal r_i
        const stepX = plotW / (datos.length - 1 || 1);
        ctx.beginPath();
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        for (let i = 0; i < datos.length; i++) {
            const x = margin + i * stepX;
            const y = margin + (1 - datos[i]) * waveH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Puntos r_i
        for (let i = 0; i < datos.length; i++) {
            const x = margin + i * stepX;
            const y = margin + (1 - datos[i]) * waveH;
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#c4b5fd';
            ctx.fill();
        }

        // Trazar cinta de bloques binarios S en la parte inferior
        const barY = margin + waveH + 20;
        const stepBin = plotW / S.length;
        
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Secuencia S (${esMedia ? 'Frente a Media 0.5' : 'Arriba/Abajo'}): ${S.length} bits`, margin, barY - 6);

        for (let i = 0; i < S.length; i++) {
            const bx = margin + i * stepBin;
            const val = S[i];
            ctx.fillStyle = val === 1 ? '#10b981' : '#3b82f6';
            ctx.fillRect(bx, barY, stepBin, 18);
            
            // Borde separador
            ctx.strokeStyle = 'rgba(10, 14, 23, 0.6)';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, barY, stepBin, 18);
        }

        // Leyenda y resumen
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Corridas Observadas C₀ = ${c0} | ${esMedia ? `N=${datos.length}` : `Longitud S=${S.length}`}`, margin, margin - 12);

        ctx.fillStyle = '#10b981';
        ctx.fillRect(w - 180, margin - 22, 10, 10);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Outfit, sans-serif';
        ctx.fillText('Bit 1 (Subida / ≥0.5)', w - 165, margin - 13);

        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(w - 75, margin - 22, 10, 10);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Bit 0', w - 60, margin - 13);
    },

    /**
     * Dibuja el gráfico de barras comparativas Observadas vs Esperadas para Poker
     */
    renderPokerBars: function(canvasId, datos, numDecimals = 4) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio || 500;
        canvas.height = (rect.height || 260) * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        const w = rect.width || 500;
        const h = rect.height || 260;

        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, w, h);

        const margin = 45;
        const plotW = w - 2 * margin;
        const plotH = h - 2 * margin;

        // Configuración de categorías
        let cats = [];
        let probs = {};
        if (numDecimals === 3) {
            cats = ['TD', '1P', 'T'];
            probs = { 'TD': 0.72, '1P': 0.27, 'T': 0.01 };
        } else if (numDecimals === 4) {
            cats = ['TD', '1P', '2P', 'T', 'P'];
            probs = { 'TD': 0.5040, '1P': 0.4320, '2P': 0.0270, 'T': 0.0360, 'P': 0.0010 };
        } else {
            cats = ['TD', '1P', '2P', 'T', 'TP', 'P', 'Q'];
            probs = { 'TD': 0.3024, '1P': 0.5040, '2P': 0.1080, 'T': 0.0720, 'TP': 0.0090, 'P': 0.0045, 'Q': 0.0001 };
        }

        const counts = {};
        cats.forEach(c => counts[c] = 0);

        // Clasificar cada número
        datos.forEach(val => {
            const str = val.toFixed(numDecimals);
            const dec = str.split('.')[1] ? str.split('.')[1].slice(0, numDecimals).padEnd(numDecimals, '0') : '000';
            const fMap = {};
            for (let ch of dec) fMap[ch] = (fMap[ch] || 0) + 1;
            const freqs = Object.values(fMap).sort((a, b) => b - a);
            
            let c = 'TD';
            if (numDecimals === 3) {
                if (freqs[0] === 3) c = 'T';
                else if (freqs[0] === 2) c = '1P';
            } else if (numDecimals === 4) {
                if (freqs[0] === 4) c = 'P';
                else if (freqs[0] === 3) c = 'T';
                else if (freqs[0] === 2 && freqs[1] === 2) c = '2P';
                else if (freqs[0] === 2) c = '1P';
            } else if (numDecimals === 5) {
                if (freqs[0] === 5) c = 'Q';
                else if (freqs[0] === 4) c = 'P';
                else if (freqs[0] === 3 && freqs[1] === 2) c = 'TP';
                else if (freqs[0] === 3) c = 'T';
                else if (freqs[0] === 2 && freqs[1] === 2) c = '2P';
                else if (freqs[0] === 2) c = '1P';
            }
            if (counts[c] !== undefined) counts[c]++;
        });

        // Encontrar valor máximo para escala
        const N = datos.length;
        let maxVal = 1;
        cats.forEach(c => {
            const exp = N * probs[c];
            const obs = counts[c];
            if (exp > maxVal) maxVal = exp;
            if (obs > maxVal) maxVal = obs;
        });
        maxVal = Math.ceil(maxVal * 1.15);

        // Dibujar barras gemelas por categoría
        const colW = plotW / cats.length;
        const barW = Math.min(colW * 0.35, 24);

        cats.forEach((cat, idx) => {
            const cx = margin + idx * colW + colW / 2;
            const obs = counts[cat];
            const exp = N * probs[cat];

            const obsH = (obs / maxVal) * plotH;
            const expH = (exp / maxVal) * plotH;

            // Barra Observada (Violeta Neón)
            ctx.fillStyle = '#8b5cf6';
            ctx.fillRect(cx - barW - 2, margin + plotH - obsH, barW, obsH);

            // Barra Esperada (Cian)
            ctx.fillStyle = '#06b6d4';
            ctx.fillRect(cx + 2, margin + plotH - expH, barW, expH);

            // Etiqueta categoría
            ctx.fillStyle = '#cbd5e1';
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(cat, cx, margin + plotH + 18);

            // Conteo observado arriba
            ctx.fillStyle = '#c4b5fd';
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillText(`${obs}`, cx - barW / 2 - 2, margin + plotH - obsH - 4);
        });

        // Ejes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + plotH);
        ctx.lineTo(margin + plotW, margin + plotH);
        ctx.stroke();

        // Título y Leyenda
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Prueba de Póker (${numDecimals} decimales) | N=${N} números`, margin, margin - 14);

        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(w - 180, margin - 24, 10, 10);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px Outfit, sans-serif';
        ctx.fillText('Observado (Oᵢ)', w - 165, margin - 15);

        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(w - 85, margin - 24, 10, 10);
        ctx.fillText('Esperado (Eᵢ)', w - 70, margin - 15);
    }
};

window.Visualizadores = Visualizadores;
