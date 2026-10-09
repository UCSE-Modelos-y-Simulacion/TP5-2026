/**
 * Orquestador de Interfaz y Autoevaluador Web Crypto (Zero-Knowledge)
 * Cátedra: Modelos y Simulación - UCSE 2026
 * Trabajo Práctico N° 5: Pruebas de Independencia
 */

const TYPE_CONFIGS = {
    "corridas_arriba_abajo": {
        title: "Prueba de Corridas Arriba y Abajo",
        fields: [
            { id: "c0", label: "Corridas Observadas (C₀)", type: "number", step: "1", placeholder: "Ej: 28" },
            { id: "mu", label: "Media Esperada (µ_C₀)", type: "number", step: "0.0001", placeholder: "Ej: 33.0000" },
            { id: "var", label: "Varianza (σ²_C₀)", type: "number", step: "0.0001", placeholder: "Ej: 8.5667" },
            { id: "Z0", label: "Estadístico Z₀", type: "number", step: "0.0001", placeholder: "Ej: -1.7083" },
            { id: "Z_crit", label: "Z Crítico (|Z_α/2|)", type: "number", step: "0.0001", placeholder: "Ej: 1.9600" },
            { id: "conclusion", label: "Conclusión", type: "select", options: ["ACEPTA", "RECHAZA"] }
        ],
        desc: "Verifique si la alternancia de incrementos y decrementos temporales entre números consecutivos es independiente. Forme la secuencia binaria <i>S</i> (longitud <i>n - 1</i>) asignando 1 si r<sub>i</sub> &gt; r<sub>i-1</sub> y 0 si r<sub>i</sub> ≤ r<sub>i-1</sub>. Cuente las corridas observadas C₀ y contraste el estadístico Z₀ con la distribución Normal estándar.",
        biblio: "García Dunna, Cap. 2 (pp. 53-55) | Coss Bu, Cap. 3 | Diapositivas U2 Vázquez (Diapos 3-7)"
    },
    "corridas_media": {
        title: "Prueba de Corridas Arriba y Debajo de la Media",
        fields: [
            { id: "n0", label: "Cantidad de Ceros (n₀)", type: "number", step: "1", placeholder: "Ej: 28" },
            { id: "n1", label: "Cantidad de Unos (n₁)", type: "number", step: "1", placeholder: "Ej: 22" },
            { id: "c0", label: "Corridas Observadas (C₀)", type: "number", step: "1", placeholder: "Ej: 24" },
            { id: "mu", label: "Media Esperada (µ_C₀)", type: "number", step: "0.0001", placeholder: "Ej: 25.1400" },
            { id: "var", label: "Varianza (σ²_C₀)", type: "number", step: "0.0001", placeholder: "Ej: 11.8875" },
            { id: "Z0", label: "Estadístico Z₀", type: "number", step: "0.0001", placeholder: "Ej: -0.3306" },
            { id: "Z_crit", label: "Z Crítico (|Z_α/2|)", type: "number", step: "0.0001", placeholder: "Ej: 1.6449" },
            { id: "conclusion", label: "Conclusión", type: "select", options: ["ACEPTA", "RECHAZA"] }
        ],
        desc: "Compruebe si los números se alternan de forma independiente alrededor de la media teórica µ = 0.5. Asigne 1 si r<sub>i</sub> ≥ 0.5 y 0 si r<sub>i</sub> &lt; 0.5 (longitud <i>n</i>). Contabilice n₀, n₁ y las corridas C₀ para calcular el estadístico Z₀ frente al intervalo [-Z<sub>α/2</sub>, Z<sub>α/2</sub>].",
        biblio: "García Dunna, Cap. 2 (pp. 55-57) | Coss Bu, Cap. 3 | Diapositivas U2 Vázquez (Diapos 8-12)"
    },
    "poker": {
        title: "Prueba de Póker",
        fields: [
            { id: "chi2_0", label: "Estadístico Chi²_0", type: "number", step: "0.0001", placeholder: "Ej: 3.4215" },
            { id: "chi2_crit", label: "Chi² Crítico (χ²_α, m-1)", type: "number", step: "0.0001", placeholder: "Ej: 9.4877" },
            { id: "conclusion", label: "Conclusión", type: "select", options: ["ACEPTA", "RECHAZA"] }
        ],
        desc: "Analice las combinaciones de dígitos en los números según sus decimales (Todos Diferentes, 1 Par, 2 Pares, Tercia, Póker, etc.). Compare las frecuencias observadas contra las probabilidades teóricas mediante el estadístico Chi-Cuadrada χ²₀ con <i>m - 1</i> grados de libertad.",
        biblio: "García Dunna, Cap. 2 (pp. 57-59) | Coss Bu, Cap. 3 | Diapositivas U2 Vázquez (Diapos 13-21)"
    },
    "series": {
        title: "Prueba de Series (Bidimensional)",
        fields: [
            { id: "n_pares", label: "Cantidad de Pares (N - 1)", type: "number", step: "1", placeholder: "Ej: 49" },
            { id: "Ei", label: "Frecuencia Esperada (Eᵢ)", type: "number", step: "0.0001", placeholder: "Ej: 5.4444" },
            { id: "chi2_0", label: "Estadístico Chi²_0", type: "number", step: "0.0001", placeholder: "Ej: 5.9184" },
            { id: "chi2_crit", label: "Chi² Crítico (χ²_α, m-1)", type: "number", step: "0.0001", placeholder: "Ej: 13.3616" },
            { id: "conclusion", label: "Conclusión", type: "select", options: ["ACEPTA", "RECHAZA"] }
        ],
        desc: "Valide si existe autocorrelación espacial graficando los pares ordenados consecutivos (r<sub>i</sub>, r<sub>i+1</sub>) en el plano [0, 1] × [0, 1]. Divida el plano en una cuadrícula de <i>k × k</i> celdas (<i>m = k²</i>) y evalúe la dispersión con el estadístico Chi-Cuadrada.",
        biblio: "García Dunna, Cap. 2 (pp. 59-62) | Coss Bu, Cap. 3 | Diapositivas U2 Vázquez (Diapos 22-27)"
    }
};

const SECRET_SALT = "MODELOS_SIMULACION_UCSE_2026_CATEDRA_SECRET_SALT";
let currentLegajo = "";
let currentAsignacion = "asignacion_1";

/**
 * Función Hash SHA-256 usando Web Crypto API
 */
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    document.getElementById("btn-validate-all").addEventListener("click", validateAll);
});

function initApp() {
    renderTabs();
    loadAsignacion(currentAsignacion);
}

function renderTabs() {
    const tabsContainer = document.getElementById("exercise-tabs");
    tabsContainer.innerHTML = "";
    Object.keys(TP5_RUBRIC).forEach((asigKey, idx) => {
        const btn = document.createElement("button");
        btn.textContent = `Alumno #${idx + 1}`;
        btn.title = TP5_RUBRIC[asigKey].titulo;
        btn.className = `px-4 py-2.5 rounded-xl font-medium text-sm transition-all transform duration-200 ${
            currentAsignacion === asigKey
                ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/30 scale-105 font-bold'
                : 'bg-gray-800/60 text-gray-400 hover:text-gray-200 hover:bg-gray-700/60 border border-white/5'
        }`;
        btn.onclick = () => {
            currentAsignacion = asigKey;
            renderTabs();
            loadAsignacion(currentAsignacion);
        };
        tabsContainer.appendChild(btn);
    });
}

function loadAsignacion(asigKey) {
    const data = TP5_RUBRIC[asigKey];
    if (!data) return;

    // Actualizar título de asignación activa
    const asigTitleEl = document.getElementById("current-asig-title");
    if (asigTitleEl) {
        asigTitleEl.textContent = data.titulo;
    }

    loadPart("A", data.ejA);
    loadPart("B", data.ejB);
}

function loadPart(suffix, dataPart) {
    const typeConf = TYPE_CONFIGS[dataPart.tipo];
    
    // Panel de enunciados y guía bibliográfica
    const descEl = document.getElementById(`enunciado-desc-${suffix}`);
    if (descEl) {
        let badgeDetalle = '';
        if (dataPart.k) badgeDetalle = `<span class="badge-tipo">Cuadrícula ${dataPart.k}x${dataPart.k} (m=${dataPart.k*dataPart.k})</span>`;
        if (dataPart.decimals) badgeDetalle = `<span class="badge-tipo">${dataPart.decimals} decimales</span>`;

        descEl.innerHTML = `
            <div class="flex flex-wrap items-center gap-2 mb-3">
                <span class="badge-tipo font-semibold">${typeConf.title}</span>
                <span class="badge-alpha">Nivel α = ${dataPart.alpha}</span>
                <span class="badge-tipo">N = ${dataPart.datos.length} datos</span>
                ${badgeDetalle}
            </div>
            <p class="text-sm text-gray-300 leading-relaxed mb-4">${dataPart.desc || typeConf.desc}</p>
            
            <!-- Acordeón Bibliográfico -->
            <div class="biblio-guide mb-4" id="biblio-${suffix}">
                <div class="biblio-header" onclick="toggleBiblio('biblio-${suffix}')">
                    <span class="biblio-title">
                        <svg class="w-4 h-4 text-secondary inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        📖 Dónde estudiar este tema en la teoría de cátedra
                    </span>
                    <svg class="w-4 h-4 text-cyan-400 biblio-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <div class="biblio-body">
                    <p class="font-medium text-cyan-200 mb-1">Referencias Obligatorias de Cátedra:</p>
                    <p class="text-gray-300 text-xs">${typeConf.biblio}</p>
                </div>
            </div>
        `;
    }

    // Volcado de datos raw
    const rawEl = document.getElementById(`datos-raw-${suffix}`);
    if (rawEl) {
        rawEl.innerHTML = dataPart.datos.map((val, i) => {
            const dec = dataPart.decimals || (dataPart.datos[0].toString().split('.')[1] ? dataPart.datos[0].toString().split('.')[1].length : 4);
            const strVal = typeof val === 'number' ? val.toFixed(dec) : val;
            return `<span class="inline-block mr-2 mb-1 p-1 rounded bg-black/30 border border-white/5"><span class="text-gray-500 text-[10px] select-none">#${i+1}:</span> <b>${strVal}</b></span>`;
        }).join('');
    }

    // Renderizado del formulario Workbench
    const formEl = document.getElementById(`calc-form-${suffix}`);
    if (formEl) {
        formEl.innerHTML = "";
        typeConf.fields.forEach(field => {
            const group = document.createElement("div");
            group.className = "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-gray-900/40 border border-white/5 hover:border-primary/30 transition-all";
            
            const label = document.createElement("label");
            label.className = "text-xs font-medium text-gray-300 flex items-center gap-1.5";
            label.htmlFor = `input-${suffix}-${field.id}`;
            label.innerHTML = `<span>${field.label}:</span>`;

            let input;
            if (field.type === "select") {
                input = document.createElement("select");
                input.id = `input-${suffix}-${field.id}`;
                input.className = "bg-gray-800 text-white text-xs rounded px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-primary w-full sm:w-44";
                
                const optEmpty = document.createElement("option");
                optEmpty.value = "";
                optEmpty.textContent = "-- Seleccionar --";
                input.appendChild(optEmpty);

                field.options.forEach(opt => {
                    const optEl = document.createElement("option");
                    optEl.value = opt;
                    optEl.textContent = opt === "ACEPTA" ? "ACEPTA H₀ (Independientes)" : "RECHAZA H₀ (No Independientes)";
                    input.appendChild(optEl);
                });
            } else {
                input = document.createElement("input");
                input.type = field.type;
                input.step = field.step || "0.0001";
                input.placeholder = field.placeholder || "0.0000";
                input.id = `input-${suffix}-${field.id}`;
                input.className = "bg-gray-800 text-white font-mono text-xs rounded px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-primary w-full sm:w-44 text-right";
            }

            group.appendChild(label);
            group.appendChild(input);
            formEl.appendChild(group);
        });
    }

    // Renderizar Gráficos en Canvas
    renderGraphic(suffix, dataPart);
}

function toggleBiblio(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
}

function renderGraphic(suffix, dataPart) {
    const canvasId = `graficoCanvas-${suffix}`;
    const tipo = dataPart.tipo;
    const datos = dataPart.datos;

    setTimeout(() => {
        if (tipo === "series") {
            Visualizadores.renderScatterSeries(canvasId, datos, dataPart.k || 2);
        } else if (tipo === "corridas_arriba_abajo") {
            Visualizadores.renderCorridasWaveform(canvasId, datos, false);
        } else if (tipo === "corridas_media") {
            Visualizadores.renderCorridasWaveform(canvasId, datos, true);
        } else if (tipo === "poker") {
            Visualizadores.renderPokerBars(canvasId, datos, dataPart.decimals || 4);
        }
    }, 50);
}

/**
 * Validador integral de ambos ejercicios con descarga de comprobante firmado
 */
async function validateAll() {
    // Solicitar legajo si aún no se ingresó
    if (!currentLegajo) {
        const { value: legajoInput } = await Swal.fire({
            title: 'Identificación de Alumno',
            input: 'text',
            inputLabel: 'Introduce tu número de Legajo UCSE:',
            inputPlaceholder: 'Ej: 41258',
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#8b5cf6',
            inputValidator: (value) => {
                if (!value || !value.trim()) {
                    return 'El legajo es obligatorio para certificar el comprobante.';
                }
            }
        });
        if (!legajoInput) return;
        currentLegajo = legajoInput.trim();
    }

    const asigData = TP5_RUBRIC[currentAsignacion];
    let allValid = true;
    let missingFields = false;
    const respuestas = { ejA: {}, ejB: {} };

    // Validar cada parte
    for (const suffix of ['A', 'B']) {
        const partKey = `ej${suffix}`;
        const dataPart = asigData[partKey];
        const typeConf = TYPE_CONFIGS[dataPart.tipo];
        const targetId = `${currentAsignacion}_${suffix}`;

        for (const field of typeConf.fields) {
            const inputEl = document.getElementById(`input-${suffix}-${field.id}`);
            if (!inputEl) continue;
            
            const valor = inputEl.value.trim();
            if (!valor) {
                missingFields = true;
                inputEl.classList.add("border-red-500");
                allValid = false;
                continue;
            }

            respuestas[partKey][field.id] = valor;
            const expectedHash = dataPart.hashes[field.id];
            const actualHash = await sha256(`${targetId}:${field.id}:${valor}:${SECRET_SALT}`);

            if (actualHash === expectedHash) {
                inputEl.classList.remove("border-red-500", "border-gray-700");
                inputEl.classList.add("border-emerald-500", "bg-emerald-950/20");
            } else {
                inputEl.classList.remove("border-emerald-500", "border-gray-700");
                inputEl.classList.add("border-red-500", "bg-red-950/20");
                allValid = false;
            }
        }
    }

    if (missingFields) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Incompletos',
            text: 'Por favor completa todos los campos del Workbench para ambos ejercicios antes de validar.',
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }

    if (!allValid) {
        Swal.fire({
            icon: 'error',
            title: 'Discrepancia en los Cálculos',
            html: `Se detectaron valores incorrectos en los campos resaltados en rojo.<br><br>
                   <small class="text-gray-400">Consejo: Revisa el redondeo a 4 decimales y consulta el panel bibliográfico de cátedra.</small>`,
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#ef4444'
        });
        return;
    }

    // Generar Comprobante Firmado
    const timestamp = new Date().toISOString();
    const firmaPayload = `${currentLegajo}:${currentAsignacion}:${JSON.stringify(respuestas)}:${timestamp}:${SECRET_SALT}`;
    const firmaDigital = await sha256(firmaPayload);

    const comprobante = {
        tp: "TP5",
        titulo: "Pruebas de Independencia para Números Pseudoaleatorios",
        catedra: "Modelos y Simulación - UCSE 2026",
        legajo: currentLegajo,
        asignacion: currentAsignacion,
        timestamp: timestamp,
        puntaje: "100/100 Pts",
        respuestas: respuestas,
        firma_sha256: firmaDigital
    };

    // Descargar Comprobante JSON
    const fileName = `comprobante_tp5_${currentAsignacion}_${currentLegajo}.json`;
    const blob = new Blob([JSON.stringify(comprobante, null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
        icon: 'success',
        title: '¡100/100 Pts - Autoevaluación Aprobada!',
        html: `
            <p class="mb-3 text-emerald-400 font-semibold">Todos tus cálculos son 100% correctos.</p>
            <p class="text-sm text-gray-300 mb-2">Se ha descargado tu comprobante firmado:</p>
            <code class="text-xs bg-black/50 p-2 rounded block mb-4 text-cyan-300 font-mono">${fileName}</code>
            <div class="text-left bg-gray-800/80 p-3 rounded text-xs text-gray-300 space-y-1 border border-white/10">
                <p><b>Siguientes pasos obligatorios:</b></p>
                <p>1. Copia el archivo en la carpeta <code>entregas/</code> de este repositorio.</p>
                <p>2. Ejecuta <code>test.bat</code> (Windows) o <code>./test.sh</code> (Linux/Mac) para validar localmente.</p>
                <p>3. Haz <code>git add .</code>, <code>git commit -m "Entrega TP5"</code> y <code>git push</code>.</p>
            </div>
        `,
        background: '#111827',
        color: '#f3f4f6',
        confirmButtonColor: '#10b981'
    });
}

window.toggleBiblio = toggleBiblio;
